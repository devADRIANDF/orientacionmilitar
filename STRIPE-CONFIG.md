# 💳 Configuración de Stripe - Guía Completa

Tienes **3 opciones** para integrar el pago con Stripe. Elige la que mejor se adapte a tus necesidades:

---

## ✅ OPCIÓN 1: Stripe Payment Links (MÁS FÁCIL - SIN CÓDIGO)

**Ventajas:**
- ✅ No requiere programación backend
- ✅ Configuración en 5 minutos
- ✅ Hosted checkout profesional por Stripe
- ✅ Perfecto para empezar rápido

**Desventajas:**
- ❌ Menos personalizable
- ❌ Redirige a dominio de Stripe

### Pasos para configurar:

#### 1. Crear cuenta en Stripe
```
1. Ve a https://stripe.com
2. Crea una cuenta gratuita
3. Completa la verificación de identidad
```

#### 2. Crear un Payment Link

```
1. En el Dashboard de Stripe, ve a:
   Payment Links → Create payment link

2. Configura el producto:
   - Nombre: "Asesoría Militar Personalizada"
   - Descripción: "1 hora de videollamada con experto militar + informe + seguimiento 30 días"
   - Precio: 75 EUR
   - Tipo: One-time payment

3. Opciones adicionales:
   - ✅ Collect customer name
   - ✅ Collect customer email
   - ✅ Collect customer phone number
   - Formulario de preguntas personalizadas:
     * "¿En qué situación te encuentras?" (aspirante, recién incorporado, etc.)
     * "¿Qué destinos te interesan?"

4. Configuración avanzada:
   - Success URL: https://tudominio.com/confirmacion
   - Promoción de códigos (opcional)

5. Haz clic en "Create link"
```

#### 3. Copiar el link y pegarlo en el código

```typescript
// En: components/StripeCheckoutButton.tsx

const handleCheckout = async () => {
  setLoading(true)

  // PEGA TU LINK AQUÍ ⬇️
  window.location.href = 'https://buy.stripe.com/test_XXXXXXXXXXXX'
}
```

**¡Listo! Ya tienes pagos funcionando.**

---

## 🔧 OPCIÓN 2: Calendly + Stripe (RECOMENDADA PARA RESERVAS)

**Ventajas:**
- ✅ Calendario integrado
- ✅ Cliente elige fecha/hora automáticamente
- ✅ Confirmaciones automáticas por email
- ✅ Recordatorios automáticos
- ✅ Integración nativa Stripe

**Desventajas:**
- 💰 Calendly Premium requerido ($12/mes) para integración Stripe

### Pasos para configurar:

#### 1. Crear cuenta en Calendly

```
1. Ve a https://calendly.com
2. Crea cuenta (usa el plan Premium para Stripe)
3. Configura tu disponibilidad horaria
```

#### 2. Crear Event Type para Asesoría

```
1. En Calendly Dashboard → Create Event Type
2. Configura:
   - Nombre: "Asesoría Militar - 75€"
   - Duración: 60 minutos
   - Ubicación: Google Meet o Zoom
   - Preguntas a hacer:
     * Nombre completo
     * Email
     * Teléfono/WhatsApp
     * Situación actual (aspirante, tropa, etc.)
     * Dudas principales
```

#### 3. Integrar Stripe en Calendly

```
1. Ve a Integrations → Stripe
2. Conecta tu cuenta de Stripe
3. En el Event Type, activa "Collect payment"
4. Precio: 75 EUR
5. Tipo: One-time payment
```

#### 4. Embed Calendly en tu web

```typescript
// En: app/reservar/page.tsx

// Descomenta estas líneas (están en el código):

<div className="card mb-8">
  <h2>Paso 1: Elige tu fecha y hora</h2>
  <CalendlyEmbed />
</div>

// Y en: components/CalendlyEmbed.tsx
// Reemplaza la línea 20 con TU URL de Calendly:

data-url="https://calendly.com/TU-USUARIO/asesoria-militar-75?primary_color=3B4B39"
```

**¡Listo! Cliente paga y elige fecha/hora en un solo proceso.**

---

## 🚀 OPCIÓN 3: Stripe Checkout API (MÁS PROFESIONAL)

**Ventajas:**
- ✅ Totalmente personalizable
- ✅ Tu propio dominio
- ✅ Control total del flujo
- ✅ Webhooks para automatización

**Desventajas:**
- ❌ Requiere backend (Next.js API Routes)
- ❌ Más complejo técnicamente

### Pasos para configurar:

#### 1. Instalar Stripe SDK

```bash
npm install stripe @stripe/stripe-js
```

#### 2. Obtener API Keys de Stripe

```
1. Dashboard Stripe → Developers → API keys
2. Copia:
   - Publishable key (empieza con pk_)
   - Secret key (empieza con sk_)
```

#### 3. Crear variables de entorno

```bash
# Crea archivo: .env.local

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXX
```

#### 4. Crear API Route para Checkout Session

```typescript
// Crea archivo: app/api/create-checkout-session/route.ts

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(req: Request) {
  try {
    const { customerEmail, customerName } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Asesoría Militar Personalizada',
              description: '1 hora de videollamada + informe + seguimiento 30 días',
            },
            unit_amount: 7500, // 75€ en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail,
      metadata: {
        customerName: customerName,
      },
      success_url: `${req.headers.get('origin')}/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/reservar`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    )
  }
}
```

#### 5. Actualizar el botón de pago

```typescript
// En: components/StripeCheckoutButton.tsx

const handleCheckout = async () => {
  setLoading(true)

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'user@example.com', // Captura del formulario
        customerName: 'Juan Pérez', // Captura del formulario
      })
    })

    const { url } = await response.json()
    window.location.href = url
  } catch (error) {
    console.error('Error:', error)
    alert('Error al procesar el pago')
  } finally {
    setLoading(false)
  }
}
```

#### 6. Configurar Webhooks (opcional pero recomendado)

```typescript
// Crea archivo: app/api/webhooks/stripe/route.ts

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Manejar eventos
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // AQUÍ: Enviar email de confirmación, guardar en DB, etc.
    console.log('Pago completado:', session.customer_email)

    // Enviar email con Resend, SendGrid, etc.
    // await sendConfirmationEmail(session.customer_email)
  }

  return NextResponse.json({ received: true })
}
```

---

## 📧 Automatización Post-Pago (Todas las opciones)

Después de un pago exitoso, querrás:

### 1. Enviar email de confirmación

**Opciones de servicios:**
- **Resend** (recomendado) - https://resend.com - Moderno, fácil, 100 emails/día gratis
- **SendGrid** - https://sendgrid.com - 100 emails/día gratis
- **Mailgun** - https://mailgun.com
- **Amazon SES** - Muy barato

**Ejemplo con Resend:**

```bash
npm install resend
```

```typescript
// app/api/send-confirmation/route.ts

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, name } = await req.json()

  await resend.emails.send({
    from: 'Orientación Militar <hola@orientacionmilitar.com>',
    to: email,
    subject: '✅ Pago confirmado - Asesoría Militar',
    html: `
      <h1>¡Pago confirmado, ${name}!</h1>
      <p>Hemos recibido tu pago de 75€ correctamente.</p>
      <p>Te contactaremos en las próximas 24 horas por WhatsApp para coordinar fecha y hora.</p>
      <p>¡Gracias por confiar en nosotros!</p>
    `
  })

  return Response.json({ success: true })
}
```

### 2. Notificación por WhatsApp (a ti)

Usa Twilio o la API de WhatsApp Business para recibir notificación cuando alguien pague.

---

## 🎯 Recomendación Final

**Si estás empezando:**
→ Usa **OPCIÓN 1 (Payment Links)** - Rápido y sin complicaciones

**Si quieres algo profesional:**
→ Usa **OPCIÓN 2 (Calendly + Stripe)** - Mejor experiencia de usuario

**Si quieres control total:**
→ Usa **OPCIÓN 3 (API)** - Máxima personalización

---

## 🧪 Testing (Modo Test)

Antes de ir a producción, prueba con tarjetas de test:

```
Tarjeta que funciona:
4242 4242 4242 4242
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos

Tarjeta que falla:
4000 0000 0000 0002
```

---

## 🔴 IMPORTANTE: Pasar a Producción

1. En Stripe Dashboard:
   - Activa tu cuenta (completa verificación de identidad)
   - Cambia de "Test mode" a "Live mode"

2. Actualiza las API keys en `.env.local`:
   - Usa las keys que empiezan con `pk_live_` y `sk_live_`

3. Configura webhook endpoint en producción:
   - Stripe Dashboard → Webhooks → Add endpoint
   - URL: `https://tudominio.com/api/webhooks/stripe`

---

**¿Dudas?** Consulta la documentación oficial de Stripe: https://stripe.com/docs

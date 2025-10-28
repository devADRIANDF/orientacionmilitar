# Configurar Tracking, Analytics y Mapa de Calor

La web ya está preparada para usar todas las herramientas de tracking. Solo necesitas obtener los IDs y configurarlos.

## 📊 Herramientas Incluidas

1. **Google Tag Manager (GTM)** - Gestor de etiquetas
2. **Google Analytics 4 (GA4)** - Analytics y métricas
3. **Google Ads Pixel** - Tracking de conversiones de anuncios
4. **Microsoft Clarity** - Mapa de calor GRATIS

---

## 🎯 Paso 1: Google Tag Manager (GTM)

**¿Para qué?** Gestionar todos los scripts de tracking desde un solo lugar.

### Cómo obtener el ID:

1. Ve a: https://tagmanager.google.com
2. Inicia sesión con tu cuenta de Google
3. Clic en **"Crear cuenta"** (si no tienes una)
4. Nombre de la cuenta: `Orientación Militar`
5. Selecciona **Web**
6. URL del sitio web: `https://orientacionmilitar.com`
7. Clic en **Crear**
8. Acepta los términos de servicio
9. **Copia el ID que aparece** (formato: `GTM-XXXXXXX`)

---

## 📈 Paso 2: Google Analytics 4 (GA4)

**¿Para qué?** Ver cuántas personas visitan tu web, de dónde vienen, qué páginas ven, etc.

### Cómo obtener el ID:

1. Ve a: https://analytics.google.com
2. Inicia sesión con tu cuenta de Google
3. Clic en **"Empezar a medir"**
4. Nombre de la cuenta: `Orientación Militar`
5. Configura la propiedad:
   - Nombre de la propiedad: `orientacionmilitar.com`
   - Zona horaria: `España`
   - Moneda: `EUR - Euro`
6. Sobre tu empresa (elige lo que corresponda)
7. Acepta los términos
8. Selecciona **Plataforma: Web**
9. URL del sitio: `https://orientacionmilitar.com`
10. Nombre del flujo: `Web Data Stream`
11. **Copia el ID de medición** (formato: `G-XXXXXXXXXX`)

### Integrar GA4 con GTM (RECOMENDADO):

Si configuraste GTM, puedes gestionar GA4 desde ahí:

1. En GTM, ve a **Etiquetas → Nueva**
2. Nombre: `GA4 Configuration`
3. Tipo de etiqueta: **Google Analytics: Configuración de GA4**
4. ID de medición: Pega tu ID de GA4 (`G-XXXXXXXXXX`)
5. Activador: **All Pages**
6. Guarda y **Publica** el contenedor

---

## 🎯 Paso 3: Google Ads (Pixel de Conversión)

**¿Para qué?** Medir si tus anuncios de Google Ads generan conversiones (reservas, contactos).

### Cómo obtener el ID:

1. Ve a: https://ads.google.com
2. Inicia sesión
3. Si no tienes cuenta de Google Ads, créala (puedes pausar las campañas)
4. Ve a **Herramientas y configuración** (icono llave inglesa)
5. En **Medición** → **Conversiones**
6. Clic en **+ Nueva acción de conversión**
7. Selecciona **Sitio web**
8. Categoría: **Envío de formulario de clientes potenciales** o **Compra**
9. **Copia el ID de conversión** (formato: `AW-XXXXXXXXX`)

### Configurar eventos de conversión:

En tu Google Ads, puedes crear conversiones para:
- Reserva de asesoría completada
- Formulario de contacto enviado
- Pago completado

---

## 🔥 Paso 4: Microsoft Clarity (Mapa de Calor)

**¿Para qué?** Ver cómo los usuarios interactúan con tu web (dónde hacen clic, hasta dónde scrollean, grabaciones de sesiones).

**¡Es 100% GRATIS!**

### Cómo obtener el ID:

1. Ve a: https://clarity.microsoft.com
2. Inicia sesión con una cuenta de Microsoft (o crea una gratis)
3. Clic en **"Add new project"**
4. Nombre del proyecto: `Orientación Militar`
5. URL del sitio: `https://orientacionmilitar.com`
6. Selecciona tu categoría (Negocios/Educación/etc)
7. Clic en **Add new project**
8. **Copia el Clarity ID** (formato: algo como `hx7a2b3c4d`)

---

## ⚙️ Configurar Variables de Entorno

Una vez tengas todos los IDs, añádelos a tu `.env.local`:

```bash
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX

# Microsoft Clarity (Mapa de Calor)
NEXT_PUBLIC_CLARITY_ID=hx7a2b3c4d

# Stripe (ya configurado - copia las claves reales desde tu .env.local)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publica_de_stripe
STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
```

---

## 🚀 Configurar en Netlify

Para que funcione en producción:

1. Ve a tu dashboard de Netlify
2. Selecciona tu sitio: **orientacionmilitar**
3. Ve a **Site settings → Environment variables**
4. Añade TODAS las variables (las que empiezan con `NEXT_PUBLIC_` y las de Stripe)

**IMPORTANTE:**
- Las variables que empiezan con `NEXT_PUBLIC_` son públicas (se envían al navegador)
- Las que no (como `STRIPE_SECRET_KEY`) son privadas (solo servidor)

---

## 📊 Verificar que funciona

### Google Tag Manager:
- Instala la extensión: **Tag Assistant** de Chrome
- Visita tu web
- La extensión mostrará si GTM está funcionando

### Google Analytics:
- Ve a tu GA4 dashboard
- En **Informes → Tiempo real**
- Abre tu web en otra pestaña
- Deberías ver la visita en tiempo real

### Microsoft Clarity:
- Ve a tu dashboard de Clarity
- Espera 5-10 minutos después de visitar tu web
- Verás mapas de calor y grabaciones de sesiones

### Google Ads:
- Ve a Google Ads → Conversiones
- Haz una prueba completando una reserva
- Debería aparecer en las conversiones

---

## 🎯 Eventos de Conversión Recomendados

Configura estos eventos en GTM o GA4 para trackear:

1. **Formulario de contacto enviado**
2. **Formulario de asesoría enviado**
3. **Botón "Reservar Asesoría" clickeado**
4. **Pago de Stripe completado**
5. **Scroll al 75% de la página**
6. **Tiempo en página > 30 segundos**

---

## ❓ ¿Cuál necesitas primero?

**Si tienes que elegir solo uno para empezar:**

1. **Microsoft Clarity** - Es GRATIS y te da mapas de calor + grabaciones de sesiones
2. **Google Analytics 4** - Para ver cuánta gente entra y qué hace
3. **Google Tag Manager** - Para gestionar todo fácilmente
4. **Google Ads** - Solo si vas a hacer publicidad en Google

---

## 🆘 Ayuda

Si tienes dudas al configurar cualquiera de estos:
- Microsoft Clarity: https://docs.microsoft.com/en-us/clarity/
- Google Analytics 4: https://support.google.com/analytics/
- Google Tag Manager: https://support.google.com/tagmanager/
- Google Ads: https://support.google.com/google-ads/

---

## ✅ Después de configurar

1. Haz commit de los cambios
2. Push a GitHub
3. Configura las variables de entorno en Netlify
4. Espera el deploy
5. Visita tu web y verifica que todo funcione

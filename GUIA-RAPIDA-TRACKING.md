# Guía Rápida: Mapa de Calor + Google Ads Pixel

## 🔥 PASO 1: Microsoft Clarity (Mapa de Calor GRATIS)

### ¿Qué es?
Mapa de calor que muestra:
- Dónde hacen clic los usuarios
- Hasta dónde hacen scroll
- Grabaciones de sesiones reales
- Todo 100% GRATIS

### Configurar en 3 minutos:

1. **Ve a:** https://clarity.microsoft.com
2. **Inicia sesión** con una cuenta de Microsoft (o crea una gratis)
3. **Clic en:** "Add new project"
4. **Rellena:**
   - Project name: `Orientación Militar`
   - Website URL: `https://orientacionmilitar.com`
   - Category: Selecciona "Business" o "Education"
5. **Clic en:** "Add new project"
6. **COPIA el Clarity ID** (aparece así: `hx7a2b3c4d` o similar)

### ✅ Configurar en tu .env.local:

Abre el archivo `.env.local` y añade esta línea:

```bash
NEXT_PUBLIC_CLARITY_ID=TU_ID_AQUI
```

**Ejemplo:**
```bash
NEXT_PUBLIC_CLARITY_ID=hx7a2b3c4d
```

---

## 🎯 PASO 2: Google Ads Pixel

### ¿Qué es?
El pixel de Google Ads te permite:
- Trackear conversiones (reservas, contactos, pagos)
- Medir ROI de tus anuncios
- Ver qué ads funcionan mejor
- Hacer remarketing

### Configurar en 5 minutos:

#### 2.1 - Crear cuenta de Google Ads (si no tienes)
1. Ve a: https://ads.google.com
2. Clic en "Empezar ahora"
3. Sigue el proceso (puedes pausar las campañas después)

#### 2.2 - Obtener el ID de conversión

1. **Ve a:** https://ads.google.com
2. **Clic en:** el icono de herramientas (🔧) arriba a la derecha
3. **En "Medición"** → **Clic en:** "Conversiones"
4. **Clic en:** "+ Nueva acción de conversión"
5. **Selecciona:** "Sitio web"
6. **Configura la conversión:**
   - Categoría: "Envío de formulario de clientes potenciales" (para contacto/asesoría)
   - O: "Compra" (para pagos de Stripe)
   - Nombre: "Reserva de asesoría" o "Contacto"
   - Valor: 75 (para asesorías) o déjalo sin valor
   - Recuento: "Una"
7. **En "Configuración de etiquetas"** → Clic en "Usar Google Tag Manager o código"
8. **Copia el ID que aparece** (formato: `AW-XXXXXXXXX`)

**IMPORTANTE:** El ID de conversión es el **AW-XXXXXXXXX** que aparece en el código

#### 2.3 - También necesitas el Google Tag (gtag.js)

En la misma página de Google Ads:
1. Ve a **Herramientas** → **Configuración** → **Configuración de la cuenta**
2. Busca tu **ID de Google Ads** (formato: `123-456-7890`)
3. O usa el mismo **AW-XXXXXXXXX** que copiaste antes

### ✅ Configurar en tu .env.local:

Abre el archivo `.env.local` y añade esta línea:

```bash
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
```

**Ejemplo:**
```bash
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
```

---

## ⚙️ PASO 3: Configurar en Netlify (PRODUCCIÓN)

Una vez tengas los IDs, debes configurarlos también en Netlify:

1. **Ve a:** https://app.netlify.com
2. **Selecciona tu sitio:** orientacionmilitar
3. **Ve a:** Site settings → Environment variables
4. **Clic en:** "Add a variable"
5. **Añade estas variables:**

```
Key: NEXT_PUBLIC_CLARITY_ID
Value: (pega tu ID de Clarity)

Key: NEXT_PUBLIC_GOOGLE_ADS_ID
Value: (pega tu ID de Google Ads)
```

6. **Clic en "Save"**
7. **Redeploy el sitio:** Ve a "Deploys" → Clic en "Trigger deploy" → "Deploy site"

---

## 🎯 PASO 4: Configurar Eventos de Conversión (IMPORTANTE)

Para que Google Ads sepa cuándo alguien hace una conversión, necesitas configurar eventos:

### En Google Ads:

1. **Crea conversiones específicas:**
   - "Formulario de contacto enviado"
   - "Formulario de asesoría enviado"
   - "Pago completado en Stripe"

2. **Para cada conversión:**
   - Ve a Conversiones → + Nueva acción
   - Sitio web
   - Categoría según corresponda
   - Dale un nombre claro
   - Copia la etiqueta de evento

### Qué trackear:

**Conversión 1: Formulario de contacto**
- Se activa cuando alguien envía el formulario de /contacto
- Valor: Sin valor o 0€

**Conversión 2: Solicitud de asesoría**
- Se activa cuando alguien envía el formulario de /asesorias o /reservar
- Valor: 75€

**Conversión 3: Pago completado**
- Se activa cuando alguien completa el pago en Stripe
- Valor: 75€

---

## 📊 PASO 5: Verificar que funciona

### Microsoft Clarity:
1. Ve a https://clarity.microsoft.com
2. Abre tu proyecto "Orientación Militar"
3. Visita tu web desde otro dispositivo/navegador
4. Espera 5-10 minutos
5. Refresca el dashboard de Clarity
6. Deberías ver tu sesión grabada y el mapa de calor

### Google Ads:
1. Instala la extensión: **Google Tag Assistant** en Chrome
2. Ve a tu web: orientacionmilitar.com
3. La extensión debería mostrar que el pixel de Google Ads está instalado
4. O ve a Google Ads → Herramientas → Conversiones
5. Al lado de tu conversión debería aparecer "Registrando"

---

## 🚀 Archivo .env.local completo

Tu archivo `.env.local` debería verse así:

```bash
# Stripe (usa tus claves reales que ya tienes configuradas)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publica_stripe
STRIPE_SECRET_KEY=tu_clave_secreta_stripe

# Microsoft Clarity (Mapa de calor)
NEXT_PUBLIC_CLARITY_ID=tu_clarity_id_aqui

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX

# Opcional: Google Analytics 4 (si quieres más métricas)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Opcional: Google Tag Manager (para gestionar todo desde un lugar)
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## ❓ FAQ

**¿Necesito tarjeta de crédito para Clarity?**
No, es 100% gratis, sin límites.

**¿Necesito tarjeta para crear cuenta de Google Ads?**
Sí, pero puedes pausar las campañas inmediatamente después de crear la cuenta. Solo necesitas la cuenta para obtener el pixel.

**¿Cuánto tarda en aparecer data en Clarity?**
5-10 minutos después de que alguien visite tu web.

**¿Cuánto tarda en aparecer conversiones en Google Ads?**
Hasta 24 horas. La primera conversión puede tardar un poco más.

**¿Funciona con cualquier campaña de Google Ads?**
Sí, una vez instalado el pixel, todas tus campañas de Google Ads podrán trackear conversiones.

---

## 🆘 Si tienes problemas

**El pixel de Google Ads no aparece:**
- Verifica que añadiste la variable en Netlify
- Verifica que hiciste redeploy después de añadir la variable
- Limpia cache del navegador (Ctrl+F5)

**Clarity no muestra sesiones:**
- Espera 10-15 minutos
- Verifica que el ID sea correcto
- Verifica que está en Netlify environment variables

**Las conversiones no se trackean:**
- Asegúrate de haber creado las conversiones en Google Ads
- Verifica que el pixel se carga (usa Google Tag Assistant)
- Las conversiones pueden tardar hasta 24h en aparecer

---

## ✅ Checklist

- [ ] Cuenta de Microsoft Clarity creada
- [ ] ID de Clarity copiado
- [ ] Clarity ID añadido a .env.local
- [ ] Cuenta de Google Ads creada
- [ ] Conversiones creadas en Google Ads
- [ ] ID de Google Ads copiado (AW-XXXXXXXXX)
- [ ] Google Ads ID añadido a .env.local
- [ ] Ambas variables añadidas en Netlify
- [ ] Redeploy realizado en Netlify
- [ ] Verificado que Clarity funciona
- [ ] Verificado que Google Ads pixel carga

---

**Una vez completado todo esto, tendrás:**
- ✅ Mapa de calor funcionando
- ✅ Grabaciones de sesiones
- ✅ Tracking de conversiones de Google Ads
- ✅ ROI medible de tus campañas
- ✅ Datos para optimizar la web

¡Listo para lanzar ads! 🚀

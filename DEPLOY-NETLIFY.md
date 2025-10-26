# 🚀 Guía de Deployment en Netlify

## 📋 Pre-requisitos

Antes de empezar, asegúrate de tener:
- ✅ Cuenta en GitHub (gratuita)
- ✅ Cuenta en Netlify (gratuita)
- ✅ Cuenta en Web3Forms (gratuita) para formularios

---

## 🎯 PASO 1: Configurar Web3Forms (5 minutos)

### 1.1 Crear cuenta y obtener Access Key

```bash
1. Ve a https://web3forms.com
2. Haz clic en "Get Started Free"
3. Registra tu email
4. Verifica tu email
5. Copia tu Access Key (empieza con algo como: a1b2c3d4...)
```

### 1.2 Guardar el Access Key

Lo usaremos después en Netlify.

---

## 🎯 PASO 2: Subir código a GitHub

### 2.1 Crear repositorio en GitHub

```bash
1. Ve a https://github.com/new
2. Nombre del repo: "orientacion-militar" (o el que quieras)
3. Privacidad: Público o Privado (da igual)
4. NO marques "Initialize with README"
5. Clic en "Create repository"
```

### 2.2 Subir tu código

```bash
# Abre tu terminal en la carpeta del proyecto:
cd "C:\Users\adlrr\Desktop\mentoria militar"

# Inicializa Git
git init

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit: OrientaciónMilitar.com v1.0"

# Conecta con GitHub (REEMPLAZA con tu URL)
git remote add origin https://github.com/TU-USUARIO/orientacion-militar.git

# Sube el código
git branch -M main
git push -u origin main
```

**Nota:** GitHub te pedirá usuario y contraseña. Si usas 2FA, necesitas un Personal Access Token.

---

## 🎯 PASO 3: Deployar en Netlify

### 3.1 Conectar GitHub con Netlify

```bash
1. Ve a https://app.netlify.com
2. Haz clic en "Add new site" → "Import an existing project"
3. Selecciona "GitHub"
4. Autoriza a Netlify (solo la primera vez)
5. Busca tu repo "orientacion-militar"
6. Haz clic en él
```

### 3.2 Configurar Build Settings

Netlify auto-detectará que es Next.js, pero verifica:

```
Build command: npm run build
Publish directory: .next
```

**¡NO hagas clic en Deploy todavía!**

### 3.3 Configurar Variables de Entorno

Antes de deployar, configura tus variables:

```
1. En la página de configuración, ve a "Site settings"
2. Luego "Environment variables"
3. Haz clic en "Add a variable"
4. Añade:

Key: NEXT_PUBLIC_WEB3FORMS_KEY
Value: [TU ACCESS KEY DE WEB3FORMS]

5. Haz clic en "Create variable"
```

### 3.4 ¡Deploy!

```
1. Vuelve a la pestaña "Deploys"
2. Haz clic en "Deploy site"
3. Espera 2-3 minutos...
4. ✅ ¡Listo!
```

---

## 🎯 PASO 4: Configurar Dominio (Opcional)

### 4.1 Usar subdominio de Netlify (GRATIS)

Tu sitio estará en: `https://random-name-123.netlify.app`

Para cambiarlo:
```
1. Site settings → Domain management
2. Options → Edit site name
3. Elige: orientacion-militar.netlify.app
4. Save
```

### 4.2 Usar tu propio dominio

Si compraste un dominio (ej: orientacionmilitar.com):

```
1. Site settings → Domain management
2. Add custom domain
3. Sigue las instrucciones para configurar DNS
4. Netlify te da SSL gratis automáticamente
```

**Dónde comprar dominios:**
- Namecheap (~$10/año)
- GoDaddy
- Google Domains

---

## 🎯 PASO 5: Probar que Funciona

### 5.1 Prueba los formularios

```
1. Ve a tu sitio: https://TU-SITIO.netlify.app/contacto
2. Llena el formulario
3. Envía
4. Deberías recibir un email con el mensaje
```

### 5.2 Prueba todas las páginas

- ✅ Home: https://TU-SITIO.netlify.app
- ✅ Reservar: https://TU-SITIO.netlify.app/reservar
- ✅ Blog: https://TU-SITIO.netlify.app/blog
- ✅ Sobre Nosotros: https://TU-SITIO.netlify.app/sobre-nosotros
- ✅ Contacto: https://TU-SITIO.netlify.app/contacto

---

## 🎯 PASO 6: Próximos Pasos

### 6.1 Configurar Stripe (cuando quieras aceptar pagos)

Lee el archivo `STRIPE-CONFIG.md` y elige una opción:
- **Opción 1:** Payment Links (más fácil)
- **Opción 2:** Calendly + Stripe
- **Opción 3:** API custom

### 6.2 Actualizar contenido

Para actualizar el sitio:

```bash
# Haz cambios en tu código local
# Luego:

git add .
git commit -m "Descripción de los cambios"
git push

# Netlify detecta el push y redeploya automáticamente en 2-3 min
```

### 6.3 Añadir Google Analytics

```
1. Crea cuenta en https://analytics.google.com
2. Obtén tu Measurement ID (G-XXXXXXXXXX)
3. Añade variable de entorno en Netlify:
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
4. Actualiza el código para incluir el script de GA
```

---

## 🔧 Troubleshooting

### Problema: Build falla

```
Solución:
1. Ve a Deploys → Failed deploy → View logs
2. Lee el error
3. Normalmente es por:
   - Node version incorrecta (usa Node 18)
   - Variables de entorno faltantes
   - Errores de TypeScript
```

### Problema: Formularios no funcionan

```
Solución:
1. Verifica que configuraste NEXT_PUBLIC_WEB3FORMS_KEY
2. La variable DEBE empezar con NEXT_PUBLIC_
3. Redeploya después de añadir variables
```

### Problema: 404 en rutas

```
Solución:
Ya está configurado en netlify.toml, pero si falla:
1. Verifica que netlify.toml está en la raíz
2. Verifica que tiene el redirect /*
```

---

## 📊 Monitoreo

### Analytics de Netlify (Incluido gratis)

```
1. Ve a Analytics en tu dashboard de Netlify
2. Verás:
   - Pageviews
   - Unique visitors
   - Top pages
   - Bandwidth usage
```

### Formularios en Web3Forms

```
1. Ve a https://web3forms.com/dashboard
2. Verás todos los mensajes recibidos
3. Puedes descargarlos en CSV
```

---

## 💰 Costes

### GRATIS (para empezar):
- ✅ Netlify: 100GB bandwidth/mes gratis
- ✅ Web3Forms: 250 mensajes/mes gratis
- ✅ SSL Certificate: Gratis
- ✅ Subdomain .netlify.app: Gratis

### De pago (cuando escales):
- Dominio propio: ~$10/año
- Netlify Pro: $19/mes (si necesitas más bandwidth)
- Web3Forms Pro: $5/mes (si necesitas más mensajes)
- Stripe: 1.5% + 0.25€ por transacción

---

## ✅ Checklist Final

Antes de lanzar:

- [ ] Web3Forms configurado y probado
- [ ] Repositorio en GitHub
- [ ] Deploy en Netlify exitoso
- [ ] Variables de entorno configuradas
- [ ] Todas las páginas funcionando
- [ ] Formularios testeados
- [ ] Dominio configurado (opcional)
- [ ] Google Analytics añadido (opcional)
- [ ] Stripe configurado (cuando estés listo)

---

**¡Listo! Tu web estará live en Internet en ~15 minutos siguiendo estos pasos.**

¿Dudas? Revisa los logs de Netlify o la documentación oficial: https://docs.netlify.com

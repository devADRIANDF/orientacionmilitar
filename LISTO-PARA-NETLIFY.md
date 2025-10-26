# 🚀 LISTO PARA NETLIFY - Guía de Deployment

## ✅ Estado del Proyecto

```
✓ Build exitoso (20 páginas)
✓ Sin errores de TypeScript
✓ Formularios funcionales
✓ Configuración Netlify lista
✓ Listo para producción
```

---

## 📋 PASO A PASO - Deployment Completo

### PASO 1: Obtener Web3Forms Access Key (2 minutos)

```
1. Ve a: https://web3forms.com
2. Clic "Get Started Free"
3. Ingresa tu email (usa el email donde quieres recibir los mensajes)
4. Verifica tu email
5. Copia tu Access Key (algo como: a1b2c3d4-5678-90ab-cdef-1234567890ab)
6. GUÁRDALO - lo necesitarás en el paso 3
```

---

### PASO 2: Subir a GitHub (5 minutos)

#### 2.1 Crear repositorio en GitHub

```
1. Ve a: https://github.com/new
2. Repository name: orientacion-militar (o el que prefieras)
3. Description: "Plataforma de asesoría militar profesional"
4. Visibilidad: Público o Privado (recomiendo Privado)
5. NO marques ninguna opción (ni README, ni .gitignore, ni license)
6. Clic "Create repository"
```

#### 2.2 Subir el código

Abre **PowerShell** o **Git Bash** en la carpeta del proyecto:

```bash
# Navega a tu carpeta
cd "C:\Users\adlrr\Desktop\mentoria militar"

# Inicializa Git (si no lo has hecho)
git init

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit: OrientaciónMilitar.com v1.0"

# Conecta con tu repo de GitHub
# IMPORTANTE: Reemplaza TU-USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/orientacion-militar.git

# Sube el código
git branch -M main
git push -u origin main
```

**Si GitHub pide autenticación:**
- Usuario: Tu usuario de GitHub
- Contraseña: Si tienes 2FA, necesitas un Personal Access Token (no tu contraseña)
  - Créalo en: https://github.com/settings/tokens
  - Permisos necesarios: repo (marcar todo)

---

### PASO 3: Deploy en Netlify (10 minutos)

#### 3.1 Conectar GitHub con Netlify

```
1. Ve a: https://app.netlify.com
2. Clic "Add new site"
3. Clic "Import an existing project"
4. Selecciona "Deploy with GitHub"
5. Autoriza a Netlify (solo primera vez)
6. Busca tu repositorio "orientacion-militar"
7. Clic en el repositorio
```

#### 3.2 Configuración de Build

Netlify auto-detectará Next.js. Verifica que tenga:

```
Build command: npm run build
Publish directory: .next
Branch to deploy: main
```

**¡IMPORTANTE! NO hagas clic en "Deploy" todavía.**

#### 3.3 Configurar Variables de Entorno

**Antes de deployar**, añade la variable de Web3Forms:

```
1. Scroll down hasta "Advanced build settings"
2. O ve directamente a "Site settings" → "Environment variables"
3. Clic "Add a variable"
4. Añade esta variable:

   Key: NEXT_PUBLIC_WEB3FORMS_KEY
   Value: [PEGA AQUÍ TU ACCESS KEY DE WEB3FORMS]

5. Clic "Create variable"
```

**Verificación:** Asegúrate que el nombre sea EXACTAMENTE `NEXT_PUBLIC_WEB3FORMS_KEY`

#### 3.4 ¡Deploy!

```
1. Clic "Deploy [nombre-del-sitio]"
2. Espera 2-4 minutos...
3. ✅ Verás "Site is live"
```

Tu sitio estará en: `https://random-name-123.netlify.app`

---

### PASO 4: Conectar Tu Dominio Personalizado (5 minutos)

#### 4.1 Cambiar nombre del sitio (opcional pero recomendado)

```
1. En Netlify, ve a "Site settings"
2. Clic "Change site name"
3. Elige: orientacion-militar
4. Save
5. Ahora tu sitio está en: https://orientacion-militar.netlify.app
```

#### 4.2 Añadir tu dominio personalizado

**¿Cuál es tu dominio?** (ejemplo: orientacionmilitar.com)

```
1. En Netlify, ve a "Domain management"
2. Clic "Add custom domain"
3. Ingresa tu dominio: orientacionmilitar.com
4. Clic "Verify"
5. Netlify te dirá: "This domain is not registered to your Netlify account"
6. Clic "Add domain" de todas formas
```

#### 4.3 Configurar DNS

Netlify te dará instrucciones. Hay 2 opciones:

**OPCIÓN A: DNS de Netlify (MÁS FÁCIL - Recomendado)**

```
1. En tu registrador de dominio (donde compraste el dominio):
   - Namecheap
   - GoDaddy
   - Google Domains
   - Etc.

2. Busca la sección "Nameservers" o "DNS Management"

3. Cambia los nameservers a los de Netlify:
   dns1.p08.nsone.net
   dns2.p08.nsone.net
   dns3.p08.nsone.net
   dns4.p08.nsone.net

4. Guarda los cambios

5. Vuelve a Netlify y espera (puede tardar 24h, pero normalmente 1-2h)
```

**OPCIÓN B: DNS en tu registrador (Más control)**

```
Si prefieres mantener el DNS en tu registrador:

1. En tu registrador, añade estos registros DNS:

   Tipo: A
   Host: @
   Value: 75.2.60.5
   TTL: Automático o 3600

   Tipo: CNAME
   Host: www
   Value: [tu-sitio].netlify.app
   TTL: Automático o 3600

2. Guarda y espera propagación (1-24 horas)
```

#### 4.4 Activar HTTPS (Automático)

```
1. Una vez que el dominio esté conectado
2. Netlify activará SSL automáticamente (GRATIS)
3. Espera 5-10 minutos
4. Tu sitio estará en: https://tudominio.com (seguro)
```

---

### PASO 5: Verificar que Todo Funciona

#### 5.1 Prueba el sitio

```
1. Abre: https://tudominio.com
2. Verifica que carga correctamente
3. Navega por todas las páginas:
   - Home (/)
   - Reservar (/reservar)
   - Blog (/blog)
   - Contacto (/contacto)
   - Sobre Nosotros (/sobre-nosotros)
```

#### 5.2 Prueba los formularios

**Formulario de contacto:**
```
1. Ve a /contacto
2. Llena el formulario
3. Envía
4. Deberías ver mensaje de éxito
5. Revisa el email que usaste en Web3Forms
6. Deberías recibir el mensaje en tu bandeja
```

**Formulario de asesorías:**
```
1. Ve a /asesorias
2. Scroll hasta el formulario
3. Llena los datos
4. Envía
5. Verifica que llegue el email
```

#### 5.3 Prueba en móvil

```
1. Abre tu sitio en tu teléfono
2. Verifica que se vea bien
3. Prueba el menú hamburguesa
4. Prueba llenar un formulario
```

---

## 🔄 ACTUALIZACIONES FUTURAS

Cuando quieras hacer cambios al sitio:

```bash
# 1. Haz tus cambios en el código local

# 2. Guarda los cambios en Git
git add .
git commit -m "Descripción de los cambios"
git push

# 3. Netlify detecta el push automáticamente
# 4. Redeploya en 2-3 minutos
# 5. ¡Cambios en vivo!
```

**No necesitas hacer nada en Netlify.** Se actualiza automáticamente cuando haces `git push`.

---

## ⚙️ CONFIGURACIONES POST-DEPLOYMENT

### Añadir Google Analytics (Opcional)

```
1. Crea cuenta en https://analytics.google.com
2. Obtén tu Measurement ID (G-XXXXXXXXXX)
3. En Netlify, añade variable de entorno:
   Key: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
4. Redeploya (Deploys → Trigger deploy)
```

### Configurar Stripe (Cuando quieras cobrar)

Lee el archivo `STRIPE-CONFIG.md` y sigue las instrucciones.

**Más fácil:** Usa Stripe Payment Links
```
1. Crea cuenta en Stripe
2. Crea Payment Link de 75€
3. Edita components/StripeCheckoutButton.tsx línea 17
4. Pega tu link de Stripe
5. git push
6. ¡Listo para cobrar!
```

---

## 🐛 TROUBLESHOOTING

### Build falla en Netlify

```
Síntoma: Deploy falla con error
Solución:
1. Ve a Deploys → Failed deploy → View logs
2. Lee el error
3. Normalmente es por:
   - Variable de entorno mal escrita
   - Node version (debe ser 18, está en netlify.toml)
   - Error de TypeScript
4. Arregla localmente
5. git push de nuevo
```

### Formularios no envían emails

```
Síntoma: Formulario no envía o da error
Solución:
1. Verifica en Netlify: Environment variables
2. La variable DEBE llamarse: NEXT_PUBLIC_WEB3FORMS_KEY
3. DEBE empezar con: NEXT_PUBLIC_
4. Si la cambiaste, redeploya: Trigger deploy → Clear cache and deploy
5. Prueba de nuevo
```

### Dominio no conecta

```
Síntoma: Dominio no apunta al sitio
Solución:
1. Verifica que cambiaste los nameservers correctamente
2. Espera 24 horas (DNS propaga lento)
3. Verifica en: https://www.whatsmydns.net
4. Si usaste OPCIÓN B (registros A/CNAME), verifica que la IP sea correcta
```

### HTTPS no activa

```
Síntoma: Sitio en HTTP pero no HTTPS
Solución:
1. El dominio debe estar conectado primero
2. Espera 10-15 minutos
3. Netlify activa SSL automáticamente
4. Si tarda más: Domain management → HTTPS → Verify DNS configuration
```

---

## 📊 MONITOREO

### Ver estadísticas en Netlify

```
1. Ve a tu sitio en Netlify
2. Clic "Analytics" (gratis en plan Free)
3. Verás:
   - Pageviews
   - Unique visitors
   - Bandwidth usado
   - Top pages
```

### Ver formularios recibidos

```
1. Ve a https://web3forms.com/dashboard
2. Login con tu email
3. Verás todos los mensajes recibidos
4. Puedes descargarlos en CSV
```

---

## ✅ CHECKLIST FINAL

Antes de promocionar tu sitio:

- [ ] Sitio deployado y accesible
- [ ] Dominio personalizado conectado
- [ ] HTTPS activo (candado verde)
- [ ] Formularios envían emails correctamente
- [ ] Todas las páginas cargan sin errores
- [ ] Funciona en móvil
- [ ] Web3Forms recibiendo mensajes
- [ ] Datos de contacto actualizados (email, teléfono)
- [ ] Logo añadido (si tienes)
- [ ] Google Analytics configurado (opcional)

---

## 🎯 PRÓXIMOS PASOS

Una vez que tu sitio esté live:

### Semana 1
- [ ] Configurar Stripe para empezar a cobrar
- [ ] Añadir Google Search Console
- [ ] Enviar sitemap a Google
- [ ] Publicar en redes sociales

### Mes 1
- [ ] Publicar 2-3 blogs/semana (SEO)
- [ ] Empezar a promocionar
- [ ] Primeras ventas de asesorías
- [ ] Optimizar según Analytics

### Mes 3
- [ ] Escalar contenido
- [ ] Considerar Google Ads
- [ ] Optimizar conversión
- [ ] Testimonios reales de clientes

---

## 🎉 ¡LISTO!

Tu web estará en Internet, accesible 24/7, con:
- ✅ Formularios funcionales
- ✅ Dominio personalizado
- ✅ HTTPS seguro
- ✅ Deploy automático
- ✅ 100% gratis (Netlify Free tier)

**¡Ahora a vender asesorías! 💰**

---

**¿Problemas?** Revisa los logs de Netlify o busca en la documentación: https://docs.netlify.com

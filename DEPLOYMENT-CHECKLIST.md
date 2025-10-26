# ✅ Checklist de Deployment

## 📋 ANTES de subir a Netlify

### Código y Configuración
- [x] Formularios funcionales (Web3Forms integrado)
- [x] `.env.example` creado
- [x] `.gitignore` configurado
- [x] `netlify.toml` creado
- [x] Todos los errores de TypeScript corregidos
- [x] Build test local (`npm run build`)

### Contenido
- [ ] Logo añadido (o usar placeholder temporal)
- [ ] Fotos del equipo añadidas (o usar placeholders)
- [ ] Imágenes de blog añadidas (opcional)
- [ ] Datos de contacto reales (email, teléfono, WhatsApp)

### Cuentas Necesarias
- [ ] Cuenta de GitHub creada
- [ ] Cuenta de Netlify creada
- [ ] Cuenta de Web3Forms creada → Access Key obtenido

---

## 🚀 PROCESO DE DEPLOYMENT

### 1. Web3Forms Setup
```
1. Ve a https://web3forms.com
2. Regístrate gratis
3. Obtén tu Access Key
4. Guárdalo para después
```

### 2. GitHub
```bash
# En tu terminal:
cd "C:\Users\adlrr\Desktop\mentoria militar"

git init
git add .
git commit -m "Initial commit: OrientaciónMilitar v1.0"

# En GitHub, crea un repositorio nuevo
# Luego ejecuta (reemplaza TU-USUARIO):
git remote add origin https://github.com/TU-USUARIO/orientacion-militar.git
git branch -M main
git push -u origin main
```

### 3. Netlify
```
1. Ve a https://app.netlify.com
2. "Add new site" → "Import an existing project"
3. Conecta GitHub
4. Selecciona tu repo
5. Build settings:
   - Build command: npm run build
   - Publish directory: .next
6. Environment variables:
   - NEXT_PUBLIC_WEB3FORMS_KEY = [tu access key]
7. Deploy site
```

---

## 🧪 DESPUÉS del Deployment

### Pruebas Funcionales
- [ ] Home carga correctamente
- [ ] Navbar funciona (todos los links)
- [ ] Botones "Reservar" funcionan
- [ ] Página `/reservar` carga
- [ ] Formulario de contacto envía emails
- [ ] Formulario de asesorías funciona
- [ ] Blog carga con todos los artículos
- [ ] Footer links funcionan
- [ ] Responsive en móvil

### SEO
- [ ] Meta tags visibles (inspeccionar HTML)
- [ ] Open Graph tags correctos
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] Imágenes optimizadas
- [ ] Carga rápida en móvil

---

## 🔧 CONFIGURACIONES POST-DEPLOY

### Dominio (Opcional)
- [ ] Comprar dominio (orientacionmilitar.com)
- [ ] Configurar DNS en Netlify
- [ ] SSL activado automáticamente

### Analytics
- [ ] Google Analytics 4 configurado
- [ ] Google Search Console añadido
- [ ] Sitemap enviado a GSC

### Stripe (Cuando estés listo)
- [ ] Stripe cuenta creada
- [ ] Payment Link creado (75€)
- [ ] Link añadido a `StripeCheckoutButton.tsx`
- [ ] Probado en modo test
- [ ] Activado en producción

### Marketing
- [ ] Google My Business (si aplica)
- [ ] Perfiles de redes sociales
- [ ] Email marketing (si usas)

---

## 📊 MONITOREO

### Diario
- [ ] Revisar emails de Web3Forms
- [ ] Revisar errores de Netlify

### Semanal
- [ ] Analytics (tráfico, páginas top)
- [ ] Conversiones (formularios enviados)
- [ ] Uptime (que el sitio esté vivo)

### Mensual
- [ ] Publicar 2-3 nuevos blogs (SEO)
- [ ] Revisar posicionamiento keywords
- [ ] Optimizar páginas de bajo rendimiento

---

## 🐛 TROUBLESHOOTING COMÚN

### Build falla en Netlify
```
Causa: Node version o dependencies
Solución:
1. Verifica netlify.toml tiene NODE_VERSION = "18"
2. Revisa logs de build en Netlify
3. Corre npm run build localmente para ver errores
```

### Formularios no envían emails
```
Causa: Variable de entorno mal configurada
Solución:
1. Verifica NEXT_PUBLIC_WEB3FORMS_KEY está en Netlify
2. DEBE empezar con NEXT_PUBLIC_
3. Redeploya después de añadir variable
```

### 404 en páginas
```
Causa: Redirects no configurados
Solución:
1. Verifica netlify.toml existe en la raíz
2. Verifica tiene el redirect /* → /index.html
```

### Imágenes no cargan
```
Causa: Ruta incorrecta
Solución:
1. Imágenes deben estar en /public/images/
2. Usa rutas absolutas: /images/logo.png (NO ./images/)
```

---

## 🎯 MÉTRICAS DE ÉXITO

### Mes 1
- [ ] 100+ visitantes únicos
- [ ] 5+ formularios enviados
- [ ] 0 errores críticos
- [ ] 95%+ uptime

### Mes 3
- [ ] 500+ visitantes únicos
- [ ] 15+ formularios enviados
- [ ] 2-3 ventas de asesorías
- [ ] Posicionado en 1-3 keywords

### Mes 6
- [ ] 2000+ visitantes únicos
- [ ] 50+ formularios enviados
- [ ] 10-15 ventas/mes
- [ ] Top 10 en 5+ keywords

---

**¿Todo listo? ¡A desplegar! 🚀**

Lee `DEPLOY-NETLIFY.md` para instrucciones paso a paso detalladas.

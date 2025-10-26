# 🚀 Quick Start - 3 Pasos para Estar LIVE

## ⚡ OPCIÓN RÁPIDA (15 minutos)

### PASO 1: Obtén tu Web3Forms Access Key (2 min)

```
1. Ve a: https://web3forms.com
2. Clic en "Get Started Free"
3. Regístrate con tu email
4. Verifica tu email
5. Copia el Access Key (guardalo!)
```

---

### PASO 2: Sube a GitHub (5 min)

#### 2.1 Crea repo en GitHub
```
1. Ve a: https://github.com/new
2. Nombre: orientacion-militar
3. Público o Privado (da igual)
4. NO marques ninguna opción
5. Clic "Create repository"
```

#### 2.2 Sube tu código
```bash
# Abre PowerShell o CMD en tu carpeta del proyecto
cd "C:\Users\adlrr\Desktop\mentoria militar"

git init
git add .
git commit -m "First commit"

# REEMPLAZA tu-usuario con tu usuario de GitHub
git remote add origin https://github.com/tu-usuario/orientacion-militar.git

git branch -M main
git push -u origin main
```

---

### PASO 3: Deploy en Netlify (8 min)

#### 3.1 Conecta GitHub
```
1. Ve a: https://app.netlify.com
2. Clic "Add new site" → "Import an existing project"
3. Clic "GitHub"
4. Autoriza Netlify (solo primera vez)
5. Busca y selecciona "orientacion-militar"
```

#### 3.2 Configura Build
```
Build command: npm run build
Publish directory: .next

¡NO hagas deploy todavía!
```

#### 3.3 Añade Variables de Entorno
```
1. Clic "Site settings"
2. Clic "Environment variables"
3. Clic "Add a variable"

Key: NEXT_PUBLIC_WEB3FORMS_KEY
Value: [pega tu Access Key de Web3Forms]

4. Clic "Create variable"
```

#### 3.4 Deploy!
```
1. Vuelve a "Deploys"
2. Clic "Deploy site"
3. Espera 2-3 minutos...
4. ✅ ¡LIVE!
```

---

## 🎉 ¡FELICIDADES!

Tu sitio está en:
```
https://random-name-123.netlify.app
```

### Cambiar el nombre (opcional)
```
1. Site settings → Domain management
2. Options → Edit site name
3. Elige: orientacion-militar
4. Ahora será: https://orientacion-militar.netlify.app
```

---

## ✅ PRUEBA QUE FUNCIONA

### 1. Abre tu sitio
```
https://orientacion-militar.netlify.app
```

### 2. Prueba el formulario
```
1. Ve a /contacto
2. Llena el formulario
3. Envía
4. Revisa tu email (el que registraste en Web3Forms)
5. Deberías recibir el mensaje!
```

### 3. Prueba todas las páginas
- Home: `/`
- Reservar: `/reservar`
- Blog: `/blog`
- Contacto: `/contacto`

---

## 📝 PRÓXIMOS PASOS

### Inmediatos (hoy)
- [ ] Personaliza datos de contacto reales
- [ ] Añade tu logo
- [ ] Prueba formularios

### Esta semana
- [ ] Configura Stripe para pagos (lee `STRIPE-CONFIG.md`)
- [ ] Compra tu dominio (opcional)
- [ ] Añade Google Analytics

### Este mes
- [ ] Publica 2-3 blogs/semana
- [ ] Empieza SEO (lee `SEO-STRATEGY.md`)
- [ ] Primeros clientes!

---

## 🆘 AYUDA

### Build falla
```
1. Mira los logs en Netlify
2. Corre `npm run build` localmente
3. Lee el error
```

### Formulario no funciona
```
1. Verifica la variable de entorno en Netlify
2. Debe ser: NEXT_PUBLIC_WEB3FORMS_KEY
3. Redeploya: Deploys → Trigger deploy → Clear cache and deploy
```

### Necesitas más ayuda
- Lee `DEPLOY-NETLIFY.md` (guía completa paso a paso)
- Lee `DEPLOYMENT-CHECKLIST.md` (todos los checks)
- Documentación Netlify: https://docs.netlify.com

---

**¡Listo para ser millonario! 💰**

(O al menos para ayudar a gente a elegir bien su carrera militar 😄)

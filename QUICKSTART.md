# 🚀 Guía Rápida de Inicio

## Instalación en 3 pasos

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Iniciar servidor de desarrollo
```bash
npm run dev
```

### 3️⃣ Abrir en navegador
Visita: [http://localhost:3000](http://localhost:3000)

---

## ✏️ Personalización Rápida

### Cambiar información de contacto

**Footer** → `components/Footer.tsx`
```typescript
// Línea ~40
<a href="mailto:TU_EMAIL@ejemplo.com">
<a href="tel:+34TU_TELEFONO">
```

**Página de contacto** → `app/contacto/page.tsx`

### Cambiar textos principales

**Home** → `app/page.tsx`
- Título hero: línea ~15
- Beneficios: línea ~50
- Testimonios: línea ~200

**Asesorías** → `app/asesorias/page.tsx`

### Cambiar colores

**Tailwind** → `tailwind.config.ts`
```typescript
'military-cream': '#TU_COLOR',
'military-olive': '#TU_COLOR',
// etc.
```

---

## 📝 Añadir nuevo post al blog

1. Crea archivo en: `content/blog/mi-nuevo-post.md`

2. Añade contenido:
```markdown
---
title: "Título del post"
date: "2024-01-20"
excerpt: "Resumen corto"
author: "Tu Nombre"
tags: ["tag1", "tag2"]
---

Contenido en Markdown...
```

3. ¡Listo! Aparecerá automáticamente en `/blog`

---

## 🚀 Despliegue en Vercel

1. Sube código a GitHub
2. Conecta repositorio en [vercel.com](https://vercel.com)
3. Click "Deploy"
4. ¡Listo!

---

## 📞 Ayuda

Lee el README completo para más detalles: `README.md`

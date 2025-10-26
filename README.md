# OrientaciónMilitar.com 🎖️

Plataforma web profesional de asesorías militares personalizadas, construida con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- ✅ **Next.js 14 con App Router** - Framework moderno y optimizado
- ✅ **TypeScript** - Tipado estricto para mejor mantenibilidad
- ✅ **Tailwind CSS** - Diseño responsivo y moderno
- ✅ **Sistema de Blog con Markdown** - Gestión sencilla de contenido
- ✅ **SEO Optimizado** - Meta tags, sitemap, robots.txt
- ✅ **Diseño Institucional Militar** - Paleta de colores sobria y profesional
- ✅ **100% Responsive** - Adaptado a móviles, tablets y desktop
- ✅ **Web3Forms Integrado** - Formularios funcionales sin backend
- ✅ **Listo para Netlify** - Despliegue automatizado con documentación completa

## 📁 Estructura del Proyecto

```
orientacion-militar/
├── app/                          # App Router de Next.js 14
│   ├── layout.tsx               # Layout principal con metadatos SEO
│   ├── page.tsx                 # Página principal (Home) - 677 líneas
│   ├── reservar/                # Página de checkout optimizada (conversión)
│   ├── confirmacion/            # Página de confirmación post-pago
│   ├── asesorias/               # Página informativa de asesorías
│   ├── blog/                    # Sistema de blog
│   │   ├── page.tsx            # Lista de posts
│   │   └── [slug]/page.tsx     # Post individual (dinámico)
│   ├── sobre-nosotros/          # Página Sobre Nosotros - Equipo de expertos
│   ├── contacto/                # Página de contacto
│   ├── politica-privacidad/     # Política de privacidad
│   ├── aviso-legal/             # Aviso legal
│   ├── not-found.tsx            # 404 personalizado
│   ├── sitemap.ts               # Sitemap dinámico
│   ├── manifest.ts              # PWA manifest
│   └── globals.css              # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── Navbar.tsx               # Navegación principal (Client Component)
│   ├── Footer.tsx               # Footer con enlaces
│   ├── BlogCard.tsx             # Tarjeta de post de blog
│   ├── AsesoriasForm.tsx        # Formulario de asesorías (Client Component)
│   ├── ContactoForm.tsx         # Formulario de contacto (Client Component)
│   ├── BackButton.tsx           # Botón de navegación (Client Component)
│   ├── StripeCheckoutButton.tsx # Botón de pago con Stripe (preparado)
│   └── CalendlyEmbed.tsx        # Integración Calendly (preparado)
├── content/                      # Contenido del sitio
│   └── blog/                    # Posts del blog en Markdown (6 artículos)
│       ├── como-elegir-destino-militar.md
│       ├── preparacion-oposiciones-militares.md
│       ├── vida-militar-expectativas-vs-realidad.md
│       ├── requisitos-ejercito-espanol-2024.md
│       ├── diferencias-tropa-marineria-suboficial.md
│       └── mejores-destinos-militares-espana-2024.md
├── lib/                          # Utilidades y helpers
│   └── blog.ts                  # Funciones para gestionar el blog
├── public/                       # Archivos estáticos
│   └── robots.txt               # Configuración para crawlers
├── .env.example                  # Variables de entorno de ejemplo
├── .gitignore                    # Archivos ignorados por Git
├── netlify.toml                  # Configuración para Netlify
├── package.json                  # Dependencias del proyecto
├── tsconfig.json                 # Configuración de TypeScript
├── tailwind.config.ts            # Configuración de Tailwind
├── next.config.mjs               # Configuración de Next.js
├── LISTO-PARA-NETLIFY.md        # Guía completa de deployment (IMPORTANTE)
├── QUICK-START.md                # Guía rápida de deployment (15 min)
├── DEPLOYMENT-CHECKLIST.md       # Checklist de deployment
├── STRIPE-CONFIG.md              # Configuración de Stripe
├── SEO-STRATEGY.md               # Estrategia SEO y keywords
├── CONVERSION-FUNNEL.md          # Análisis del funnel de conversión
└── README.md                     # Este archivo
```

## 🛠️ Instalación

### Requisitos previos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

### Pasos

1. **Clona o descarga el proyecto**

```bash
cd mentoria-militar
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Copia las variables de entorno (opcional)**

```bash
cp .env.example .env.local
```

4. **Ejecuta el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abre tu navegador**

Visita [http://localhost:3000](http://localhost:3000)

## 📝 Cómo Personalizar

### 1. Cambiar textos del sitio

Todos los textos están marcados con comentarios `PERSONALIZABLE` en el código. Busca estos comentarios y modifica según tus necesidades.

**Ejemplos de ubicaciones importantes:**

- **Título principal**: `app/page.tsx` - línea ~15
- **Beneficios**: `app/page.tsx` - línea ~50
- **Testimonios**: `app/page.tsx` - línea ~200
- **Datos de contacto**: `components/Footer.tsx` y `app/contacto/page.tsx`

### 2. Cambiar colores

Edita el archivo `tailwind.config.ts`:

```typescript
colors: {
  'military-cream': '#F3F2EF',    // Fondo principal
  'military-olive': '#3B4B39',    // Color primario
  'military-gray': '#6B705C',     // Color secundario
  'military-dark': '#1B1B1B',     // Texto principal
  'military-light': '#E8E6E3',    // Fondo alternativo
}
```

### 3. Añadir un nuevo post al blog

Crea un archivo `.md` en `content/blog/` con el siguiente formato:

```markdown
---
title: "Título de tu artículo"
date: "2024-01-20"
excerpt: "Resumen corto del artículo que aparecerá en la lista"
author: "Tu Nombre"
tags: ["tag1", "tag2"]
---

Aquí va el contenido de tu artículo en Markdown.

## Subtítulo

Párrafos, listas, enlaces, etc.
```

El post aparecerá automáticamente en `/blog`.

### 4. Modificar metadatos SEO

Edita `app/layout.tsx` para cambiar los metadatos globales:

```typescript
export const metadata: Metadata = {
  title: 'Tu título aquí',
  description: 'Tu descripción aquí',
  // ... más opciones
}
```

### 5. Configurar Web3Forms

Los formularios ya están integrados con [Web3Forms](https://web3forms.com). Solo necesitas:

1. **Obtener tu Access Key** (GRATIS):
   - Ve a https://web3forms.com
   - Regístrate con tu email
   - Copia tu Access Key

2. **Añadir la variable de entorno**:
   ```bash
   # En .env.local (desarrollo)
   NEXT_PUBLIC_WEB3FORMS_KEY=tu_access_key_aqui
   ```

3. **En Netlify** (producción):
   - Ve a Site settings → Environment variables
   - Añade: `NEXT_PUBLIC_WEB3FORMS_KEY` con tu Access Key

**Los formularios funcionan automáticamente** una vez configurada la variable.

### 6. Añadir Google Analytics

1. Obtén tu ID de Google Analytics (G-XXXXXXXXXX)
2. Añade el script en `app/layout.tsx`:

```typescript
<Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

3. Añade `NEXT_PUBLIC_GA_ID` a tu `.env.local`

## 🚀 Despliegue en Netlify

**📖 DOCUMENTACIÓN COMPLETA**: Lee `LISTO-PARA-NETLIFY.md` para instrucciones detalladas paso a paso.

**⚡ GUÍA RÁPIDA (15 minutos)**: Lee `QUICK-START.md` para deployment express.

### Resumen del proceso:

1. **Obtén Web3Forms Access Key** (2 minutos)
   - Regístrate gratis en https://web3forms.com
   - Copia tu Access Key

2. **Sube a GitHub** (5 minutos)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: OrientaciónMilitar.com v1.0"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/orientacion-militar.git
   git push -u origin main
   ```

3. **Deploy en Netlify** (8 minutos)
   - Ve a https://app.netlify.com
   - Import from GitHub
   - Configura:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Añade variable de entorno: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Deploy!

4. **Configura tu dominio** (5 minutos)
   - En Netlify: Domain management → Add custom domain
   - Configura DNS (nameservers o registros A/CNAME)
   - HTTPS se activa automáticamente

**📋 Checklist completo**: `DEPLOYMENT-CHECKLIST.md`

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Military Cream | `#F3F2EF` | Fondo principal |
| Military Olive | `#3B4B39` | Color primario, botones |
| Military Gray | `#6B705C` | Color secundario |
| Military Dark | `#1B1B1B` | Texto principal |
| Military Light | `#E8E6E3` | Fondos alternativos |

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🔧 Tecnologías Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Markdown**: [gray-matter](https://github.com/jonschlinkert/gray-matter) + [react-markdown](https://github.com/remarkjs/react-markdown)
- **Iconos**: [Lucide React](https://lucide.dev/)

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 🤝 Soporte

Si tienes dudas o necesitas ayuda:

- 📧 Email: info@orientacionmilitar.com
- 📱 WhatsApp: +34 600 000 000

---

**Desarrollado con ❤️ para ayudar a futuros militares a tomar las mejores decisiones.**

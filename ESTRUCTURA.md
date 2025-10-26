# 📂 Estructura Detallada del Proyecto

## Árbol de directorios

```
orientacion-militar/
│
├── 📁 app/                           # App Router de Next.js 14
│   ├── 📄 layout.tsx                # Layout raíz con SEO global
│   ├── 📄 page.tsx                  # Página HOME (/)
│   ├── 📄 globals.css               # Estilos globales + Tailwind
│   ├── 📄 not-found.tsx             # 404 personalizado
│   ├── 📄 sitemap.ts                # Sitemap dinámico
│   ├── 📄 manifest.ts               # PWA Manifest
│   │
│   ├── 📁 asesorias/                # (/asesorias)
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 blog/                     # (/blog)
│   │   ├── 📄 page.tsx              # Lista de posts
│   │   └── 📁 [slug]/               # Post dinámico (/blog/[slug])
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 sobre-nosotros/           # (/sobre-nosotros)
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 contacto/                 # (/contacto)
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 politica-privacidad/      # (/politica-privacidad)
│   │   └── 📄 page.tsx
│   │
│   └── 📁 aviso-legal/              # (/aviso-legal)
│       └── 📄 page.tsx
│
├── 📁 components/                    # Componentes reutilizables
│   ├── 📄 Navbar.tsx                # Navegación principal
│   ├── 📄 Footer.tsx                # Footer global
│   └── 📄 BlogCard.tsx              # Tarjeta de post
│
├── 📁 content/                       # Contenido del sitio
│   └── 📁 blog/                     # Posts en Markdown
│       ├── 📄 como-elegir-destino-militar.md
│       ├── 📄 preparacion-oposiciones-militares.md
│       └── 📄 vida-militar-expectativas-vs-realidad.md
│
├── 📁 lib/                           # Utilidades
│   └── 📄 blog.ts                   # Funciones para blog (leer MD)
│
├── 📁 public/                        # Archivos estáticos
│   ├── 📄 robots.txt                # SEO: robots
│   └── 📄 favicon.ico               # (añadir tu favicon)
│
├── 📄 package.json                   # Dependencias
├── 📄 tsconfig.json                  # Config TypeScript
├── 📄 tailwind.config.ts             # Config Tailwind
├── 📄 next.config.mjs                # Config Next.js
├── 📄 postcss.config.mjs             # Config PostCSS
├── 📄 .gitignore                     # Archivos ignorados por Git
├── 📄 .env.example                   # Ejemplo variables entorno
├── 📄 README.md                      # Documentación completa
├── 📄 QUICKSTART.md                  # Guía rápida
└── 📄 ESTRUCTURA.md                  # Este archivo
```

## 🎯 Páginas y Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Página principal |
| `/asesorias` | `app/asesorias/page.tsx` | Asesorías y reservas |
| `/blog` | `app/blog/page.tsx` | Lista de posts |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Post individual |
| `/sobre-nosotros` | `app/sobre-nosotros/page.tsx` | Sobre nosotros |
| `/contacto` | `app/contacto/page.tsx` | Contacto |
| `/politica-privacidad` | `app/politica-privacidad/page.tsx` | Política privacidad |
| `/aviso-legal` | `app/aviso-legal/page.tsx` | Aviso legal |
| `*` | `app/not-found.tsx` | 404 |

## 🧩 Componentes

### Navbar.tsx
- Navegación responsive
- Menú móvil hamburguesa
- Links a todas las secciones
- Botón CTA "Reservar Asesoría"

### Footer.tsx
- Logo y descripción
- Enlaces rápidos
- Información de contacto
- Links a políticas
- Copyright

### BlogCard.tsx
- Tarjeta para posts del blog
- Fecha, título, excerpt
- Tags
- Botón "Leer más"

## 📝 Sistema de Blog

### Cómo funciona
1. Posts escritos en Markdown en `content/blog/`
2. Función `getPostBySlug()` en `lib/blog.ts` lee el MD
3. `gray-matter` parsea frontmatter (metadatos)
4. `react-markdown` renderiza el contenido
5. Páginas generadas estáticamente en build time

### Estructura de un post
```markdown
---
title: "Título"
date: "YYYY-MM-DD"
excerpt: "Resumen"
author: "Autor"
tags: ["tag1", "tag2"]
---

Contenido Markdown...
```

## 🎨 Estilos

### Paleta de colores (Tailwind)
- `military-cream`: #F3F2EF (fondo)
- `military-olive`: #3B4B39 (primario)
- `military-gray`: #6B705C (secundario)
- `military-dark`: #1B1B1B (texto)
- `military-light`: #E8E6E3 (fondo alt)

### Clases utilitarias personalizadas
- `.btn-primary`: Botón principal
- `.btn-secondary`: Botón secundario
- `.card`: Tarjeta con sombra
- `.section-container`: Container de sección
- `.heading-1/2/3`: Títulos estandarizados
- `.markdown-content`: Estilos para contenido MD

## 🔍 SEO

### Implementado
✅ Meta tags en cada página
✅ Open Graph tags
✅ Twitter Cards
✅ Sitemap dinámico (`/sitemap.xml`)
✅ Robots.txt (`/robots.txt`)
✅ Manifest para PWA
✅ URLs semánticas
✅ Estructura de headings correcta

### Por implementar (opcional)
⬜ Google Analytics
⬜ Schema.org structured data
⬜ Imágenes optimizadas con Next/Image

## 🚀 Despliegue

### Vercel (recomendado)
- Detecta Next.js automáticamente
- Build y deploy en minutos
- SSL incluido
- Edge functions
- Dominios custom gratis

### Otras opciones
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

---

**Nota**: Para más detalles, consulta `README.md`

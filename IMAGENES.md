# 🖼️ Guía de Imágenes

Este proyecto no incluye imágenes reales para mantenerlo ligero. Aquí te explico qué imágenes necesitas y cómo añadirlas.

## 📋 Imágenes Necesarias

### Esenciales (Obligatorias)

#### 1. Favicon
- **Ubicación**: `public/favicon.ico`
- **Formato**: ICO o PNG
- **Tamaño**: 32x32px o 16x16px
- **Herramientas**: [Favicon Generator](https://favicon.io/)

#### 2. Logo (Opcional)
- **Ubicación**: `public/logo.svg` o `public/logo.png`
- **Formato**: SVG (preferido) o PNG
- **Tamaño**: Variable, típicamente 200x50px
- **Uso**: Navbar, Footer

#### 3. Open Graph Image
- **Ubicación**: `public/og-image.jpg`
- **Formato**: JPG o PNG
- **Tamaño**: 1200x630px
- **Uso**: Preview al compartir en redes sociales

#### 4. Twitter Card Image
- **Ubicación**: `public/twitter-image.jpg`
- **Formato**: JPG o PNG
- **Tamaño**: 1200x600px
- **Uso**: Preview al compartir en Twitter

#### 5. PWA Icons
- **Ubicación**: `public/icon-192.png` y `public/icon-512.png`
- **Formato**: PNG
- **Tamaños**: 192x192px y 512x512px
- **Uso**: App móvil (PWA)

### Opcionales (Mejoran la experiencia)

#### 6. Imágenes de Hero Section
- **Ubicación**: `public/images/hero-*.jpg`
- **Formato**: JPG optimizado (WebP mejor)
- **Tamaño**: 1920x1080px o similar
- **Uso**: Fondo de secciones principales

#### 7. Imágenes de Blog
- **Ubicación**: `public/images/blog/`
- **Formato**: JPG o WebP
- **Tamaño**: 1200x630px
- **Uso**: Featured images en posts

## 🛠️ Cómo Añadir Imágenes

### Método 1: Usando Next.js Image Component (Recomendado)

```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="OrientaciónMilitar Logo"
  width={200}
  height={50}
  priority
/>
```

**Ventajas**:
- Optimización automática
- Lazy loading
- Responsive automático
- Mejor rendimiento

### Método 2: Tag HTML tradicional

```tsx
<img src="/logo.png" alt="OrientaciónMilitar Logo" />
```

**Cuándo usar**:
- Imágenes muy pequeñas
- SVGs simples
- Cuando Next/Image causa problemas

## 📁 Estructura Recomendada

```
public/
├── favicon.ico
├── logo.svg (o .png)
├── og-image.jpg
├── twitter-image.jpg
├── icon-192.png
├── icon-512.png
└── images/
    ├── hero/
    │   ├── hero-main.jpg
    │   └── hero-about.jpg
    ├── blog/
    │   ├── post-1.jpg
    │   ├── post-2.jpg
    │   └── post-3.jpg
    └── team/
        ├── member-1.jpg
        └── member-2.jpg
```

## 🎨 Recursos para Imágenes Gratuitas

### Fotos de Stock

1. **[Unsplash](https://unsplash.com/)**
   - Gratis para uso comercial
   - Alta calidad
   - Búsqueda: "military", "soldier", "army"

2. **[Pexels](https://www.pexels.com/)**
   - Similar a Unsplash
   - Buena selección militar/institucional

3. **[Pixabay](https://pixabay.com/)**
   - Gratis, sin atribución
   - Variedad de estilos

### Generadores de Logos/Iconos

1. **[Canva](https://www.canva.com/)**
   - Plantillas profesionales
   - Fácil de usar
   - Versión gratis disponible

2. **[Logo Maker](https://www.shopify.com/tools/logo-maker)**
   - Generador automático
   - Opciones militares

3. **[Favicon.io](https://favicon.io/)**
   - Generador de favicons
   - Desde texto, imagen o emoji

### Optimización de Imágenes

1. **[TinyPNG](https://tinypng.com/)**
   - Comprime JPG y PNG
   - Sin pérdida visible de calidad

2. **[Squoosh](https://squoosh.app/)**
   - De Google
   - Múltiples formatos
   - Comparación visual

3. **[ImageOptim](https://imageoptim.com/)** (Mac)
   - App de escritorio
   - Compresión lossless

## 🎯 Ejemplo: Añadir Logo al Navbar

### Paso 1: Coloca la imagen
Guarda tu logo en: `public/logo.svg`

### Paso 2: Modifica el Navbar
Edita `components/Navbar.tsx`:

```tsx
import Image from 'next/image'

// Reemplaza el icono Shield con:
<Link href="/" className="flex items-center space-x-2 group">
  <Image
    src="/logo.svg"
    alt="OrientaciónMilitar Logo"
    width={40}
    height={40}
    priority
  />
  <span className="text-xl font-bold text-military-olive">
    Orientación<span className="text-military-gray">Militar</span>
  </span>
</Link>
```

## 🖼️ Ejemplo: Añadir Imagen al Hero

Edita `app/page.tsx`:

```tsx
<section className="relative bg-gradient-to-br from-military-cream to-military-light py-20 md:py-32">
  {/* Imagen de fondo (opcional) */}
  <div className="absolute inset-0 opacity-10">
    <Image
      src="/images/hero-main.jpg"
      alt="Background"
      fill
      className="object-cover"
      priority
    />
  </div>

  {/* Contenido existente */}
  <div className="section-container relative z-10">
    {/* ... */}
  </div>
</section>
```

## ⚠️ Consejos Importantes

1. **Siempre optimiza las imágenes** antes de subirlas
2. **Usa WebP** cuando sea posible (mejor compresión)
3. **Nombres descriptivos**: `hero-asesorias.jpg` mejor que `img1.jpg`
4. **Alt text**: Siempre describe la imagen para SEO y accesibilidad
5. **Tamaños apropiados**: No uses 4K para un thumbnail
6. **Lazy loading**: Deja que Next.js lo maneje automáticamente

## 🚀 Siguientes Pasos

1. Busca o crea tus imágenes
2. Optimízalas con las herramientas mencionadas
3. Colócalas en `public/` con nombres descriptivos
4. Actualiza los componentes para usarlas
5. Prueba que se vean correctamente en todos los dispositivos

---

**Recuerda**: Las imágenes afectan mucho al rendimiento del sitio. ¡Optimiza siempre!

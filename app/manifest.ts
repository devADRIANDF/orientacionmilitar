import { MetadataRoute } from 'next'

// PWA Manifest
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Orientación Militar',
    short_name: 'OrientaciónMilitar',
    description: 'Asesorías militares personalizadas para tu futuro en el Ejército Español',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F2EF',
    theme_color: '#3B4B39',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

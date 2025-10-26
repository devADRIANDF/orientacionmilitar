import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

// Generar sitemap dinámico
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://orientacionmilitar.com'

  // Páginas estáticas
  const staticPages = [
    '',
    '/asesorias',
    '/blog',
    '/sobre-nosotros',
    '/contacto',
    '/politica-privacidad',
    '/aviso-legal',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Posts del blog
  const posts = getAllPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}

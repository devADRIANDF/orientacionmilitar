import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { Calendar, ArrowLeft, User } from 'lucide-react'

// Generar páginas estáticas para todos los posts
export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title: `${post.title} | Blog Orientación Militar`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
      },
    }
  } catch {
    return {
      title: 'Post no encontrado | Blog Orientación Militar',
    }
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  // Formatear fecha
  const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Header del artículo */}
      <article className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Botón de volver */}
          <Link
            href="/blog"
            className="inline-flex items-center text-military-olive hover:text-military-gray mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al blog
          </Link>

          {/* Título y metadata */}
          <header className="mb-8">
            <h1 className="heading-1 mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-military-gray">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>

              {post.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-military-olive/10 text-military-olive px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Contenido del artículo */}
          <div className="markdown-content prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Separador */}
          <div className="border-t border-military-gray/20 my-12"></div>

          {/* CTA al final del artículo */}
          <div className="bg-military-cream rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-military-olive mb-4">
              ¿Necesitas orientación personalizada?
            </h3>
            <p className="text-military-gray mb-6">
              Resuelve todas tus dudas en una sesión individual con expertos militares
            </p>
            <Link href="/reservar" className="btn-primary">
              Reservar Asesoría
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}

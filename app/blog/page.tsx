import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import { BookOpen } from 'lucide-react'

// SEO para la página del blog
export const metadata: Metadata = {
  title: 'Blog de Orientación Militar | Consejos y Guías',
  description: 'Artículos, consejos y guías sobre la vida militar, destinos, especialidades y proceso de selección del Ejército Español.',
  openGraph: {
    title: 'Blog de Orientación Militar',
    description: 'Artículos y guías sobre carrera militar en España',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-military-olive to-military-gray text-white py-16">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4">
            <BookOpen className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-military-cream/90 max-w-2xl mx-auto">
            Guías, consejos y recursos para orientarte en tu carrera militar
          </p>
        </div>
      </section>

      {/* Lista de posts */}
      <section className="section-container">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-military-gray">
              Próximamente publicaremos artículos sobre orientación militar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                tags={post.tags}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

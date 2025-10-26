import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
}

const BlogCard = ({ slug, title, date, excerpt, tags }: BlogCardProps) => {
  // Formatear fecha
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="card hover-lift">
      <div className="flex items-center text-sm text-military-gray mb-3">
        <Calendar className="h-4 w-4 mr-2" />
        <time dateTime={date}>{formattedDate}</time>
      </div>

      <h2 className="text-2xl font-bold text-military-olive mb-3 hover:text-military-gray transition-colors">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>

      <p className="text-military-gray leading-relaxed mb-4">{excerpt}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-military-olive/10 text-military-olive px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center text-military-olive font-medium hover:text-military-gray transition-colors group"
      >
        <span>Leer más</span>
        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  )
}

export default BlogCard

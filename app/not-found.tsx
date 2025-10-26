import Link from 'next/link'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'
import BackButton from '@/components/BackButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-military-cream to-military-light flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Icono de alerta */}
        <div className="inline-flex items-center justify-center p-6 bg-military-olive/10 rounded-full mb-6">
          <AlertTriangle className="h-24 w-24 text-military-olive" />
        </div>

        {/* Código de error */}
        <h1 className="text-8xl md:text-9xl font-bold text-military-olive mb-4">
          404
        </h1>

        {/* Mensaje */}
        <h2 className="text-3xl md:text-4xl font-bold text-military-dark mb-4">
          Página no encontrada, soldado
        </h2>

        <p className="text-xl text-military-gray mb-8 leading-relaxed">
          Parece que has tomado un camino equivocado. Esta ruta no existe en nuestro mapa de operaciones.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
          <BackButton />
        </div>

        {/* Sugerencias */}
        <div className="mt-12 pt-8 border-t border-military-gray/20">
          <p className="text-military-gray mb-4">¿Necesitas ayuda? Visita:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/asesorias" className="text-military-olive hover:text-military-gray transition-colors">
              Asesorías
            </Link>
            <span className="text-military-gray">•</span>
            <Link href="/blog" className="text-military-olive hover:text-military-gray transition-colors">
              Blog
            </Link>
            <span className="text-military-gray">•</span>
            <Link href="/contacto" className="text-military-olive hover:text-military-gray transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

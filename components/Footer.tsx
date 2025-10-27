import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-military-olive text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="OrientaciónMilitar.com Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-military-cream/80 text-sm leading-relaxed max-w-md">
              Tu guía personalizada para elegir tu futuro militar. Asesorías profesionales
              basadas en experiencia real dentro del Ejército Español.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-military-cream/80 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/asesorias" className="text-military-cream/80 hover:text-white transition-colors">
                  Asesorías
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-military-cream/80 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-military-cream/80 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-military-cream/80 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@orientacionmilitar.com" className="text-military-cream/80 hover:text-white transition-colors">
                  info@orientacionmilitar.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+34600000000" className="text-military-cream/80 hover:text-white transition-colors">
                  +34 600 000 000
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-military-cream/80">
                  Madrid, España
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-military-cream/20 my-8"></div>

        {/* Derechos y políticas */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-military-cream/70">
          <p>© {currentYear} OrientaciónMilitar.com - Todos los derechos reservados</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/politica-privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/aviso-legal" className="hover:text-white transition-colors">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

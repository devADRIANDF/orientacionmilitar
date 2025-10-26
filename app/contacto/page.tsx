import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import ContactoForm from '@/components/ContactoForm'

// SEO para Contacto
export const metadata: Metadata = {
  title: 'Contacto | Orientación Militar',
  description: 'Ponte en contacto con nosotros. Resolveremos tus dudas sobre nuestras asesorías militares.',
  openGraph: {
    title: 'Contacto | Orientación Militar',
    description: 'Ponte en contacto con nosotros',
  },
}

export default function ContactoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-military-olive to-military-gray text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contacto
          </h1>
          <p className="text-xl text-military-cream/90 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h2 className="text-3xl font-bold text-military-olive mb-6">
              Información de Contacto
            </h2>
            <p className="text-military-gray mb-8 leading-relaxed">
              Puedes contactarnos por cualquiera de estos medios. Respondemos todas
              las consultas en menos de 24 horas.
            </p>

            <div className="space-y-6">
              {/* PERSONALIZABLE: Datos de contacto */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                  <Mail className="h-6 w-6 text-military-olive" />
                </div>
                <div>
                  <h3 className="font-semibold text-military-dark mb-1">Email</h3>
                  <a
                    href="mailto:info@orientacionmilitar.com"
                    className="text-military-olive hover:text-military-gray transition-colors"
                  >
                    info@orientacionmilitar.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                  <Phone className="h-6 w-6 text-military-olive" />
                </div>
                <div>
                  <h3 className="font-semibold text-military-dark mb-1">Teléfono / WhatsApp</h3>
                  <a
                    href="tel:+34600000000"
                    className="text-military-olive hover:text-military-gray transition-colors"
                  >
                    +34 600 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-military-olive" />
                </div>
                <div>
                  <h3 className="font-semibold text-military-dark mb-1">Ubicación</h3>
                  <p className="text-military-gray">Madrid, España</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-military-olive" />
                </div>
                <div>
                  <h3 className="font-semibold text-military-dark mb-1">Horario de atención</h3>
                  <p className="text-military-gray">Lunes a Viernes: 9:00 - 20:00</p>
                  <p className="text-military-gray">Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Mapa (placeholder) */}
            <div className="mt-8 bg-military-light rounded-lg overflow-hidden h-64">
              {/* PERSONALIZABLE: Añade aquí tu Google Maps embed */}
              <div className="w-full h-full flex items-center justify-center text-military-gray">
                <p className="text-center">
                  [Google Maps Embed]<br />
                  <span className="text-sm">Añade tu código de Google Maps aquí</span>
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <div className="card">
              <h2 className="text-3xl font-bold text-military-olive mb-6">
                Envíanos un mensaje
              </h2>

              {/* PERSONALIZABLE: Formulario (actualmente placeholder) */}
              <ContactoForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

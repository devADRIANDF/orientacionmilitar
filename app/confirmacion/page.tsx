import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Calendar, Mail, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pago Confirmado ✅ | Orientación Militar',
  description: 'Tu pago ha sido procesado exitosamente. Te contactaremos pronto.',
}

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-military-cream py-16">
      <div className="section-container max-w-3xl mx-auto">

        {/* Éxito */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-6 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="h-24 w-24 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-military-olive mb-4">
            ¡Pago Confirmado!
          </h1>
          <p className="text-xl text-military-gray">
            Tu asesoría militar ha sido reservada exitosamente
          </p>
        </div>

        {/* Qué hacer ahora */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-military-olive mb-6">
            ✅ Próximos pasos
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-military-dark mb-1">
                  1. Revisa tu email
                </h3>
                <p className="text-military-gray">
                  Hemos enviado la confirmación de pago a tu correo electrónico con todos los detalles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-military-dark mb-1">
                  2. Te contactaremos por WhatsApp
                </h3>
                <p className="text-military-gray">
                  En las próximas <strong>24 horas</strong> te escribiremos para coordinar la fecha
                  y hora de tu asesoría que mejor se adapte a tu disponibilidad.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-military-dark mb-1">
                  3. Prepara tus dudas
                </h3>
                <p className="text-military-gray">
                  Mientras tanto, puedes ir pensando en las preguntas que quieres resolver sobre
                  destinos, especialidades o tu situación particular.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-military-cream rounded-lg p-6 mb-8">
          <h3 className="font-bold text-military-olive mb-3">📋 Información importante</h3>
          <ul className="space-y-2 text-military-gray">
            <li>• <strong>Duración:</strong> 1 hora de videollamada individual</li>
            <li>• <strong>Plataforma:</strong> Google Meet o Zoom (tú eliges)</li>
            <li>• <strong>Incluye:</strong> Informe personalizado PDF post-sesión</li>
            <li>• <strong>Seguimiento:</strong> 30 días de soporte por WhatsApp</li>
            <li>• <strong>Garantía:</strong> 7 días para solicitar reembolso completo</li>
          </ul>
        </div>

        {/* Contacto directo */}
        <div className="card text-center">
          <h3 className="text-xl font-bold text-military-olive mb-4">
            ¿Tienes alguna duda urgente?
          </h3>
          <p className="text-military-gray mb-6">
            Puedes contactarnos directamente ahora mismo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34600000000?text=Hola,%20acabo%20de%20pagar%20la%20asesoría"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              💬 WhatsApp
            </a>
            <a
              href="mailto:info@orientacionmilitar.com"
              className="btn-secondary"
            >
              📧 Email
            </a>
          </div>
        </div>

        {/* Volver al inicio */}
        <div className="text-center mt-8">
          <Link href="/" className="text-military-olive hover:text-military-gray transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

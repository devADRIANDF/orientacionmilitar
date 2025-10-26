import type { Metadata } from 'next'
import StripeCheckoutButton from '@/components/StripeCheckoutButton'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Reservar Asesoría - 75€ | Orientación Militar',
  description: 'Reserva tu sesión de asesoría militar personalizada. Elige tu horario y paga de forma segura.',
}

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-military-cream to-military-light py-16">
      <div className="section-container max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-military-olive mb-4">
            Reserva tu Asesoría Militar
          </h1>
          <p className="text-xl text-military-gray mb-6">
            Selecciona tu fecha y hora preferida, luego completa el pago de forma segura
          </p>
          <div className="inline-block bg-yellow-400 text-military-dark px-8 py-4 rounded-lg font-bold text-3xl shadow-lg">
            75€ - Pago único
          </div>
        </div>

        {/* OPCIÓN 1: CALENDLY (RECOMENDADA) */}
        {/* Descomenta esta sección si usas Calendly */}
        {/*
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-military-olive mb-4">
            Paso 1: Elige tu fecha y hora
          </h2>
          <CalendlyEmbed />
        </div>
        */}

        {/* OPCIÓN 2: STRIPE CHECKOUT DIRECTO (MÁS RÁPIDO) */}
        <div className="card">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-military-olive mb-4">
                ¿Cómo funciona?
              </h2>
              <div className="space-y-3 text-military-gray">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-military-olive text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <p>Haz clic en "Pagar 75€ con Stripe" abajo</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-military-olive text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <p>Completa el pago seguro con tarjeta</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-military-olive text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <p>Recibes email confirmación y enlace para elegir fecha/hora</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-military-olive text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <p>Te contactamos por WhatsApp para confirmar</p>
                </div>
              </div>
            </div>

            <div className="bg-military-cream rounded-lg p-6">
              <h3 className="font-bold text-military-olive mb-3">✅ Incluye:</h3>
              <ul className="space-y-2 text-military-gray">
                <li>• 1 hora de videollamada con experto militar</li>
                <li>• Informe personalizado post-sesión</li>
                <li>• Seguimiento durante 30 días por WhatsApp</li>
                <li>• Garantía de satisfacción o devolución</li>
              </ul>
            </div>

            {/* Botón de Stripe Checkout */}
            <StripeCheckoutButton />

            <p className="text-sm text-military-gray text-center">
              🔒 Pago 100% seguro procesado por Stripe. No guardamos datos de tu tarjeta.
            </p>
          </div>
        </div>

        {/* Garantía */}
        <div className="mt-8 text-center bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            ✅ Garantía de 7 días
          </h3>
          <p className="text-green-900">
            Si no quedas satisfecho con la asesoría, te devolvemos el 100% de tu dinero.
            Sin preguntas.
          </p>
        </div>
      </div>
    </div>
  )
}

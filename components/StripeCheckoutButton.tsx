'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'

export default function StripeCheckoutButton() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    // IMPORTANTE: Aquí irá la integración real con Stripe
    // Por ahora es un placeholder

    try {
      // Opción 1: Stripe Payment Link (más fácil - sin backend)
      // Simplemente redirige a un Payment Link de Stripe
      // window.location.href = 'https://buy.stripe.com/test_XXXXXX' // Tu link de Stripe

      // Opción 2: Stripe Checkout Session (requiere backend)
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId: 'price_XXXXXX' })
      // })
      // const { url } = await response.json()
      // window.location.href = url

      // PLACEHOLDER: Muestra las instrucciones
      alert(
        '🔧 CONFIGURACIÓN NECESARIA:\n\n' +
        '1. OPCIÓN FÁCIL (sin backend):\n' +
        '   - Ve a stripe.com/payments/payment-links\n' +
        '   - Crea un Payment Link de 75€\n' +
        '   - Copia el link y descomenta la línea 17\n\n' +
        '2. OPCIÓN PROFESIONAL (con backend):\n' +
        '   - Crea /app/api/create-checkout-session/route.ts\n' +
        '   - Integra Stripe SDK\n' +
        '   - Descomenta líneas 21-26\n\n' +
        '3. OPCIÓN CALENDLY:\n' +
        '   - Configura Calendly con pago integrado\n' +
        '   - Usa CalendlyEmbed component en reservar/page.tsx'
      )
    } catch (error) {
      console.error('Error:', error)
      alert('Error al procesar el pago. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-military-dark font-bold py-6 px-8 rounded-lg text-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
    >
      {loading ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Procesando...</span>
        </>
      ) : (
        <>
          <CreditCard className="h-6 w-6" />
          <span>Pagar 75€ con Stripe</span>
        </>
      )}
    </button>
  )
}

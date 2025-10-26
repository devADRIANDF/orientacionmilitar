'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'

export default function StripeCheckoutButton() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    try {
      // Crear sesión de Stripe Checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (data.url) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error('No se recibió URL de checkout')
      }
    } catch (error) {
      console.error('Error al crear sesión de pago:', error)
      alert('Error al procesar el pago. Por favor, inténtalo de nuevo o contacta con nosotros.')
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

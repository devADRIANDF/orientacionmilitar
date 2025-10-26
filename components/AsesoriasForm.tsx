'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function AsesoriasForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    // PERSONALIZABLE: Pon tu Access Key de Web3Forms aquí
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE'

    formData.append('access_key', accessKey)
    formData.append('subject', '🎯 Nueva solicitud de asesoría - OrientaciónMilitar.com')
    formData.append('from_name', 'Formulario de Asesorías')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        e.currentTarget.reset()
      } else {
        alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-4">¡Solicitud recibida! ✅</h3>
        <p className="text-green-900 mb-4">
          Te contactaremos en menos de 24 horas por WhatsApp o email para coordinar fecha y hora.
        </p>
        <p className="text-green-800 font-semibold mb-4">
          Próximo paso: Confirmar pago de 75€
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/reservar" className="btn-primary">
            Proceder al pago
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-military-dark mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-military-dark mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-military-dark mb-2">
          Teléfono / WhatsApp *
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          required
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="+34 600 000 000"
        />
      </div>

      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-military-dark mb-2">
          Fecha preferida
        </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
        />
      </div>

      <div>
        <label htmlFor="situacion" className="block text-sm font-medium text-military-dark mb-2">
          Tu situación actual *
        </label>
        <select
          id="situacion"
          name="situacion"
          required
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
        >
          <option value="">Selecciona una opción</option>
          <option value="aspirante">Aspirante (aún no he entrado)</option>
          <option value="preparando">Preparando pruebas físicas/psicotécnicas</option>
          <option value="aprobado">Ya he aprobado, pendiente de elegir destino</option>
          <option value="recien-incorporado">Recién incorporado (menos de 6 meses)</option>
          <option value="en-activo">Ya estoy en activo</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-military-dark mb-2">
          Mensaje (opcional)
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="Cuéntanos brevemente tu situación y qué dudas tienes..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
            Enviando solicitud...
          </>
        ) : (
          'Reservar Asesoría - 75€'
        )}
      </button>

      <p className="text-sm text-military-gray text-center">
        * Campos obligatorios. Te contactaremos en menos de 24 horas para confirmar fecha y hora.
      </p>
    </form>
  )
}

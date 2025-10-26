'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function ContactoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Envío a Netlify Forms (nativo de Netlify, sin servicios externos)
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-4">¡Mensaje enviado!</h3>
        <p className="text-green-900 mb-4">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-primary"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      name="contacto"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      {/* Campo oculto requerido por Netlify */}
      <input type="hidden" name="form-name" value="contacto" />

      {/* Honeypot anti-spam (oculto) */}
      <div style={{ display: 'none' }}>
        <label>
          No llenar si eres humano: <input name="bot-field" />
        </label>
      </div>

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
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="+34 600 000 000"
        />
      </div>

      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-military-dark mb-2">
          Asunto *
        </label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          required
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="¿En qué podemos ayudarte?"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-military-dark mb-2">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={6}
          className="w-full px-4 py-3 border border-military-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-military-olive"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar Mensaje'
        )}
      </button>

      <p className="text-sm text-military-gray text-center">
        * Campos obligatorios. Te responderemos en menos de 24 horas.
      </p>
    </form>
  )
}

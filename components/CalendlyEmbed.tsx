'use client'

import { useEffect } from 'react'

export default function CalendlyEmbed() {
  useEffect(() => {
    // Cargar el script de Calendly
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div>
      {/* PERSONALIZABLE: Reemplaza con tu URL de Calendly */}
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/TU-USUARIO/asesoria-militar-75?primary_color=3B4B39"
        style={{ minWidth: '320px', height: '700px' }}
      />

      {/* Si no tienes Calendly configurado, muestra esto: */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mt-4">
        <h3 className="font-bold text-yellow-800 mb-2">🔧 Configuración Calendly</h3>
        <ol className="text-sm text-yellow-900 space-y-2">
          <li>1. Ve a <a href="https://calendly.com" target="_blank" rel="noopener" className="underline">calendly.com</a> y crea una cuenta</li>
          <li>2. Crea un "Event Type" llamado "Asesoría Militar - 75€"</li>
          <li>3. En la configuración del evento:
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Duración: 60 minutos</li>
              <li>• Integra con Stripe para cobrar 75€</li>
              <li>• Configura disponibilidad horaria</li>
            </ul>
          </li>
          <li>4. Copia tu Calendly URL</li>
          <li>5. Pégala en la línea 20 de este archivo (CalendlyEmbed.tsx)</li>
        </ol>
      </div>
    </div>
  )
}

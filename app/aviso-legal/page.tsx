import type { Metadata } from 'next'
import { Scale } from 'lucide-react'

// SEO para Aviso Legal
export const metadata: Metadata = {
  title: 'Aviso Legal | Orientación Militar',
  description: 'Aviso legal y condiciones de uso de OrientaciónMilitar.com',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AvisoLegalPage() {
  return (
    <>
      <section className="bg-military-olive text-white py-12">
        <div className="section-container text-center">
          <Scale className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Aviso Legal</h1>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* PERSONALIZABLE: Texto legal de aviso legal */}
          <p className="text-military-gray italic mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">1. Datos identificativos</h2>
          <p className="text-military-gray leading-relaxed mb-4">
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Información y Comercio Electrónico, se exponen los siguientes datos:
          </p>
          <ul className="list-none pl-0 text-military-gray mb-6">
            <li><strong>Denominación social:</strong> [NOMBRE DE LA EMPRESA]</li>
            <li><strong>NIF:</strong> [NIF]</li>
            <li><strong>Domicilio:</strong> [DIRECCIÓN COMPLETA]</li>
            <li><strong>Email:</strong> info@orientacionmilitar.com</li>
            <li><strong>Teléfono:</strong> +34 600 000 000</li>
          </ul>

          <h2 className="text-2xl font-bold text-military-olive mb-4">2. Objeto</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            El presente aviso legal regula el uso y utilización del sitio web orientacionmilitar.com,
            del que es titular el responsable arriba identificado.
          </p>
          <p className="text-military-gray leading-relaxed mb-6">
            La navegación por el sitio web atribuye la condición de usuario del mismo e implica la
            aceptación plena de todas las cláusulas y condiciones de uso en la versión publicada.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">3. Servicios</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            A través del sitio web se facilita a los usuarios el acceso y la utilización de servicios
            de asesoría y orientación relacionados con la carrera militar en el Ejército Español.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">4. Responsabilidad</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            El titular no se hace responsable de la veracidad de la información no elaborada por él
            mismo y de la que se indique otra fuente, por lo que tampoco asume responsabilidad alguna
            sobre posibles errores u omisiones en dichos contenidos.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">5. Propiedad intelectual</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            Todos los contenidos del sitio web (textos, imágenes, marcas, gráficos, logotipos, etc.)
            son propiedad del titular o de terceros que han autorizado su uso, y están protegidos por
            los derechos de Propiedad Intelectual e Industrial.
          </p>
          <p className="text-military-gray leading-relaxed mb-6">
            El usuario se compromete a no reproducir, copiar, distribuir, transformar o modificar
            los contenidos sin autorización expresa del titular.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">6. Links o hiperenlaces</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            El sitio web puede incluir enlaces a sitios web de terceros. El titular no se responsabiliza
            del contenido, políticas de privacidad o prácticas de dichos sitios.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">7. Modificaciones</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            El titular se reserva el derecho a realizar modificaciones que considere oportunas,
            sin aviso previo, en el contenido del sitio web. Tanto en lo referente a los contenidos
            del sitio web, como en las condiciones de uso del mismo.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">8. Legislación aplicable</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
            relacionada con este sitio web, serán competentes los juzgados y tribunales de [CIUDAD].
          </p>

          <div className="bg-military-cream p-6 rounded-lg mt-8">
            <p className="text-military-gray text-sm">
              <strong>Nota:</strong> Este texto es un modelo genérico. Debes completar los datos identificativos
              con tu información real y, preferiblemente, consultar con un asesor legal para asegurar el
              cumplimiento normativo completo.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

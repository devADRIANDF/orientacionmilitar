import type { Metadata } from 'next'
import { Shield } from 'lucide-react'

// SEO para Política de Privacidad
export const metadata: Metadata = {
  title: 'Política de Privacidad | Orientación Militar',
  description: 'Política de privacidad y protección de datos de OrientaciónMilitar.com',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <section className="bg-military-olive text-white py-12">
        <div className="section-container text-center">
          <Shield className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Política de Privacidad</h1>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* PERSONALIZABLE: Texto legal de política de privacidad */}
          <p className="text-military-gray italic mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">1. Responsable del tratamiento</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            [NOMBRE DE LA EMPRESA O RESPONSABLE], con domicilio en [DIRECCIÓN], es el responsable
            del tratamiento de los datos personales del Usuario y le informa de que estos datos
            serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27
            de abril (GDPR), y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">2. Finalidad del tratamiento de datos</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            Los datos personales proporcionados a través de los formularios de la web serán tratados
            con las siguientes finalidades:
          </p>
          <ul className="list-disc pl-6 text-military-gray mb-6">
            <li>Gestión de solicitudes de asesoría y contacto</li>
            <li>Prestación de servicios de orientación militar</li>
            <li>Envío de comunicaciones relacionadas con los servicios contratados</li>
            <li>Cumplimiento de obligaciones legales</li>
          </ul>

          <h2 className="text-2xl font-bold text-military-olive mb-4">3. Legitimación</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            La base legal para el tratamiento de sus datos es el consentimiento del interesado
            y la ejecución de un contrato de prestación de servicios.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">4. Conservación de datos</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            Los datos personales se conservarán mientras se mantenga la relación contractual
            y durante los años necesarios para cumplir con las obligaciones legales.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">5. Comunicación de datos</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            Los datos no se comunicarán a terceros salvo obligación legal o consentimiento expreso
            del usuario.
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">6. Derechos del usuario</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            El usuario puede ejercer los siguientes derechos:
          </p>
          <ul className="list-disc pl-6 text-military-gray mb-6">
            <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos</li>
            <li>Derecho de limitación y oposición a su tratamiento</li>
            <li>Derecho a presentar una reclamación ante la autoridad de control (AEPD)</li>
          </ul>
          <p className="text-military-gray leading-relaxed mb-6">
            Para ejercer estos derechos, puede enviar un email a: info@orientacionmilitar.com
          </p>

          <h2 className="text-2xl font-bold text-military-olive mb-4">7. Seguridad de los datos</h2>
          <p className="text-military-gray leading-relaxed mb-6">
            El responsable del tratamiento ha adoptado las medidas técnicas y organizativas
            necesarias para garantizar la seguridad de los datos personales y evitar su alteración,
            pérdida, tratamiento o acceso no autorizado.
          </p>

          <div className="bg-military-cream p-6 rounded-lg mt-8">
            <p className="text-military-gray text-sm">
              <strong>Nota:</strong> Este texto es un modelo genérico. Debes adaptarlo a tu situación
              específica y, preferiblemente, consultar con un asesor legal para asegurar el cumplimiento
              normativo completo.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

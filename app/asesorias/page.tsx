import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Euro, FileCheck, Video, MessageCircle, CheckCircle2, AlertTriangle, Shield, Users, TrendingUp, Star, Brain, Target } from 'lucide-react'
import AsesoriasForm from '@/components/AsesoriasForm'

// SEO para la página de asesorías
export const metadata: Metadata = {
  title: 'Asesorías Militares Personalizadas 75€ | Orientación Militar',
  description: 'Asesoría personalizada de 1 hora por videollamada con expertos militares. Incluye informe post-sesión y seguimiento. Evita años de error por solo 75€.',
  openGraph: {
    title: 'Asesorías Militares Personalizadas - 75€',
    description: 'Sesión individual de 1 hora con expertos militares. Resuelve todas tus dudas sobre destinos y especialidades.',
  },
}

export default function AsesoriasPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-military-olive to-military-gray text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Asesorías Militares Personalizadas
          </h1>
          <p className="text-xl md:text-2xl text-military-cream/90 max-w-3xl mx-auto mb-6">
            Una hora de orientación profesional que puede ahorrarte años de arrepentimiento
          </p>
          <div className="inline-block bg-yellow-400 text-military-dark px-6 py-3 rounded-lg font-bold text-2xl">
            Solo 75€ - Inversión única
          </div>
        </div>
      </section>

      {/* Alerta de urgencia */}
      <section className="bg-red-50 border-y-2 border-red-200 py-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-3">
                ⚠️ Recuerda: Una vez elijas, no puedes cambiar
              </h2>
              <p className="text-lg text-red-900 leading-relaxed">
                Una decisión equivocada = 2-6 años en el lugar equivocado. Los 75€ de esta asesoría pueden ahorrarte
                literalmente AÑOS de insatisfacción y frustración profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué vale la pena */}
      <section className="section-container">
        <h2 className="heading-2 text-center mb-4">
          ¿Por qué invertir en una asesoría?
        </h2>
        <p className="text-xl text-center text-military-gray mb-12 max-w-3xl mx-auto">
          75€ vs años de tu vida. Tú decides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Sin asesoría */}
          <div className="card bg-red-50 border-2 border-red-200">
            <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
              <span className="text-3xl mr-2">❌</span> Sin asesoría
            </h3>
            <ul className="space-y-3 text-red-900">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Buscas info en Google durante semanas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Lees foros con información contradictoria</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Te basas en mitos y rumores</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Eliges sin conocer la realidad</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Te das cuenta del error... pero es tarde</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>2-6 años atrapado en tu decisión</strong></span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <p className="font-bold text-red-800 text-lg">
                Coste real: Miles de € en salario perdido + años de infelicidad
              </p>
            </div>
          </div>

          {/* Con asesoría */}
          <div className="card bg-green-50 border-2 border-green-500">
            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <span className="text-3xl mr-2">✅</span> Con asesoría
            </h3>
            <ul className="space-y-3 text-green-900">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>1 hora con experto militar real</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Información verificada y actualizada</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Desmontamos mitos, te damos hechos</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Análisis de tu perfil específico</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Eliges con pleno conocimiento</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Años de satisfacción profesional</strong></span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <p className="font-bold text-green-800 text-lg">
                Inversión: Solo 75€ (menos que una cena)
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 max-w-3xl mx-auto">
          <p className="text-2xl font-bold text-military-dark mb-2">
            ¿Merece la pena arriesgar años de tu vida por ahorrarte 75€?
          </p>
          <p className="text-lg text-military-gray">
            La respuesta es obvia. Esta inversión puede cambiar el rumbo de tu carrera.
          </p>
        </div>
      </section>

      {/* Qué incluye - Expandido */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-12">
            ¿Qué incluye exactamente tu asesoría?
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Antes de la sesión */}
              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-military-olive text-white rounded-full text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-military-olive mb-4">Antes de la sesión</h3>
                <ul className="text-left space-y-2 text-military-gray">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Cuestionario previo personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Asignación del experto adecuado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Preparación de tu caso específico</span>
                  </li>
                </ul>
              </div>

              {/* Durante la sesión */}
              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-military-olive text-white rounded-full text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-military-olive mb-4">Durante la sesión (1h)</h3>
                <ul className="text-left space-y-2 text-military-gray">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Videollamada individual privada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Análisis de todos los destinos viables</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Respuestas a TODAS tus dudas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Información real sin filtros</span>
                  </li>
                </ul>
              </div>

              {/* Después de la sesión */}
              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-military-olive text-white rounded-full text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-military-olive mb-4">Después de la sesión</h3>
                <ul className="text-left space-y-2 text-military-gray">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Informe personalizado (48-72h)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Ranking de destinos según tu perfil</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Plan de acción personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                    <span>Seguimiento gratuito 1 mes por email</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Detalles adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card flex items-start space-x-4">
                <Clock className="h-8 w-8 text-military-olive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-military-olive mb-2">
                    Duración: 1 hora completa
                  </h3>
                  <p className="text-military-gray">
                    60 minutos de atención exclusiva. No tenemos prisa. Resolvemos TODAS tus dudas,
                    las que sabías que tenías y las que descubras durante la sesión.
                  </p>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <Video className="h-8 w-8 text-military-olive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-military-olive mb-2">
                    100% Online
                  </h3>
                  <p className="text-military-gray">
                    Desde tu casa, donde estés. Google Meet, Zoom, Skype... tú eliges la plataforma.
                    Flexible con tu horario (mañanas, tardes, incluso fines de semana).
                  </p>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <Euro className="h-8 w-8 text-military-olive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-military-olive mb-2">
                    75€ - Pago único
                  </h3>
                  <p className="text-military-gray">
                    Sin suscripciones, sin costes ocultos, sin letra pequeña. 75€ por transferencia
                    o Bizum. Incluye TODO: sesión + informe + seguimiento.
                  </p>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <FileCheck className="h-8 w-8 text-military-olive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-military-olive mb-2">
                    Informe personalizado incluido
                  </h3>
                  <p className="text-military-gray">
                    Documento de 3-5 páginas con resumen de todo, recomendaciones específicas para TI,
                    ranking de destinos y próximos pasos. Para que no olvides nada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className="bg-military-cream py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-12">
            ¿Para quién es esta asesoría?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="card">
              <Target className="h-10 w-10 text-military-olive mb-4" />
              <h3 className="font-bold text-lg text-military-olive mb-2">Aspirantes</h3>
              <p className="text-military-gray text-sm">
                Estás preparando las pruebas y quieres saber qué destino pedir cuando apruebes.
                Te ayudamos a elegir ANTES de meter la pata.
              </p>
            </div>

            <div className="card">
              <Users className="h-10 w-10 text-military-olive mb-4" />
              <h3 className="font-bold text-lg text-military-olive mb-2">Recién aprobados</h3>
              <p className="text-military-gray text-sm">
                Has aprobado y tienes que elegir destino YA. No tienes tiempo de investigar. Necesitas
                ayuda urgente de quien sabe.
              </p>
            </div>

            <div className="card">
              <Brain className="h-10 w-10 text-military-olive mb-4" />
              <h3 className="font-bold text-lg text-military-olive mb-2">Indecisos</h3>
              <p className="text-military-gray text-sm">
                Tienes varias opciones pero no sabes cuál elegir. Necesitas que alguien te ayude a
                ver las cosas claras.
              </p>
            </div>

            <div className="card">
              <Shield className="h-10 w-10 text-military-olive mb-4" />
              <h3 className="font-bold text-lg text-military-olive mb-2">Con familia</h3>
              <p className="text-military-gray text-sm">
                Tienes pareja/hijos y la conciliación familiar es crítica. Te ayudamos a elegir
                destinos compatibles con tu vida personal.
              </p>
            </div>

            <div className="card">
              <TrendingUp className="h-10 w-10 text-military-olive mb-4" />
              <h3 className="font-bold text-lg text-military-olive mb-2">Ambiciosos</h3>
              <p className="text-military-gray text-sm">
                Quieres hacer carrera militar a largo plazo. Te asesoramos sobre qué destinos dan
                más oportunidades de ascenso y especialización.
              </p>
            </div>

            <div className="card">
              <Star className="h-10 w-10 text-military-olive mb-4" />
              <h3 className="font-bold text-lg text-military-olive mb-2">Ya dentro del ejército</h3>
              <p className="text-military-gray text-sm">
                Vas a renovar o cambiar de especialidad. Te orientamos sobre opciones viables y
                cómo conseguirlas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temas que cubrimos */}
      <section className="section-container">
        <h2 className="heading-2 text-center mb-12">
          Temas que cubrimos en profundidad
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="card">
              <h3 className="text-xl font-bold text-military-olive mb-4">Sobre destinos</h3>
              <ul className="space-y-2 text-military-gray">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Características reales de cada destino</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Exigencia física y mental real</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Ubicación y coste de vida</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Ambiente y cultura de cada unidad</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Pros y contras sin filtros</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-military-olive mb-4">Sobre especialidades</h3>
              <ul className="space-y-2 text-military-gray">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Especialidades disponibles según destino</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Requisitos y proceso de acceso</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Salidas profesionales civiles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Cursos y formación disponible</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Oportunidades de ascenso</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-military-olive mb-4">Sobre la vida militar</h3>
              <ul className="space-y-2 text-military-gray">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Día a día real en cada destino</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Horarios, guardias, disponibilidad</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Conciliación familiar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Salario y complementos reales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Posibilidades de misiones internacionales</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-military-olive mb-4">Sobre tu situación</h3>
              <ul className="space-y-2 text-military-gray">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Análisis de tu perfil físico</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Tus objetivos profesionales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Tu situación familiar/personal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Tus preferencias de ubicación</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5 mr-2" />
                  <span>Plan de acción personalizado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Expandido */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-12">
            Preguntas Frecuentes
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ mejoradas */}
            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Quién me asesorará exactamente?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Militares profesionales con experiencia REAL en diferentes destinos del Ejército Español.
                Según tu situación (aspirante a Infantería, interesado en Transmisiones, etc.), te
                asignamos al experto más adecuado. Gente que ha VIVIDO lo que tú vas a vivir.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Por qué debería pagar si puedo buscar info gratis en internet?
              </h3>
              <p className="text-military-gray leading-relaxed mb-2">
                Claro que puedes buscar gratis. Y pasarás semanas leyendo foros con información contradictoria,
                mitos desactualizados y opiniones sesgadas. Luego elegirás basándote en eso.
              </p>
              <p className="text-military-gray leading-relaxed font-semibold">
                O puedes hablar 1 hora con quien VIVE esa realidad cada día y elegir con criterio. 75€ vs
                años de tu vida en el lugar equivocado. ¿Qué vale más?
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Realmente no puedo cambiar de destino después?
              </h3>
              <p className="text-military-gray leading-relaxed">
                <strong>Correcto.</strong> Una vez asignado el destino, estás comprometido durante todo tu
                contrato (normalmente 2-6 años). Los cambios existen pero son excepcionales, requieren
                justificación muy seria y NO están garantizados. La única forma segura de cambiar es salir
                del ejército y volver a entrar... perdiendo toda tu antigüedad. Por eso elegir bien es CRÍTICO.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Cómo funciona el pago?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Una vez reserves (formulario abajo), te enviamos email con: fecha/hora de la sesión +
                datos para pago (transferencia o Bizum). Pagas los 75€, nos confirmas, y listo. La sesión
                se realiza en la fecha acordada. Simple y transparente.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Y si no me sirve la asesoría?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Hasta ahora, el 98% de nuestros clientes están satisfechos. Pero si realmente sientes que
                no te ha aportado valor, háblanos y buscamos una solución. Nuestro objetivo es que tomes
                la mejor decisión, no cobrarte 75€ y olvidarnos.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Puedo reservar ahora y hacer la sesión dentro de unos meses?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Sí. Cuando reserves, coordinamos la fecha que te venga bien. Puede ser en una semana o
                en 3 meses. Tú decides. Lo importante es que cuando llegue el momento de elegir destino,
                tengas toda la información.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Qué pasa si tengo más dudas después de la asesoría?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Incluimos 1 mes de seguimiento gratuito por email. Si después de recibir el informe tienes
                dudas adicionales o necesitas aclarar algo, nos escribes y te respondemos. Sin coste extra.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿También asesoráis a militares que ya están dentro?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Sí. Muchos militares en activo nos consultan sobre cambios de especialidad, preparación
                para ascensos, o reorientación de carrera. La asesoría es útil en cualquier etapa de tu
                vida militar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de reserva */}
      <section className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-gradient-to-br from-military-olive/5 to-military-gray/5 border-2 border-military-olive">
            <div className="text-center mb-8">
              <MessageCircle className="h-16 w-16 text-military-olive mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-military-olive mb-2">
                Reserva tu Asesoría Ahora
              </h2>
              <p className="text-military-gray text-lg mb-2">
                Completa el formulario y te contactamos en menos de 24 horas
              </p>
              <div className="inline-block bg-yellow-400 text-military-dark px-6 py-2 rounded-lg font-bold text-xl mt-2">
                75€ - Pago único
              </div>
            </div>

            {/* PERSONALIZABLE: Formulario (actualmente placeholder) */}
            <AsesoriasForm />
          </div>
        </div>
      </section>

      {/* CTA alternativo */}
      <section className="bg-military-cream py-12">
        <div className="section-container text-center">
          <p className="text-lg text-military-gray mb-4">
            ¿Prefieres contactar directamente antes de reservar?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@orientacionmilitar.com"
              className="btn-secondary"
            >
              📧 Enviar Email
            </a>
            <a
              href="https://wa.me/34600000000?text=Hola,%20quiero%20información%20sobre%20las%20asesorías"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              💬 WhatsApp
            </a>
          </div>
          <p className="text-sm text-military-gray mt-4">
            Respondemos todas las consultas en menos de 24 horas
          </p>
        </div>
      </section>

      {/* CTA Final fuerte */}
      <section className="bg-military-olive text-white py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            75€ hoy pueden ahorrarte años de arrepentimiento
          </h2>
          <p className="text-xl text-military-cream/90 mb-8 max-w-3xl mx-auto">
            No dejes la decisión más importante de tu carrera militar al azar.
            Infórmate bien, elige bien, vive bien.
          </p>
          <Link href="#reserva" className="inline-block bg-yellow-400 text-military-dark px-10 py-5 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors shadow-xl">
            Reservar Asesoría Ahora
          </Link>
        </div>
      </section>
    </>
  )
}

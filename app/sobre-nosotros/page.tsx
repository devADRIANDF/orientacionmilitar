import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Target, Heart, Award, Users, CheckCircle2, TrendingUp, Briefcase } from 'lucide-react'

// SEO para Sobre Nosotros
export const metadata: Metadata = {
  title: 'Sobre Nosotros | Orientación Militar',
  description: 'Conoce a nuestro equipo de expertos militares con más de 40 años de experiencia combinada en el Ejército Español. Profesionales que te ayudan a elegir tu camino.',
  openGraph: {
    title: 'Sobre Nosotros | Orientación Militar',
    description: 'Equipo de expertos militares con experiencia real en diferentes cuerpos y especialidades',
  },
}

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-military-olive to-military-gray text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-military-cream/90 max-w-2xl mx-auto">
            Expertos militares comprometidos con tu futuro profesional
          </p>
        </div>
      </section>

      {/* Quiénes somos - Expandido */}
      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          {/* PERSONALIZABLE: Texto de presentación */}
          <div className="prose prose-lg max-w-none text-military-gray mb-12">
            <h2 className="text-3xl font-bold text-military-olive mb-6">¿Quiénes somos?</h2>

            <p className="text-xl leading-relaxed mb-6">
              <strong className="text-military-olive">OrientaciónMilitar.com</strong> nace de la experiencia
              de profesionales que han vivido el proceso de selección, la formación y la vida militar desde dentro.
              Somos un equipo de militares profesionales con <strong>más de 40 años de experiencia combinada</strong> en
              diferentes cuerpos, especialidades y rangos del Ejército Español.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Durante años, hemos visto cómo muchos aspirantes toman decisiones sobre su futuro militar
              sin contar con información real y práctica. Elegir un destino, una especialidad o un camino
              dentro del ejército es una decisión que marca toda una carrera profesional, y merece ser
              tomada con conocimiento de causa.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Nos juntamos con un único objetivo: <strong>evitar que cometas los errores que vimos (y algunos
              cometimos) al inicio de nuestras carreras.</strong> Queremos que cada persona que se plantea
              una carrera militar tenga acceso a información real, sin filtros y sin marketing.
            </p>

            <div className="bg-military-olive text-white rounded-lg p-8 my-8">
              <h3 className="text-2xl font-bold mb-4">¿Por qué creamos este servicio?</h3>
              <p className="text-lg text-military-cream/90 leading-relaxed mb-4">
                Porque <strong>una vez que eliges tu destino, no puedes cambiarlo</strong> hasta que finalice
                tu contrato. Y hemos visto demasiadas veces cómo personas con potencial increíble se frustran
                porque eligieron el destino equivocado basándose en mitos, rumores o información desactualizada.
              </p>
              <p className="text-lg text-military-cream/90 leading-relaxed">
                Por solo 75€, podemos ahorrarte años de insatisfacción y arrepentimiento. Es una inversión
                ridículamente pequeña comparada con el coste real de un error: 2-6 años de tu vida en el lugar
                equivocado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro equipo - Detallado */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-4">
            Nuestro equipo de expertos
          </h2>
          <p className="text-xl text-center text-military-gray mb-12 max-w-3xl mx-auto">
            Militares profesionales en activo o recién retirados con experiencia real
            en los principales cuerpos y especialidades del Ejército Español
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Experto 1 - PERSONALIZABLE */}
            <div className="card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-military-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-8 w-8 text-military-olive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-military-olive mb-1">Infantería y Fuerzas Especiales</h3>
                  <p className="text-sm text-military-gray font-medium">12 años de experiencia</p>
                </div>
              </div>
              <div className="space-y-3 text-military-gray">
                <p className="leading-relaxed">
                  Experiencia en múltiples unidades de élite: Legión Española, Brigada Paracaidista y MOE
                  (Mando de Operaciones Especiales). Ha participado en misiones internacionales y conoce
                  en profundidad la realidad del combate y las operaciones especiales.
                </p>
                <div className="border-l-4 border-military-olive pl-4">
                  <p className="text-sm font-semibold text-military-olive mb-1">Especialista en:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Selección para Fuerzas Especiales</li>
                    <li>• Preparación física de alto rendimiento</li>
                    <li>• Realidad de destinos de combate</li>
                    <li>• Misiones internacionales</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experto 2 - PERSONALIZABLE */}
            <div className="card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-military-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-8 w-8 text-military-olive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-military-olive mb-1">Logística y Apoyo</h3>
                  <p className="text-sm text-military-gray font-medium">10 años de experiencia</p>
                </div>
              </div>
              <div className="space-y-3 text-military-gray">
                <p className="leading-relaxed">
                  Especialista en logística militar y apoyo operacional. Conocimiento profundo del sistema
                  administrativo militar, procesos internos y especialidades técnicas menos conocidas pero
                  igualmente importantes.
                </p>
                <div className="border-l-4 border-military-olive pl-4">
                  <p className="text-sm font-semibold text-military-olive mb-1">Especialista en:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Especialidades logísticas</li>
                    <li>• Conciliación familiar y vida personal</li>
                    <li>• Sistema administrativo militar</li>
                    <li>• Destinos con menor exigencia física</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experto 3 - PERSONALIZABLE */}
            <div className="card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-military-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-8 w-8 text-military-olive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-military-olive mb-1">Suboficiales y Oficiales</h3>
                  <p className="text-sm text-military-gray font-medium">15 años de experiencia</p>
                </div>
              </div>
              <div className="space-y-3 text-military-gray">
                <p className="leading-relaxed">
                  Experiencia en escalas de mando, desde Tropa hasta Suboficial. Conoce los procesos de
                  ascenso, oposiciones internas, y cómo desarrollar una carrera militar a largo plazo.
                  Ha formado a decenas de militares en su progresión profesional.
                </p>
                <div className="border-l-4 border-military-olive pl-4">
                  <p className="text-sm font-semibold text-military-olive mb-1">Especialista en:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Procesos de ascenso y promoción</li>
                    <li>• Oposiciones para Suboficial/Oficial</li>
                    <li>• Desarrollo de carrera a largo plazo</li>
                    <li>• Liderazgo y mando de unidades</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experto 4 - PERSONALIZABLE */}
            <div className="card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-military-olive/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-military-olive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-military-olive mb-1">Transmisiones y Especialidades Técnicas</h3>
                  <p className="text-sm text-military-gray font-medium">8 años de experiencia</p>
                </div>
              </div>
              <div className="space-y-3 text-military-gray">
                <p className="leading-relaxed">
                  Experto en especialidades técnicas y tecnológicas: CIS (Comunicaciones e Informática),
                  ciberseguridad militar, sistemas de comunicaciones tácticas. Conoce las oportunidades
                  en el ámbito tecnológico dentro del ejército.
                </p>
                <div className="border-l-4 border-military-olive pl-4">
                  <p className="text-sm font-semibold text-military-olive mb-1">Especialista en:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Especialidades técnicas (CIS, Informática)</li>
                    <li>• Transmisiones y comunicaciones</li>
                    <li>• Perfiles tecnológicos en el ejército</li>
                    <li>• Certificaciones y formación técnica</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-military-cream rounded-lg p-8 max-w-3xl mx-auto">
            <Users className="h-12 w-12 text-military-olive mx-auto mb-4" />
            <p className="text-lg text-military-gray mb-2">
              <strong className="text-military-olive">Entre todos sumamos más de 40 años de experiencia</strong> en
              diferentes cuerpos, destinos, especialidades y rangos.
            </p>
            <p className="text-military-gray">
              Según tu situación y necesidades, te asignamos al experto más adecuado para tu asesoría.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-container">
        <h2 className="heading-2 text-center mb-12">Nuestros valores</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* PERSONALIZABLE: Valores de la empresa */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                <Shield className="h-8 w-8 text-military-olive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-military-olive mb-2">
                  Experiencia Real
                </h3>
                <p className="text-military-gray leading-relaxed">
                  Todo lo que te contamos está basado en experiencia de primera mano.
                  No hablamos de teoría, hablamos de lo que hemos vivido. Conocemos la realidad
                  porque la hemos experimentado en nuestras propias carnes.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                <Heart className="h-8 w-8 text-military-olive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-military-olive mb-2">
                  Honestidad Total
                </h3>
                <p className="text-military-gray leading-relaxed">
                  Te contamos la realidad sin filtros. Lo bueno, lo malo, lo duro y lo gratificante.
                  No endulzamos nada ni vendemos fantasías. Mereces conocer la verdad antes de
                  comprometerte con una decisión que durará años.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                <Target className="h-8 w-8 text-military-olive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-military-olive mb-2">
                  Personalización
                </h3>
                <p className="text-military-gray leading-relaxed">
                  No hay dos militares iguales. Adaptamos cada asesoría a tu perfil específico:
                  tu edad, condición física, objetivos personales, situación familiar, preferencias
                  y limitaciones. Tu asesoría es única, como tú.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-military-olive/10 rounded-lg">
                <Award className="h-8 w-8 text-military-olive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-military-olive mb-2">
                  Compromiso con tu éxito
                </h3>
                <p className="text-military-gray leading-relaxed">
                  Nuestro objetivo no es venderte una asesoría. Es que tomes la mejor decisión
                  posible para TU situación. Si eso significa decirte que la vida militar no es
                  para ti, te lo diremos. Tu éxito es nuestro éxito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión */}
      <section className="bg-white py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* PERSONALIZABLE: Misión de la empresa */}
            <h2 className="heading-2 text-center mb-6">Nuestra Misión</h2>

            <div className="prose prose-lg max-w-none text-military-gray mb-8">
              <p className="text-xl leading-relaxed text-center mb-8">
                Ayudar a cada aspirante a militar a tomar decisiones informadas sobre su carrera,
                proporcionándoles orientación profesional basada en experiencia real dentro del
                Ejército Español.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-military-olive mb-2">+200</div>
                <p className="text-military-gray">Militares asesorados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-military-olive mb-2">40+</div>
                <p className="text-military-gray">Años de experiencia combinada</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-military-olive mb-2">98%</div>
                <p className="text-military-gray">Satisfacción de clientes</p>
              </div>
            </div>

            <div className="mt-12 bg-military-cream rounded-lg p-8">
              <h3 className="text-2xl font-bold text-military-olive mb-4 text-center">
                ¿Qué nos diferencia?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0 mt-1" />
                  <p className="text-military-gray">
                    <strong>Experiencia verificable:</strong> No somos consultores de escritorio.
                    Hemos servido en los destinos sobre los que te asesoramos.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0 mt-1" />
                  <p className="text-military-gray">
                    <strong>Actualización constante:</strong> Mantenemos contacto con compañeros
                    en activo para tener información siempre actualizada.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0 mt-1" />
                  <p className="text-military-gray">
                    <strong>Seguimiento post-asesoría:</strong> No desaparecemos después de la sesión.
                    Puedes consultarnos dudas adicionales durante 1 mes.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0 mt-1" />
                  <p className="text-military-gray">
                    <strong>Informe detallado:</strong> Recibes un documento personalizado con
                    todo lo tratado para que no olvides ningún detalle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué nos crearon */}
      <section className="bg-military-olive text-white py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              ¿Por qué necesitas esta asesoría?
            </h2>

            <div className="space-y-6 text-lg text-military-cream/90">
              <p className="leading-relaxed">
                Porque <strong className="text-white">una decisión equivocada te costará años de tu vida.</strong>
              </p>

              <p className="leading-relaxed">
                Una vez que firmas tu destino y especialidad, estás comprometido durante todo el contrato.
                Si te equivocas, no hay marcha atrás fácil. Tendrás que cumplir tu compromiso o salir del
                cuerpo y volver a entrar perdiendo todo.
              </p>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold mb-4">Ejemplos reales que hemos visto:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Persona que eligió Legión sin saber la dureza real, tuvo que cumplir 3 años
                    odiando cada día.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Aspirante que eligió un destino lejano sin considerar su familia, acabó
                    saliendo del ejército después de 2 años.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Militar que no sabía que existían especialidades técnicas que encajaban
                    perfectamente con su perfil.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>Persona que entró con expectativas irreales y se frustró al ver la
                    realidad del día a día.</span>
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed text-xl font-semibold text-center">
                Por solo 75€, evita ser uno de estos casos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <div className="bg-military-cream rounded-lg p-12 text-center">
          <h3 className="text-3xl font-bold text-military-olive mb-4">
            ¿Listo para tomar la decisión correcta?
          </h3>
          <p className="text-xl text-military-gray mb-8 max-w-2xl mx-auto">
            Reserva tu asesoría con nuestro equipo y descubre qué camino militar
            se adapta mejor a tu perfil, objetivos y circunstancias personales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservar" className="btn-primary text-lg px-8 py-4">
              Reservar Asesoría (75€)
            </Link>
            <Link href="/contacto" className="btn-secondary text-lg px-8 py-4">
              Hacer una consulta
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

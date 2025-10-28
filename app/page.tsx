import Link from 'next/link'
import { Shield, Target, Users, FileText, CheckCircle2, ArrowRight, AlertTriangle, Clock, TrendingUp, Award, BookOpen, Compass, Brain } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Hero Section - Mejorado */}
      <section className="bg-gradient-to-br from-military-cream to-military-light py-20 md:py-32">
        <div className="section-container">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-military-olive/10 rounded-full mb-6">
              <Shield className="h-12 w-12 text-military-olive" />
            </div>

            {/* PERSONALIZABLE: Título principal del hero */}
            <h1 className="heading-1 mb-6">
              Tu guía personalizada para elegir tu futuro militar
            </h1>

            {/* PERSONALIZABLE: Subtítulo del hero */}
            <p className="text-xl md:text-2xl text-military-gray mb-4 leading-relaxed">
              Te ayudamos a entender cada destino, especialidad y oportunidad
              dentro del Ejército Español
            </p>

            <p className="text-lg md:text-xl text-military-dark font-semibold mb-8 max-w-3xl mx-auto">
              Una decisión que no podrás cambiar sin salir del cuerpo.
              Por solo 75€ evita años perdidos en un destino equivocado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/reservar" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center">
                Reserva tu asesoría (75 €)
              </Link>
              <Link href="/sobre-nosotros" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center">
                Conoce al equipo
              </Link>
            </div>

            {/* Indicadores de confianza mejorados */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-military-gray bg-white/50 rounded-lg p-4">
                <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0" />
                <p className="text-sm font-medium">+200 militares asesorados</p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-military-gray bg-white/50 rounded-lg p-4">
                <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0" />
                <p className="text-sm font-medium">Expertos militares activos</p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-military-gray bg-white/50 rounded-lg p-4">
                <CheckCircle2 className="h-6 w-6 text-military-olive flex-shrink-0" />
                <p className="text-sm font-medium">Satisfacción garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Alerta - La importancia de la decisión */}
      <section className="bg-red-50 border-y-4 border-red-200 py-8 md:py-12">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-red-800 mb-4">
                  ⚠️ Una decisión que marcará años de tu vida
                </h2>
                <div className="space-y-3 text-base sm:text-lg text-red-900">
                  <p className="leading-relaxed">
                    <strong>¿Sabías que una vez eliges tu destino y especialidad, NO puedes cambiarlo hasta que finalice tu contrato?</strong>
                  </p>
                  <p className="leading-relaxed">
                    Si te equivocas, tendrás que cumplir todo el periodo comprometido (normalmente 2-6 años)
                    o salir del cuerpo completamente y volver a entrar desde cero.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>No hay cambios de destino inmediatos</strong> - Estarás donde elijas</li>
                    <li><strong>No puedes cambiar de especialidad</strong> sin finalizar contrato</li>
                    <li><strong>Salir y volver a entrar</strong> significa perder antigüedad y ventajas</li>
                    <li><strong>Años de tu vida</strong> en un lugar que tal vez no era para ti</li>
                  </ul>
                  <p className="font-bold text-lg sm:text-xl mt-6">
                    Por solo 75€, evita cometer un error que te costará años de tu carrera.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios - Expandida */}
      <section className="section-container">
        <h2 className="heading-2 text-center mb-4">
          ¿Por qué elegirnos?
        </h2>
        <p className="text-xl text-center text-military-gray mb-12 max-w-3xl mx-auto">
          Somos un equipo de militares profesionales con experiencia real en diferentes destinos,
          especialidades y rangos del Ejército Español
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Beneficio 1 - PERSONALIZABLE */}
          <div className="card hover-lift text-center">
            <div className="inline-flex items-center justify-center p-4 bg-military-olive/10 rounded-full mb-4">
              <Target className="h-10 w-10 text-military-olive" />
            </div>
            <h3 className="text-xl font-semibold text-military-olive mb-3">
              Evita errores críticos
            </h3>
            <p className="text-military-gray leading-relaxed">
              Conoce de primera mano las realidades de cada destino y especialidad.
              No te dejes llevar por mitos o información desactualizada. Toma decisiones
              basadas en experiencia real.
            </p>
          </div>

          {/* Beneficio 2 - PERSONALIZABLE */}
          <div className="card hover-lift text-center">
            <div className="inline-flex items-center justify-center p-4 bg-military-olive/10 rounded-full mb-4">
              <Users className="h-10 w-10 text-military-olive" />
            </div>
            <h3 className="text-xl font-semibold text-military-olive mb-3">
              Equipo multidisciplinar
            </h3>
            <p className="text-military-gray leading-relaxed">
              Militares de diferentes especialidades: Infantería, Fuerzas Especiales,
              Logística, Transmisiones, Sanidad. Experiencia en todos los ámbitos.
            </p>
          </div>

          {/* Beneficio 3 - PERSONALIZABLE */}
          <div className="card hover-lift text-center">
            <div className="inline-flex items-center justify-center p-4 bg-military-olive/10 rounded-full mb-4">
              <FileText className="h-10 w-10 text-military-olive" />
            </div>
            <h3 className="text-xl font-semibold text-military-olive mb-3">
              Información sin filtros
            </h3>
            <p className="text-military-gray leading-relaxed">
              Te contamos lo bueno y lo malo. Sin marketing, sin mentiras.
              Solo la verdad que necesitas conocer antes de comprometerte.
            </p>
          </div>

          {/* Beneficio 4 - NUEVO */}
          <div className="card hover-lift text-center">
            <div className="inline-flex items-center justify-center p-4 bg-military-olive/10 rounded-full mb-4">
              <Brain className="h-10 w-10 text-military-olive" />
            </div>
            <h3 className="text-xl font-semibold text-military-olive mb-3">
              Análisis personalizado
            </h3>
            <p className="text-military-gray leading-relaxed">
              Estudiamos tu perfil, objetivos y circunstancias personales.
              No hay dos militares iguales, tu asesoría será única.
            </p>
          </div>

          {/* Beneficio 5 - NUEVO */}
          <div className="card hover-lift text-center">
            <div className="inline-flex items-center justify-center p-4 bg-military-olive/10 rounded-full mb-4">
              <Clock className="h-10 w-10 text-military-olive" />
            </div>
            <h3 className="text-xl font-semibold text-military-olive mb-3">
              Ahorra años de tu vida
            </h3>
            <p className="text-military-gray leading-relaxed">
              75€ es una inversión ridícula comparada con pasar 2-6 años en un
              destino equivocado. Tu tiempo vale mucho más.
            </p>
          </div>

          {/* Beneficio 6 - NUEVO */}
          <div className="card hover-lift text-center">
            <div className="inline-flex items-center justify-center p-4 bg-military-olive/10 rounded-full mb-4">
              <TrendingUp className="h-10 w-10 text-military-olive" />
            </div>
            <h3 className="text-xl font-semibold text-military-olive mb-3">
              Planifica tu carrera
            </h3>
            <p className="text-military-gray leading-relaxed">
              No solo el primer destino. Te ayudamos a entender cómo progresar,
              qué cursos hacer y cómo alcanzar tus objetivos profesionales.
            </p>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: El equipo */}
      <section className="bg-military-olive text-white py-16">
        <div className="section-container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Nuestro equipo de expertos
          </h2>
          <p className="text-xl text-center text-military-cream/90 mb-12 max-w-3xl mx-auto">
            Militares profesionales en activo o retirados con experiencia real
            en diferentes cuerpos y especialidades
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Experto 1 - PERSONALIZABLE */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-military-cream/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg mb-2">Infantería y Fuerzas Especiales</h3>
              <p className="text-military-cream/80 text-sm">
                12 años de experiencia en diferentes unidades. Legión, Paracaidistas y MOE.
              </p>
            </div>

            {/* Experto 2 - PERSONALIZABLE */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-military-cream/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg mb-2">Logística y Apoyo</h3>
              <p className="text-military-cream/80 text-sm">
                10 años en logística militar. Conocimiento profundo del sistema administrativo.
              </p>
            </div>

            {/* Experto 3 - PERSONALIZABLE */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-military-cream/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg mb-2">Suboficiales y Oficiales</h3>
              <p className="text-military-cream/80 text-sm">
                Experiencia en escalas de mando. Procesos de ascenso y desarrollo profesional.
              </p>
            </div>

            {/* Experto 4 - PERSONALIZABLE */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-military-cream/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-lg mb-2">Transmisiones y Especialidades</h3>
              <p className="text-military-cream/80 text-sm">
                Experto en especialidades técnicas. CIS, informática militar y tecnología.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg mb-6">
              <strong>Cada asesoría</strong> es atendida por el experto más adecuado según tu situación
            </p>
            <Link href="/sobre-nosotros" className="inline-block bg-white text-military-olive px-8 py-3 rounded-lg font-semibold hover:bg-military-cream transition-colors">
              Conocer más sobre el equipo
            </Link>
          </div>
        </div>
      </section>

      {/* Proceso en 3 pasos - Expandido */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-4">
            Cómo funciona la asesoría
          </h2>
          <p className="text-xl text-center text-military-gray mb-12 max-w-3xl mx-auto">
            Un proceso simple pero completo para darte toda la información que necesitas
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {/* Paso 1 - PERSONALIZABLE */}
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-military-olive text-white rounded-full flex items-center justify-center font-bold text-2xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-military-olive mb-3">
                    Reserva y cuestionario inicial
                  </h3>
                  <p className="text-military-gray leading-relaxed mb-4">
                    Rellenas el formulario contándonos tu situación actual: ¿eres aspirante? ¿Ya estás dentro?
                    ¿Qué dudas tienes? ¿Qué destinos te interesan? Este cuestionario nos ayuda a preparar
                    la sesión y asignarte al experto más adecuado.
                  </p>
                  <ul className="list-disc pl-6 text-military-gray space-y-1">
                    <li>Te respondemos en menos de 24h</li>
                    <li>Coordinamos fecha y hora que te venga bien</li>
                    <li>Recibes enlace de videollamada (Google Meet, Zoom, etc.)</li>
                    <li>Pago mediante transferencia o Bizum</li>
                  </ul>
                </div>
              </div>

              {/* Paso 2 - PERSONALIZABLE */}
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-military-olive text-white rounded-full flex items-center justify-center font-bold text-2xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-military-olive mb-3">
                    Sesión personalizada de 1 hora
                  </h3>
                  <p className="text-military-gray leading-relaxed mb-4">
                    Videollamada individual donde resolvemos TODAS tus dudas. El experto asignado
                    te explicará con detalle cada opción disponible según tu perfil.
                  </p>
                  <div className="bg-military-light rounded-lg p-6">
                    <h4 className="font-semibold text-military-olive mb-3">Temas que cubrimos:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Destinos disponibles y características</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Especialidades según tu perfil</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Realidad del día a día en cada unidad</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Pros y contras de cada opción</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Conciliación familiar y personal</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Oportunidades de carrera y ascensos</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Preparación física y mental necesaria</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-military-olive flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Proceso de selección y oposiciones</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 3 - PERSONALIZABLE */}
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-military-olive text-white rounded-full flex items-center justify-center font-bold text-2xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-military-olive mb-3">
                    Informe personalizado post-sesión
                  </h3>
                  <p className="text-military-gray leading-relaxed mb-4">
                    A las 48-72h de la sesión, recibes un documento detallado con:
                  </p>
                  <ul className="list-disc pl-6 text-military-gray space-y-2">
                    <li><strong>Resumen de todo lo tratado</strong> - Para que no olvides ningún detalle</li>
                    <li><strong>Recomendaciones específicas</strong> - Según tu perfil y objetivos</li>
                    <li><strong>Ranking de destinos</strong> - Ordenados según tu situación personal</li>
                    <li><strong>Próximos pasos</strong> - Qué hacer a continuación</li>
                    <li><strong>Recursos adicionales</strong> - Enlaces, documentos, contactos útiles</li>
                  </ul>
                  <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-green-800">
                      <strong>Plus:</strong> Seguimiento por email gratuito durante 1 mes si surgen dudas adicionales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/reservar" className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4">
              <span>Quiero mi asesoría personalizada</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Qué te ahorras */}
      <section className="bg-military-cream py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-12">
            ¿Qué te ahorras con esta asesoría?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Ahorro 1 */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">❌</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-military-olive mb-2">
                    Sin asesoría
                  </h3>
                  <ul className="space-y-2 text-military-gray">
                    <li>• Información dispersa y contradictoria</li>
                    <li>• Decisión basada en mitos y rumores</li>
                    <li>• 2-6 años en un destino equivocado</li>
                    <li>• Insatisfacción laboral crónica</li>
                    <li>• Salir del cuerpo y perder antigüedad</li>
                    <li>• Arrepentimiento y frustración</li>
                  </ul>
                  <p className="mt-4 font-bold text-red-600 text-base sm:text-lg">
                    Coste real: Miles de € y años de tu vida
                  </p>
                </div>
              </div>
            </div>

            {/* Ahorro 2 */}
            <div className="bg-military-olive text-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    Con nuestra asesoría
                  </h3>
                  <ul className="space-y-2 text-military-cream/90">
                    <li>• Información real y verificada</li>
                    <li>• Decisión informada y consciente</li>
                    <li>• Elegir el destino correcto desde el inicio</li>
                    <li>• Satisfacción profesional</li>
                    <li>• Carrera militar exitosa</li>
                    <li>• Tranquilidad y confianza</li>
                  </ul>
                  <p className="mt-4 font-bold text-yellow-300 text-lg sm:text-xl">
                    Inversión: Solo 75€
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl font-bold text-military-olive mb-4">
              75€ hoy = Ahorrarte años de arrepentimiento
            </p>
            <p className="text-base sm:text-lg text-military-gray">
              Es menos de lo que cuesta una cena para dos, pero puede cambiar el rumbo
              de tu carrera militar y, por ende, de tu vida.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonios - Corregidos para aspirantes */}
      <section className="section-container">
        <h2 className="heading-2 text-center mb-4">
          Lo que dicen quienes ya tomaron su decisión con nosotros
        </h2>
        <p className="text-xl text-center text-military-gray mb-12 max-w-3xl mx-auto">
          Aspirantes y recién incorporados que acertaron en su elección gracias a la asesoría
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonio 1 - PERSONALIZABLE */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-military-olive/10 rounded-full flex items-center justify-center font-bold text-military-olive text-lg">
                JM
              </div>
              <div className="ml-3">
                <p className="font-semibold text-military-dark">Javier M.</p>
                <p className="text-sm text-military-gray">Aspirante, 22 años</p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-military-gray italic leading-relaxed">
              "Estaba perdidísimo entre tantas opciones. La asesoría me aclaró TODO. Ahora sé exactamente
              qué destino pedir y por qué. Los 75€ mejor invertidos, sin duda."
            </p>
          </div>

          {/* Testimonio 2 - PERSONALIZABLE */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-military-olive/10 rounded-full flex items-center justify-center font-bold text-military-olive text-lg">
                AR
              </div>
              <div className="ml-3">
                <p className="font-semibold text-military-dark">Ana R.</p>
                <p className="text-sm text-military-gray">Recién incorporada, Tropa</p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-military-gray italic leading-relaxed">
              "Me explicaron especialidades que ni sabía que existían. Elegí con conocimiento de causa
              y ahora estoy donde quería estar. La información real vale oro."
            </p>
          </div>

          {/* Testimonio 3 - PERSONALIZABLE */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-military-olive/10 rounded-full flex items-center justify-center font-bold text-military-olive text-lg">
                CL
              </div>
              <div className="ml-3">
                <p className="font-semibold text-military-dark">Carlos L.</p>
                <p className="text-sm text-military-gray">Opositor preparando pruebas</p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-military-gray italic leading-relaxed">
              "Iba a meter la pata eligiendo por lo que había leído en foros. La asesoría me dio
              la perspectiva real. Ahora voy con claridad total a la selección."
            </p>
          </div>

          {/* Testimonio 4 - NUEVO */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-military-olive/10 rounded-full flex items-center justify-center font-bold text-military-olive text-lg">
                MG
              </div>
              <div className="ml-3">
                <p className="font-semibold text-military-dark">María G.</p>
                <p className="text-sm text-military-gray">Aspirante, 20 años</p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-military-gray italic leading-relaxed">
              "Tenía mil dudas sobre conciliación familiar. Me respondieron todo sin rodeos.
              Sé qué esperar y he elegido el destino perfecto para mi situación."
            </p>
          </div>

          {/* Testimonio 5 - NUEVO */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-military-olive/10 rounded-full flex items-center justify-center font-bold text-military-olive text-lg">
                DP
              </div>
              <div className="ml-3">
                <p className="font-semibold text-military-dark">David P.</p>
                <p className="text-sm text-military-gray">Aspirante preparando físicas</p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-military-gray italic leading-relaxed">
              "Quería Fuerzas Especiales pero no sabía si estaba preparado. Me dieron un plan realista
              y ahora sé exactamente qué necesito. Súper útil."
            </p>
          </div>

          {/* Testimonio 6 - NUEVO */}
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-military-olive/10 rounded-full flex items-center justify-center font-bold text-military-olive text-lg">
                LF
              </div>
              <div className="ml-3">
                <p className="font-semibold text-military-dark">Luis F.</p>
                <p className="text-sm text-military-gray">Recién incorporado</p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <p className="text-military-gray italic leading-relaxed">
              "Acabo de entrar y elegí bien gracias a la asesoría. Estoy viendo exactamente lo que
              me dijeron. Cero sorpresas, cero decepciones. Totalmente recomendable."
            </p>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: FAQ Rápidas */}
      <section className="bg-white py-16">
        <div className="section-container">
          <h2 className="heading-2 text-center mb-12">
            Preguntas frecuentes
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Por qué debería pagar por información que puedo buscar gratis?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Puedes buscar durante semanas en foros y conseguir información contradictoria y desactualizada.
                O puedes hablar 1 hora con quien vive esa realidad cada día. Nosotros te ahorramos tiempo,
                confusión y errores. 75€ vs años de tu vida en el lugar equivocado. Tú decides.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Realmente no puedo cambiar de destino una vez elegido?
              </h3>
              <p className="text-military-gray leading-relaxed">
                <strong>Correcto.</strong> Una vez firmado tu destino y especialidad, estás comprometido durante todo el
                contrato (normalmente 2-6 años). Los cambios de destino existen pero son excepcionales y no están
                garantizados. La única manera segura de cambiar es finalizar el contrato, salir del cuerpo y volver
                a entrar perdiendo antigüedad.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Quién me asesorará exactamente?
              </h3>
              <p className="text-military-gray leading-relaxed">
                Según tu situación y dudas, te asignamos al experto más adecuado de nuestro equipo.
                Tenemos militares con experiencia en Infantería, Fuerzas Especiales, Logística, Transmisiones,
                diferentes rangos y destinos. Todos en activo o recién retirados.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-military-olive mb-2">
                ¿Y si ya estoy dentro del ejército?
              </h3>
              <p className="text-military-gray leading-relaxed">
                ¡Perfecto! Muchos militares en activo nos consultan sobre cambios de especialidad al renovar,
                preparación para ascensos, o reorientación de carrera. La asesoría es útil en cualquier etapa.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/asesorias" className="text-military-olive hover:text-military-gray font-semibold">
              Ver todas las preguntas frecuentes →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final - Mejorado */}
      <section className="bg-military-olive text-white py-16 md:py-20">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            No dejes tu futuro al azar
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-military-cream/90 mb-4 max-w-3xl mx-auto">
            Una hora de tu tiempo hoy puede ahorrarte años de arrepentimiento mañana
          </p>
          <p className="text-base sm:text-lg text-military-cream/80 mb-8 max-w-2xl mx-auto">
            Reserva tu asesoría personalizada y toma la decisión más importante
            de tu carrera militar con información real y verificada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/reservar" className="inline-block bg-white text-military-olive px-6 sm:px-10 py-4 sm:py-5 rounded-lg font-bold text-lg sm:text-xl hover:bg-military-cream transition-colors shadow-xl w-full sm:w-auto">
              Reservar Asesoría - 75€
            </Link>
            <Link href="/contacto" className="inline-block border-2 border-white text-white px-6 sm:px-10 py-4 sm:py-5 rounded-lg font-bold text-lg sm:text-xl hover:bg-white/10 transition-colors w-full sm:w-auto">
              Hacer una consulta
            </Link>
          </div>
          <p className="mt-8 text-military-cream/70 text-xs sm:text-sm">
            📞 Respondemos en menos de 24 horas | 💯 Satisfacción garantizada
          </p>
        </div>
      </section>
    </>
  )
}

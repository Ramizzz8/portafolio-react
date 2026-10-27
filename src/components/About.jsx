import { motion, useInView, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useRef } from 'react'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useParallax } from '../hooks/useParallax'
import BgWord from './BgWord'
import { featuredProjects, otherProjects } from '../data/projects'
import { tecnologias } from '../data/tecnologias'

// Three.js pesa: la escena se descarga aparte y solo al acercarse a la sección
const Escritorio3D = lazy(() => import('./Escritorio3D'))

// Se cuentan a partir de los datos para que nunca contradigan al resto de la página
const totalProyectos = featuredProjects.length + otherProjects.length
const totalTecnologias = tecnologias.length

// Entrada escalonada de cada bloque al llegar a la sección
const aparecer = (retraso = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay: retraso },
})

export default function About() {
  const { t } = useLang()
  // Parallax: el fondo y los brillos se mueven a distinta velocidad
  const sectionRef = useRef(null)
  const glowRedY = useParallax(sectionRef, 120)
  const glowBlueY = useParallax(sectionRef, -80)
  const bgY = useParallax(sectionRef, 60)
  const { theme, toggleTheme } = useTheme()
  const reducirMovimiento = useReducedMotion()
  const escenaRef = useRef(null)
  const cerca = useInView(escenaRef, { once: true, margin: '400px' })
  const enPantalla = useInView(escenaRef)

  return (
    <section ref={sectionRef} id="sobre-mi" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-1/2 z-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.img src={img('images/about.webp')} alt="" style={{ y: bgY }} className="fondo-sobre-mi w-full h-full object-cover opacity-10 scale-125" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-main)] via-[var(--bg-main)]/60 to-transparent" />
      </div>
      <motion.div style={{ y: glowRedY }} className="absolute top-0 right-0 w-96 h-96 bg-[#e63946] rounded-full opacity-[0.03] blur-3xl pointer-events-none" />
      <motion.div style={{ y: glowBlueY }} className="absolute bottom-0 left-0 w-64 h-64 bg-[#3a86ff] rounded-full opacity-[0.04] blur-3xl pointer-events-none" />

      <BgWord word={t.about.bg_word} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 {...aparecer()} className="font-bebas text-5xl text-center mb-16 tracking-wide">
          {t.about.title} <span className="text-[#e63946]">{t.about.highlight}</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-start">
          {/* Escena 3D y contadores */}
          <motion.div {...aparecer(0.1)} className="flex flex-col gap-8 max-w-md w-full mx-auto lg:mx-0">
            <div>
              <div ref={escenaRef} className="relative aspect-square">
                {cerca && (
                  <Suspense fallback={null}>
                    <Escritorio3D
                      tema={theme}
                      onToggleTheme={toggleTheme}
                      activa={enPantalla}
                      quieto={reducirMovimiento}
                      textos={t.about.escena}
                    />
                  </Suspense>
                )}
              </div>
              <p className="text-white/50 text-sm mt-3 text-center">{t.about.escena.pista}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>
                <span className="font-bebas text-5xl text-[#e63946] block leading-none">{totalProyectos}</span>
                <span className="text-white/60 text-sm">{t.about.proyectos}</span>
              </p>
              <p>
                <span className="font-bebas text-5xl text-[#e63946] block leading-none">{totalTecnologias}</span>
                <span className="text-white/60 text-sm">{t.about.tecnologias}</span>
              </p>
            </div>
          </motion.div>

          {/* Historia, datos y trayectoria */}
          <div className="flex flex-col gap-12">
            <motion.div {...aparecer(0.2)} className="flex flex-col gap-5 text-lg leading-relaxed">
              {t.about.historia.map((parrafo, i) => (
                <p key={i} className={i === 0 ? 'text-white' : 'text-white/75'}>
                  {parrafo}
                </p>
              ))}
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-10">
              <motion.div {...aparecer(0.3)}>
                <h3 className="font-bebas text-3xl tracking-wide mb-5">{t.about.datos_titulo}</h3>
                <dl className="flex flex-col gap-4">
                  {t.about.datos.map(([clave, valor]) => (
                    <div key={clave}>
                      <dt className="text-white/50 text-sm">{clave}</dt>
                      <dd className="text-white text-base">{valor}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              <motion.div {...aparecer(0.4)}>
                <h3 className="font-bebas text-3xl tracking-wide mb-5">{t.about.trayectoria_titulo}</h3>
                <ol className="flex flex-col gap-5 border-l-2 border-white/10 pl-6">
                  {t.about.trayectoria.map(([titulo, texto], i, lista) => (
                    <li key={titulo} className="relative">
                      <span
                        className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full ${i === lista.length - 1 ? 'bg-[#e63946]' : 'bg-white/30'}`}
                        aria-hidden="true"
                      />
                      <p className="text-white text-base font-semibold">{titulo}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{texto}</p>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>

            <motion.div {...aparecer(0.5)}>
              <a
                href="https://ramizzz8.github.io/Curriculum/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#e63946] text-[#e63946] rounded-lg font-bold hover:bg-[#e63946] hover:text-white transition-colors duration-300"
              >
                {t.about.cv}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

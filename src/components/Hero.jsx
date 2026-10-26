import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Typewriter({ roles }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDeleting(false)
    setRoleIndex(0)
  }, [roles])

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex, roles])

  return (
    <span className="font-mono text-[#e63946] tracking-tight">
      <span className="text-white/30 select-none">&gt; </span>
      {displayed}
      <span className="animate-pulse text-[#e63946]">_</span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLang()

  // Parallax: la foto baja más despacio que la página y el texto sube y se desvanece
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const fotoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120])
  // Opacidad con función: framer-motion acelera los rangos de opacidad con el scroll
  // de toda la página e ignora el offset de la sección
  const contentOpacity = useTransform(scrollYProgress, (p) => (reduce ? 1 : Math.max(0, 1 - p / 0.7)))

  return (
    <section ref={sectionRef} className="portada relative overflow-hidden">
      {/* Foto: cada versión tiene dos capas alineadas, el fondo y la persona recortada,
          para poder fundir el fondo con la página sin difuminar a la persona */}
      <motion.div style={{ y: fotoY }} className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="portada-marco"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="portada-escena portada-escena-h">
            <img src={img('images/portada/horizontal-fondo.webp')} alt="" className="portada-fondo" fetchPriority="high" />
            <img src={img('images/portada/horizontal-persona.webp')} alt="" className="portada-persona" />
          </div>
        </motion.div>
        <motion.div
          className="portada-escena portada-escena-v"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img src={img('images/portada/vertical-fondo.webp')} alt="" className="portada-fondo" />
          <img src={img('images/portada/vertical-persona.webp')} alt="" className="portada-persona" />
        </motion.div>
      </motion.div>

      {/* Funde el borde inferior con la sección siguiente (también mientras la foto baja con el scroll) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg-main)] pointer-events-none" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="absolute inset-0 z-10 pointer-events-none">
        {/* En escritorio, nombre y texto forman un bloque anclado abajo a la izquierda;
            en móvil, el nombre va arriba y el texto abajo */}
        <motion.div variants={container} initial="hidden" animate="show" className="portada-bloque">
          <motion.h1 variants={item} className="portada-nombre font-bebas leading-[0.84] tracking-wide">
            <span className="block">Andrés</span>
            <span className="block text-[#e63946]">Ramírez</span>
          </motion.h1>

          <div className="portada-pie pointer-events-auto">
            <motion.div variants={item} className="text-lg md:text-xl h-8">
              <Typewriter roles={t.hero.roles} />
            </motion.div>
            <motion.p variants={item} className="text-white/75 leading-relaxed mt-2 mb-6 text-base md:text-[17px]">
              {t.hero.tagline}
            </motion.p>
            <motion.div variants={item} className="flex gap-4 flex-wrap portada-botones">
              <a
                href="#trabajos"
                className="px-8 py-3 bg-[#e63946] text-[#fff] font-bold rounded-lg hover:bg-[#c62c38] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e63946]/30"
              >
                {t.hero.cta_projects}
              </a>
              <a
                href="#contacto"
                className="px-8 py-3 border-2 border-[#e63946] text-[#e63946] font-bold rounded-lg hover:bg-[#e63946] hover:text-white transition-all duration-300 hover:scale-105"
              >
                {t.hero.cta_contact}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}

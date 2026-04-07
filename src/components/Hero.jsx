import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={img('images/hero.jpg')}
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-main)]/40 via-[var(--bg-main)]/60 to-[var(--bg-main)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6"
      >
        <motion.div variants={item} className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#e63946] blur-2xl opacity-20 scale-110" />
            <img
              src={img('images/ajrg2.jpeg')}
              alt="Foto de perfil de Andrés Ramírez"
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#e63946]/40 shadow-xl shadow-black/40"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-bebas text-7xl md:text-9xl leading-none tracking-wide"
        >
          ANDRÉS <span className="text-[#e63946]">RAMÍREZ</span>
        </motion.h1>

        <motion.div variants={item} className="text-lg md:text-xl mt-5 h-8">
          <Typewriter roles={t.hero.roles} />
        </motion.div>

        <motion.div variants={item} className="flex justify-center gap-4 mt-10 flex-wrap">
          <a
            href="#trabajos"
            className="px-8 py-3 bg-[#e63946] text-white font-bold rounded-lg hover:bg-[#c62c38] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e63946]/30"
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

        <motion.div variants={item} className="mt-16 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-white/30 text-sm"
          >
            <span>scroll</span>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 0v16M1 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { img } from '../utils/img'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
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
        {/* Foto de perfil */}
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

        {/* Nombre */}
        <motion.h1
          variants={item}
          className="font-bebas text-7xl md:text-9xl leading-none tracking-wide"
        >
          ANDRÉS <span className="text-[#e63946]">RAMÍREZ</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl mt-4 text-white/80"
        >
          <span className="text-[#e63946]">Desarrollador</span> de Aplicaciones Web
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex justify-center gap-4 mt-10 flex-wrap">
          <a
            href="#trabajos"
            className="px-8 py-3 bg-[#e63946] text-white font-bold rounded-lg hover:bg-[#c62c38] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#e63946]/30"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="px-8 py-3 border-2 border-[#e63946] text-[#e63946] font-bold rounded-lg hover:bg-[#e63946] hover:text-white transition-all duration-300 hover:scale-105"
          >
            Contactarme
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 flex justify-center"
        >
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

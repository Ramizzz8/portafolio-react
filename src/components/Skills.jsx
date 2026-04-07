import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: 'HTML', image: '/images/logo-de-html.png', level: 90 },
  { name: 'CSS', image: '/images/css.png', level: 85 },
  { name: 'JavaScript', image: '/images/javascript.png', level: 80 },
  { name: 'Python', image: '/images/python-removebg-preview.png', level: 75 },
  { name: 'SQL', image: '/images/sqlogo.png', level: 70 },
]

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[var(--bg-card)] rounded-xl p-6 flex flex-col items-center gap-4 hover:bg-[var(--bg-hover)] transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#e63946] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <img
          src={skill.image}
          alt={skill.name}
          className="w-20 h-20 object-contain relative transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="font-bebas text-2xl tracking-wide">{skill.name}</span>
      {/* Barra de nivel */}
      <div className="w-full bg-[var(--bg-main)] rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          className="h-full bg-[#e63946] rounded-full"
        />
      </div>
      <span className="text-white/50 text-sm">{skill.level}%</span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="habilidades" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-5xl text-center mb-4 tracking-wide"
        >
          STACK <span className="text-[#e63946]">TECNOLÓGICO</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white/50 mb-14"
        >
          Tecnologías con las que trabajo día a día
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

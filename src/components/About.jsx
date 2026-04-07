import { motion } from 'framer-motion'

const stats = [
  { value: '6+', label: 'Proyectos completados' },
  { value: '5', label: 'Tecnologías dominadas' },
]

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-6 relative overflow-hidden">
      {/* Imagen de fondo lado derecho */}
      <div className="absolute inset-y-0 right-0 w-1/2 z-0 pointer-events-none hidden md:block">
        <img
          src="/images/about.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-main)] via-[var(--bg-main)]/60 to-transparent" />
      </div>
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e63946] rounded-full opacity-[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3a86ff] rounded-full opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-5xl text-center mb-20 tracking-wide"
        >
          SOBRE <span className="text-[#e63946]">MÍ</span>
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Columna izquierda: foto + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col items-center gap-8"
          >
            {/* Foto con decoración */}
            <div className="relative">
              {/* Marco decorativo */}
              <div className="absolute -inset-3 rounded-2xl border border-[#e63946]/20" />
              <div className="absolute -inset-6 rounded-2xl border border-[#e63946]/08" />
              {/* Punto decorativo */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#e63946] rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#3a86ff] rounded-full" />

              <img
                src="/images/ajrg2.jpeg"
                alt="Andrés Ramírez"
                className="relative w-52 h-52 object-cover rounded-2xl"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4 w-full">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-[var(--bg-card)] border border-white/5 rounded-xl p-4 text-center md:text-left md:flex md:items-center md:gap-4"
                >
                  <span className="font-bebas text-3xl text-[#e63946] block md:inline">{s.value}</span>
                  <span className="text-white/50 text-xs leading-tight block">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha: texto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-5 text-white/75 leading-relaxed text-lg">
              <p>
                Soy desarrollador web con enfoque en construir soluciones{' '}
                <span className="text-white font-semibold">prácticas, escalables y bien estructuradas</span>.
                Me apasiona transformar ideas en productos digitales funcionales que resuelvan
                problemas reales.
              </p>
              <p>
                Trabajo con{' '}
                <span className="text-[#e63946] font-medium">HTML, CSS y JavaScript</span> en el
                front-end, y con{' '}
                <span className="text-[#e63946] font-medium">Python, Flask y MySQL</span> en el
                back-end, lo que me permite cubrir el ciclo completo de desarrollo de una aplicación
                web.
              </p>
              <p>
                Destaco por mi capacidad de analizar problemas con criterio, proponer mejoras
                continuas y mantener la responsabilidad en cada etapa —{' '}
                <span className="text-white font-semibold">desde la idea hasta el producto final</span>.
              </p>
            </div>

            {/* Skills inline */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'MySQL', 'Git'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-[var(--bg-card)] border border-white/10 rounded-lg text-sm text-white/70 hover:border-[#e63946]/40 hover:text-white transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://ramizzz8.github.io/Curriculum/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#e63946] text-[#e63946] rounded-lg font-bold hover:bg-[#e63946] hover:text-white transition-all duration-300 hover:scale-105"
              >
                Ver Currículum ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

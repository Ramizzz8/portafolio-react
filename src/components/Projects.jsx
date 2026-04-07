import { motion } from 'framer-motion'
import { featuredProjects, otherProjects } from '../data/projects'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'

function TechBadge({ tech, color }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium border"
      style={{
        color: color,
        borderColor: `${color}40`,
        backgroundColor: `${color}10`,
      }}
    >
      {tech}
    </span>
  )
}

function FeaturedCard({ project, index }) {
  const { t } = useLang()
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden group"
      style={{ border: `1px solid ${project.color}20` }}
    >
      {/* Glow de fondo */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at ${isEven ? '0%' : '100%'} 50%, ${project.color}, transparent 70%)` }}
      />

      {/* Imagen */}
      <div className={`relative overflow-hidden h-64 md:h-auto ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <img
          src={img(project.image)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? `linear-gradient(to right, transparent 60%, var(--bg-main))`
              : `linear-gradient(to left, transparent 60%, var(--bg-main))`,
          }}
        />
      </div>

      {/* Contenido */}
      <div
        className={`relative flex flex-col justify-center p-8 md:p-12 bg-[var(--bg-card)] ${
          isEven ? 'md:order-2' : 'md:order-1'
        }`}
      >
        {/* Badge destacado */}
        <span
          className="text-xs font-bold tracking-widest uppercase mb-4 inline-block"
          style={{ color: project.color }}
        >
          {t.projects.featured_badge}
        </span>

        <p className="text-white/40 text-sm mb-1">{project.tagline}</p>
        <h3 className="font-bebas text-4xl md:text-5xl mb-4 leading-tight">{project.title}</h3>
        <p className="text-white/70 leading-relaxed mb-6 text-sm md:text-base">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} color={project.color} />
          ))}
        </div>

        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: project.color,
                color: '#fff',
                boxShadow: `0 0 20px ${project.color}30`,
              }}
            >
              <img src={img('images/github.png')} alt="" className="w-4 h-4 brightness-0 invert" />
              {t.projects.view_code}
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm border transition-all duration-300 hover:scale-105"
              style={{ borderColor: project.color, color: project.color }}
            >
              {t.projects.view_demo}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function OtherCard({ project, index }) {
  const { t } = useLang()
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group flex flex-col bg-[var(--bg-card)]/60 border border-white/5 rounded-xl overflow-hidden hover:border-[#e63946]/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={img(project.image)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-bebas text-xl tracking-wide">{project.title}</h3>
        <p className="text-white/50 text-xs leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-[10px] px-2 py-0.5 bg-[var(--bg-main)] text-white/40 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#e63946] hover:underline font-medium mt-1"
          >
            {t.projects.view_repo}
          </a>
        ) : (
          <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/30 rounded-full mt-1 inline-block">
            {t.projects.private_badge}
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = useLang()
  return (
    <section id="trabajos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-5xl text-center mb-4 tracking-wide"
        >
          {t.projects.title} <span className="text-[#e63946]">{t.projects.highlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white/40 mb-16 text-sm"
        >
          {t.projects.subtitle}
        </motion.p>

        {/* Proyectos destacados */}
        <div className="flex flex-col gap-8 mb-20">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-sm font-medium tracking-widest uppercase">{t.projects.others}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Otros proyectos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {otherProjects.map((p, i) => (
            <OtherCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

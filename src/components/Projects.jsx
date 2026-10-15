import { motion } from 'framer-motion'
import { useRef } from 'react'
import { featuredProjects, otherProjects } from '../data/projects'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'
import { useParallax } from '../hooks/useParallax'
import BgWord from './BgWord'

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

// Portada del proyecto: usa la imagen diseñada si existe (cover: true);
// si no, enmarca la captura en una ventana de navegador sobre fondo de marca.
// `frameY`: desplazamiento extra (parallax) de la ventana sobre el fondo.
function ProjectCover({ project, compact = false, frameY }) {
  if (project.cover) {
    return (
      <img
        src={img(project.image)}
        alt={project.title}
        loading="lazy"
        style={{ objectPosition: project.imagePosition }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    )
  }

  const color = project.color ?? '#e63946'
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(circle at 25% 15%, ${color}40, transparent 60%), #0d1b2a` }}
    >
      <div className="absolute w-[130%] aspect-square -right-[75%] rounded-full border border-white/5" />
      <div className="absolute w-[95%] aspect-square -right-[55%] rounded-full border border-white/5" />
      <motion.div
        style={{ y: frameY }}
        className={`relative rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-black/60 transition-transform duration-700 group-hover:scale-105 ${
          compact ? 'w-[86%] translate-y-5' : 'w-[80%]'
        }`}
      >
        <div className="flex gap-1 px-2.5 py-1.5 bg-[#1b273b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
        </div>
        <img
          src={img(project.image)}
          alt={project.title}
          loading="lazy"
          className="block w-full aspect-[16/10] object-cover object-top"
        />
      </motion.div>
    </div>
  )
}

function FeaturedCard({ project, index }) {
  const { t, lang } = useLang()
  const isEven = index % 2 === 0

  // Parallax: la portada se mueve más lenta que la tarjeta y la ventana, en sentido contrario
  const cardRef = useRef(null)
  const coverY = useParallax(cardRef, 30)
  const frameY = useParallax(cardRef, -20)

  return (
    <motion.article
      ref={cardRef}
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
      <div className={`relative overflow-hidden h-64 md:h-auto md:min-h-[380px] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div style={{ y: coverY }} className="absolute inset-x-0 -inset-y-10">
          <ProjectCover project={project} frameY={frameY} />
        </motion.div>
        <div
          className="absolute inset-0 pointer-events-none"
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

        <p className="text-white/40 text-sm mb-1">{project.tagline[lang]}</p>
        <h3 className="font-bebas text-4xl md:text-5xl mb-4 leading-tight">{project.title}</h3>
        <p className="text-white/70 leading-relaxed mb-6 text-sm md:text-base">{project.description[lang]}</p>

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
              <img src={img('images/github.webp')} alt="" className="w-4 h-4 brightness-0 invert" />
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
  const { t, lang } = useLang()
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group flex flex-col bg-[var(--bg-card)]/60 border border-white/5 rounded-xl overflow-hidden hover:border-[#e63946]/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <ProjectCover project={project} compact />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-bebas text-2xl tracking-wide">{project.title}</h3>
        <p className="text-white/55 text-sm leading-relaxed flex-1">{project.description[lang]}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-[10px] px-2 py-0.5 bg-[var(--bg-main)] text-white/40 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#e63946] hover:underline font-medium"
            >
              {t.projects.view_repo}
            </a>
          ) : (
            <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/30 rounded-full inline-block">
              {t.projects.private_badge}
            </span>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium hover:underline"
              style={{ color: project.color }}
            >
              {t.projects.view_demo}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = useLang()
  return (
    <section id="trabajos" className="py-24 px-6 relative overflow-hidden">
      <BgWord word={t.projects.bg_word} />
      <div className="max-w-6xl mx-auto relative">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherProjects.map((p, i) => (
            <OtherCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

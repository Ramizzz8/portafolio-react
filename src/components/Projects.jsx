import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { featuredProjects, otherProjects } from '../data/projects'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'
import { useParallax } from '../hooks/useParallax'
import BgWord from './BgWord'
import ProjectModal from './ProjectModal'
import { projectDetails } from '../data/projectDetails'

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

function FeaturedCard({ project, index, onOpen }) {
  const { t, lang } = useLang()
  const isEven = index % 2 === 0
  const tieneVideo = Boolean(projectDetails[project.id]?.video)
  // El botón de código es secundario si hay otra acción principal (demo en vivo o vídeo)
  const secundario = Boolean(project.live) || tieneVideo

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
      className="relative grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
      style={{ border: `1px solid ${project.color}20` }}
      // Toda la tarjeta abre la ventana de detalle (también con Enter o Espacio)
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onOpen(project)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${t.projects.details_btn}: ${project.title}`}
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

        <div className="flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm border border-white/15 text-white transition-all duration-300 hover:scale-105 hover:border-white/40"
          >
            {t.projects.details_btn}
            <span aria-hidden="true">↗</span>
          </button>
          {/* Sin demo en vivo pero con vídeo: "Ver vídeo" abre la ficha, que empieza por el vídeo */}
          {!project.live && tieneVideo && (
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: project.color, color: '#fff', boxShadow: `0 0 20px ${project.color}30` }}
            >
              <span aria-hidden="true">▶</span>
              {t.projects.view_video}
            </button>
          )}
          {/* Si hay demo en vivo, es la acción principal; el código pasa a botón secundario */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: project.color, color: '#fff', boxShadow: `0 0 20px ${project.color}30` }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
              {t.projects.view_live}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105"
              style={
                secundario
                  ? { border: `1px solid ${project.color}`, color: project.color }
                  : { backgroundColor: project.color, color: '#fff', boxShadow: `0 0 20px ${project.color}30` }
              }
            >
              <img
                src={img('images/github.webp')}
                alt=""
                className={`w-4 h-4 ${secundario ? 'icono-adaptable' : ''}`}
                style={secundario ? undefined : { filter: 'brightness(0) invert(1)' }}
              />
              {t.projects.view_code}
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
  const [abierto, setAbierto] = useState(null)
  const [verOtros, setVerOtros] = useState(false)
  // Fondo de líneas: la imagen se estira hasta el final de los destacados y su reflejo
  // vertical continúa en "Otros proyectos". `corte` es la altura (en px desde el inicio
  // de la sección) donde se unen; se mide con ResizeObserver al cambiar el tamaño.
  const seccionRef = useRef(null)
  const destacadosRef = useRef(null)
  const [corte, setCorte] = useState(0)
  useEffect(() => {
    const seccion = seccionRef.current
    const observador = new ResizeObserver(() => {
      const destacados = destacadosRef.current
      if (!destacados) return
      // Unión en mitad del margen que separa los destacados del botón (mb-20 = 80px)
      setCorte(destacados.getBoundingClientRect().bottom - seccion.getBoundingClientRect().top + 40)
    })
    observador.observe(seccion)
    return () => observador.disconnect()
  }, [])
  const cerrar = useCallback(() => setAbierto(null), [])
  return (
    <section ref={seccionRef} id="trabajos" className="py-24 px-6 relative overflow-hidden">
      {corte > 0 && (
        <div aria-hidden="true" className="pointer-events-none">
          <div className="fondo-destacados absolute inset-x-0 top-0 overflow-hidden" style={{ height: corte }}>
            <img src={img('images/hero.webp')} alt="" className="w-full h-full object-fill opacity-25" />
          </div>
          <div className="fondo-otros absolute inset-x-0 bottom-0 overflow-hidden" style={{ top: corte }}>
            <img src={img('images/hero.webp')} alt="" className="w-full min-h-full aspect-[3/2] object-fill opacity-25 -scale-y-100" />
          </div>
        </div>
      )}
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
        <div ref={destacadosRef} className="flex flex-col gap-8 mb-20">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} onOpen={setAbierto} />
          ))}
        </div>

        {/* Divisor desplegable: muestra u oculta el resto de proyectos */}
        <button
          type="button"
          onClick={() => setVerOtros((v) => !v)}
          aria-expanded={verOtros}
          aria-controls="otros-proyectos"
          className="group w-full flex items-center gap-4 py-3 cursor-pointer"
        >
          <span className="flex-1 h-px bg-white/10 transition-colors duration-300 group-hover:bg-[#e63946]/40" />
          <span className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm font-medium tracking-widest uppercase transition-all duration-300 group-hover:border-[#e63946]/50 group-hover:text-white group-hover:bg-[#e63946]/10">
            {t.projects.others}
            <span className="text-xs text-white/30 normal-case tracking-normal group-hover:text-white/60">
              ({otherProjects.length})
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: verOtros ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#e63946]"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </span>
          <span className="flex-1 h-px bg-white/10 transition-colors duration-300 group-hover:bg-[#e63946]/40" />
        </button>

        {/* Otros proyectos (plegados por defecto) */}
        <AnimatePresence initial={false}>
          {verOtros && (
            <motion.div
              id="otros-proyectos"
              key="otros"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
                {otherProjects.map((p, i) => (
                  <OtherCard key={p.id} project={p} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ProjectModal project={abierto} onClose={cerrar} />
    </section>
  )
}

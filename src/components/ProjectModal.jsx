import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'
import { projectDetails } from '../data/projectDetails'

// Ventana con la información ampliada de un proyecto destacado.
// Se cierra con Esc, con la X o haciendo clic fuera; las flechas cambian de imagen.
export default function ProjectModal({ project, onClose }) {
  const { t, lang } = useLang()
  const cerrarRef = useRef(null)
  // La imagen elegida se guarda junto al id del proyecto: al abrir otro, vuelve a la primera
  const [seleccion, setSeleccion] = useState({ id: null, indice: 0 })
  const actual = seleccion.id === project?.id ? seleccion.indice : 0

  const detalle = project ? projectDetails[project.id] : null
  const imagenes = project ? [project.image, ...(detalle?.galeria ?? [])] : []
  const textos = detalle?.[lang]
  const total = imagenes.length
  const setActual = (indice) => setSeleccion({ id: project.id, indice })

  useEffect(() => {
    if (!project) return
    const focoAnterior = document.activeElement
    document.body.style.overflow = 'hidden' // la página de fondo no hace scroll
    cerrarRef.current?.focus()

    const alPulsar = (e) => {
      if (e.key === 'Escape') onClose()
      const paso = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
      if (paso) {
        setSeleccion((s) => {
          const i = s.id === project.id ? s.indice : 0
          return { id: project.id, indice: (i + paso + total) % total }
        })
      }
    }
    window.addEventListener('keydown', alPulsar)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', alPulsar)
      focoAnterior?.focus?.()
    }
  }, [project, onClose, total])

  // Portal: se monta en <body> para que ningún contenedor con transform u overflow la recorte
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="fondo"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-titulo"
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[var(--bg-card)] shadow-2xl shadow-black/60"
            style={{ border: `1px solid ${project.color}40` }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cerrar */}
            <button
              ref={cerrarRef}
              onClick={onClose}
              aria-label={t.projects.modal.close}
              className="sticky top-3 float-right mr-3 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/15 text-[#fff] text-lg flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              ✕
            </button>

            {/* Galería */}
            <div className="relative aspect-video bg-[var(--bg-main)] -mt-[52px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imagenes[actual]}
                  src={img(imagenes[actual])}
                  alt={`${project.title} — ${actual + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: actual === 0 ? project.imagePosition ?? 'top' : 'top' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent pointer-events-none" />

              {imagenes.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {imagenes.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActual(i)}
                      aria-label={`${t.projects.modal.image} ${i + 1}`}
                      className="w-16 h-10 sm:w-20 sm:h-12 rounded-md overflow-hidden border-2 transition-all"
                      style={{ borderColor: i === actual ? project.color : 'rgba(255,255,255,0.2)', opacity: i === actual ? 1 : 0.6 }}
                    >
                      <img src={img(src)} alt="" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="px-6 pt-5 pb-8 sm:px-10 sm:pt-6 sm:pb-10 relative">
              <p className="text-sm font-semibold tracking-wide mb-1" style={{ color: project.color }}>
                {project.tagline[lang]}
              </p>
              <h2 id="modal-titulo" className="font-bebas text-5xl sm:text-6xl leading-none mb-5">
                {project.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full font-medium border"
                    style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}12` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Seccion titulo={t.projects.modal.about} color={project.color}>
                {(textos?.resumen ?? [project.description[lang]]).map((p) => (
                  <p key={p} className="text-white/75 leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
              </Seccion>

              {textos && (
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <Seccion titulo={t.projects.modal.features} color={project.color}>
                    <Lista items={textos.funciones} color={project.color} icono="✓" />
                  </Seccion>
                  <Seccion titulo={t.projects.modal.technical} color={project.color}>
                    <Lista items={textos.tecnico} color={project.color} icono="›" />
                  </Seccion>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-white/10">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg font-bold text-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: project.color, color: '#fff' }}
                  >
                    {t.projects.view_demo}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm border transition-transform hover:scale-105"
                    style={project.live ? { borderColor: project.color, color: project.color } : { backgroundColor: project.color, borderColor: project.color, color: '#fff' }}
                  >
                    <img src={img('images/github.webp')} alt="" className={`w-4 h-4 ${project.live ? 'icono-adaptable' : 'brightness-0 invert'}`} />
                    {t.projects.view_code}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Seccion({ titulo, color, children }) {
  return (
    <section>
      <h3 className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
        <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
        {titulo}
      </h3>
      {children}
    </section>
  )
}

function Lista({ items, color, icono }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-white/75 leading-relaxed">
          <span className="font-bold shrink-0" style={{ color }}>{icono}</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

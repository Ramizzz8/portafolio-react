import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import BgWord from './BgWord'

import { categoriasTecnologia, tecnologias, usosDe } from '../data/tecnologias'

const REPO_PORTAFOLIO = 'https://github.com/Ramizzz8/portafolio-react'

// Cada categoría usa la clave de t.skills.categories
const categories = categoriasTecnologia.map((key) => ({
  key,
  items: tecnologias.filter((t) => t.categoria === key),
}))
const usos = new Map(tecnologias.map((t) => [t.nombre, usosDe(t)]))
// Al llegar se muestra la tecnología más usada (sin contar Git, que está en todos los repos)
const masUsada = tecnologias
  .filter((t) => t.nombre !== 'Git')
  .reduce((a, b) => (usos.get(b.nombre).length > usos.get(a.nombre).length ? b : a))

// Color de marca legible sobre el fondo: los logos casi negros pasan a blanco en el tema oscuro y viceversa
function colorMarca(hex, tema) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
  if (tema === 'dark' && luz < 0.12) return '#ffffff'
  if (tema === 'light' && luz > 0.75) return '#1a1a1a'
  return `#${hex}`
}

function Logo({ icono, className }) {
  const dentro = icono.path ? `<path d="${icono.path}"/>` : icono.svg
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: dentro }} />
}

function BotonTecnologia({ item, activa, onElegir, tema, t }) {
  const n = usos.get(item.nombre).length
  return (
    <button
      type="button"
      onClick={() => onElegir(item)}
      aria-pressed={activa}
      style={{ '--marca': colorMarca(item.icono.hex, tema) }}
      className={`group w-full h-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-colors duration-200 ${
        activa ? 'border-[#e63946] bg-[#e63946]/10' : 'border-white/5 bg-[var(--bg-card)] hover:border-white/20'
      }`}
    >
      <Logo
        icono={item.icono}
        className={`w-6 h-6 shrink-0 transition-colors duration-200 ${activa ? 'text-[var(--marca)]' : 'text-white/55 group-hover:text-[var(--marca)]'}`}
      />
      <span className="min-w-0">
        <span className="block text-sm text-white font-medium leading-tight">{item.nombre}</span>
        <span className="block text-sm text-white/45">
          {n} {n === 1 ? t.skills.uso : t.skills.usos}
        </span>
      </span>
    </button>
  )
}

// Abre la ficha del proyecto (la escucha la sección de proyectos) o el repo del portafolio
function abrir(uso) {
  if (uso === 'portafolio') window.open(REPO_PORTAFOLIO, '_blank', 'noopener,noreferrer')
  else window.dispatchEvent(new CustomEvent('abrir-proyecto', { detail: uso.id }))
}

function Panel({ tecnologia, tema, t, lang }) {
  const lista = usos.get(tecnologia.nombre)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tecnologia.nombre}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="bg-[var(--bg-card)] border border-white/5 rounded-2xl p-6"
        aria-live="polite"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0" style={{ color: colorMarca(tecnologia.icono.hex, tema) }}>
            <Logo icono={tecnologia.icono} className="w-8 h-8" />
          </div>
          <div className="min-w-0">
            <p className="text-white/50 text-sm">{t.skills.donde}</p>
            <h3 className="font-bebas text-4xl leading-none tracking-wide">{tecnologia.nombre}</h3>
          </div>
          <span className="ml-auto font-bebas text-5xl leading-none text-[#e63946]">{lista.length}</span>
        </div>
        <ul className="flex flex-col gap-1 lg:max-h-[calc(100vh-17rem)] lg:overflow-y-auto">
          {lista.map((uso) => {
            const esPortafolio = uso === 'portafolio'
            return (
              <li key={esPortafolio ? 'portafolio' : uso.id}>
                <button
                  type="button"
                  onClick={() => abrir(uso)}
                  className="group w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: esPortafolio ? '#e63946' : uso.color }} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-white text-base group-hover:text-[#e63946] transition-colors duration-200">
                      {esPortafolio ? t.skills.portafolio : uso.title}
                    </span>
                    <span className="block text-white/50 text-sm truncate">
                      {esPortafolio ? t.skills.portafolio_desc : (uso.tagline?.[lang] ?? uso.description[lang])}
                    </span>
                  </span>
                  <span className="text-white/30 group-hover:text-[#e63946] transition-colors duration-200" aria-hidden="true">↗</span>
                </button>
              </li>
            )
          })}
        </ul>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Skills() {
  const { t, lang } = useLang()
  const { theme } = useTheme()
  const [elegida, setElegida] = useState(masUsada)
  const props = { tema: theme, t }

  return (
    <section id="habilidades" className="py-24 px-6 relative overflow-clip">
      <BgWord word={t.skills.bg_word} direction={-1} />
      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-5xl text-center mb-4 tracking-wide"
        >
          {t.skills.title} <span className="text-[#e63946]">{t.skills.highlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white/50 mb-14"
        >
          {t.skills.subtitle}
        </motion.p>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10">
          <div className="flex flex-col gap-10 min-w-0">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h3 className="font-bebas text-3xl tracking-wide mb-4">
                  <span className="text-[#e63946] mr-2">0{i + 1}</span>
                  {t.skills.categories[cat.key]}
                </h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {cat.items.map((item) => (
                    <li key={item.nombre}>
                      <BotonTecnologia item={item} activa={elegida.nombre === item.nombre} onElegir={setElegida} {...props} />
                    </li>
                  ))}
                </ul>
                {/* En móvil y tablet el panel aparece debajo de la categoría elegida */}
                {elegida.categoria === cat.key && (
                  <div className="lg:hidden mt-4">
                    <Panel tecnologia={elegida} lang={lang} {...props} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {/* La columna ocupa todo el alto para que el panel pueda quedarse fijo al hacer scroll */}
          <div className="hidden lg:block min-w-0">
            <div className="sticky top-28">
              <Panel tecnologia={elegida} lang={lang} {...props} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

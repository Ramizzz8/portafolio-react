import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import BgWord from './BgWord'

import { categoriasTecnologia, tecnologias } from '../data/tecnologias'

// Cada categoría usa la clave de traducción de t.skills.categories
const categories = categoriasTecnologia.map((key) => ({
  key,
  items: tecnologias.filter((t) => t.categoria === key),
}))

// Color de marca legible sobre el fondo: los logos casi negros pasan a blanco en el tema oscuro y viceversa
function colorMarca(hex, tema) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
  if (tema === 'dark' && luz < 0.12) return '#ffffff'
  if (tema === 'light' && luz > 0.75) return '#1a1a1a'
  return `#${hex}`
}

// Logo en un solo color que toma el de su marca al pasar el ratón
function SkillChip({ item, tema }) {
  const dentro = item.icono.path ? `<path d="${item.icono.path}"/>` : item.icono.svg
  return (
    <li
      style={{ '--marca': colorMarca(item.icono.hex, tema) }}
      className="group flex items-center gap-2.5 px-3 py-2 bg-[var(--bg-main)] border border-white/5 rounded-lg text-sm text-white/80 hover:border-[#e63946]/40 hover:text-white transition-all duration-200"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-5 h-5 shrink-0 text-white/55 group-hover:text-[var(--marca)] transition-colors duration-200"
        dangerouslySetInnerHTML={{ __html: dentro }}
      />
      {item.nombre}
    </li>
  )
}

export default function Skills() {
  const { t } = useLang()
  const { theme } = useTheme()
  return (
    <section id="habilidades" className="py-24 px-6 relative overflow-hidden">
      <BgWord word={t.skills.bg_word} direction={-1} />
      <div className="max-w-5xl mx-auto relative">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--bg-card)] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors duration-300"
            >
              <h3 className="font-bebas text-3xl tracking-wide mb-4">
                <span className="text-[#e63946] mr-2">0{i + 1}</span>
                {t.skills.categories[cat.key]}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <SkillChip key={item.nombre} item={item} tema={theme} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { img } from '../utils/img'
import { useLang } from '../context/LanguageContext'
import BgWord from './BgWord'

import { categoriasTecnologia, tecnologias } from '../data/tecnologias'

// Cada categoría usa la clave de traducción de t.skills.categories
const categories = categoriasTecnologia.map((key) => ({
  key,
  items: tecnologias.filter((t) => t.categoria === key),
}))

function SkillChip({ item }) {
  return (
    <li className="flex items-center gap-2.5 px-3 py-2 bg-[var(--bg-main)] border border-white/5 rounded-lg text-sm text-white/80 hover:border-[#e63946]/40 hover:text-white transition-all duration-200">
      {item.icono ? (
        <img src={img(item.icono)} alt="" className={`w-5 h-5 object-contain ${item.adaptable ? 'icono-adaptable' : ''}`} />
      ) : (
        <span className="w-2.5 h-2.5 mx-[5px] rounded-full" style={{ backgroundColor: item.color }} />
      )}
      {item.nombre}
    </li>
  )
}

export default function Skills() {
  const { t } = useLang()
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
              <h3 className="font-bebas text-2xl tracking-wide mb-4">
                <span className="text-[#e63946] mr-2">0{i + 1}</span>
                {t.skills.categories[cat.key]}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <SkillChip key={item.nombre} item={item} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

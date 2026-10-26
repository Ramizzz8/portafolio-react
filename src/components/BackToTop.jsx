import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  // Solo aparece al subir (cuando el visitante busca volver) y se oculta junto al pie,
  // para no quedarse fijo encima del texto en pantallas estrechas
  useEffect(() => {
    let anterior = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const subiendo = y < anterior - 4
      const bajando = y > anterior + 4
      const cercaDelPie = y + window.innerHeight > document.documentElement.scrollHeight - 160
      if (y < 400 || cercaDelPie || bajando) setVisible(false)
      else if (subiendo) setVisible(true)
      anterior = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-11 h-11 bg-[#e63946] rounded-full flex items-center justify-center shadow-lg shadow-[#e63946]/30 hover:bg-[#c62c38] hover:scale-110 transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { img } from '../utils/img'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [faded, setFaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()

  const navLinks = [
    { label: t.nav.projects, href: '#trabajos' },
    { label: t.nav.skills, href: '#habilidades' },
    { label: t.nav.about, href: '#sobre-mi' },
    { label: t.nav.contact, href: '#contacto' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setFaded(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        faded
          ? 'bg-[var(--bg-card)]/30 backdrop-blur-md shadow-none'
          : scrolled
          ? 'bg-[var(--bg-card)]/95 backdrop-blur-sm shadow-lg shadow-black/20'
          : 'bg-[var(--bg-card)]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Social links */}
        <nav className="flex items-center gap-3" aria-label="Redes sociales">
          <a href="https://www.linkedin.com/in/andr%C3%A9s-ram%C3%ADrez-011936349/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
            <img src={img('images/linkedin.webp')} alt="LinkedIn" className="w-7 h-7 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125" />
          </a>
          <a href="https://github.com/Ramizzz8" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
            <img src={img('images/github.webp')} alt="GitHub" className="w-7 h-7 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125" />
          </a>
          <a href="mailto:ajulianrague@gmail.com" aria-label="Correo" className="group">
            <img src={img('images/mail.webp')} alt="Email" className="w-7 h-7 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125" />
          </a>
        </nav>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-bebas text-2xl text-white tracking-wide transition-all duration-300 hover:text-[#e63946] hover:scale-110 inline-block"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controles derecha */}
        <div className="flex items-center gap-2">
          {/* Toggle idioma */}
          <button
            onClick={toggleLang}
            aria-label="Cambiar idioma"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#e63946]/50 transition-all duration-300 hover:scale-110 font-mono text-xs font-bold text-white/70 hover:text-white"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Toggle tema */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title={theme === 'black' ? 'Cambiar a tema azul' : 'Cambiar a tema negro'}
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#e63946]/50 transition-all duration-300 hover:scale-110"
          >
            {/* Muestra el color del tema al que se cambiará */}
            <span
              className="w-4 h-4 rounded-full border border-white/40"
              style={{ backgroundColor: theme === 'black' ? '#2b4a75' : '#0a0a0a' }}
            />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[var(--bg-card)] border-t border-white/10"
          >
            <nav className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-bebas text-2xl text-white tracking-wide hover:text-[#e63946] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

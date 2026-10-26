import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { IconoGitHub, IconoGmail, IconoLinkedIn } from './IconosRedes'
import { useLang } from '../context/LanguageContext'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [faded, setFaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()

  const navLinks = [
    { label: t.nav.about, href: '#sobre-mi' },
    { label: t.nav.projects, href: '#trabajos' },
    { label: t.nav.skills, href: '#habilidades' },
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
          <a href="https://www.linkedin.com/in/andr%C3%A9s-ram%C3%ADrez-011936349/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/85 hover:text-[#e63946] transition-[color,transform] duration-300 hover:scale-110">
            <IconoLinkedIn />
          </a>
          <a href="https://github.com/Ramizzz8" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/85 hover:text-[#e63946] transition-[color,transform] duration-300 hover:scale-110">
            <IconoGitHub />
          </a>
          <a href="mailto:ajulianrague@gmail.com" aria-label="Correo" className="text-white/85 hover:text-[#e63946] transition-[color,transform] duration-300 hover:scale-110">
            <IconoGmail />
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
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#e63946]/50 transition-all duration-300 hover:scale-110 font-mono text-sm font-bold text-white/70 hover:text-white"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Toggle tema: muestra el icono del modo al que se cambiará */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.to_light : t.theme.to_dark}
            title={theme === 'dark' ? t.theme.to_light : t.theme.to_dark}
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#e63946]/50 transition-all duration-300 hover:scale-110 text-white/70 hover:text-white"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 1.5v2.5M12 20v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M1.5 12H4M20 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
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

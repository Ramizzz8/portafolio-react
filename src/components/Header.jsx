import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-card)]/95 backdrop-blur-sm shadow-lg shadow-black/20'
          : 'bg-[var(--bg-card)]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Social links */}
        <nav className="flex items-center gap-3" aria-label="Redes sociales">
          <a href="https://www.linkedin.com/in/andr%C3%A9s-ram%C3%ADrez-011936349/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
            <img src="/images/linkedin.png" alt="LinkedIn" className="w-7 h-7 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125" />
          </a>
          <a href="https://github.com/Ramizzz8" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
            <img src="/images/github.png" alt="GitHub" className="w-7 h-7 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125" />
          </a>
          <a href="mailto:ajulianrague@gmail.com" aria-label="Correo" className="group">
            <img src="/images/mail.png" alt="Email" className="w-7 h-7 transition-all duration-300 group-hover:scale-125 group-hover:brightness-125" />
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
        <div className="flex items-center gap-3">
          {/* Toggle tema */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title={theme === 'black' ? 'Cambiar a tema azul' : 'Cambiar a tema negro'}
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#e63946]/50 transition-all duration-300 hover:scale-110"
          >
            {theme === 'black' ? (
              /* Icono azul (luna/oceano) */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Icono negro (sol) */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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

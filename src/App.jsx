import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLang } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import CustomCursor from './components/CustomCursor'

function AppContent() {
  const { t } = useLang()
  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="text-center py-8 text-white/30 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Andrés Ramírez · {t.footer}
      </footer>
      <BackToTop />
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

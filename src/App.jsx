import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="text-center py-8 text-white/30 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Andrés Ramírez · Hecho con React + Tailwind
      </footer>
    </ThemeProvider>
  )
}

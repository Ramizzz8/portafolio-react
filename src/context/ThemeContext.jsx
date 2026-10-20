import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

// Temas: 'dark' (por defecto) y 'light'. Los valores antiguos ('black', 'blue') pasan a 'dark'.
function temaGuardado() {
  try {
    return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(temaGuardado)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // sin almacenamiento disponible: el tema solo dura esta visita
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

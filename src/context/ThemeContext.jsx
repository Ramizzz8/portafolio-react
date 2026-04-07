import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('portfolio-theme') || 'black'
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'blue') {
      root.setAttribute('data-theme', 'blue')
    } else {
      root.removeAttribute('data-theme')
    }
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'black' ? 'blue' : 'black'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

import { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('portfolio-lang') || 'es'
  )

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    localStorage.setItem('portfolio-lang', next)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)

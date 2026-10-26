// Única lista de tecnologías del portafolio: todo lo usado de verdad en los proyectos y en su despliegue.
// La leen la sección "Stack tecnológico" y el contador de "Sobre mí".
// `categoria` es la clave de t.skills.categories; `icono` o `color` es lo que se pinta junto al nombre.
export const tecnologias = [
  { nombre: 'HTML', categoria: 'frontend', icono: 'images/logo-de-html.webp' },
  { nombre: 'CSS', categoria: 'frontend', icono: 'images/css.webp' },
  { nombre: 'JavaScript', categoria: 'frontend', icono: 'images/javascript.webp' },
  { nombre: 'React', categoria: 'frontend', color: '#61dafb' },
  { nombre: 'Tailwind CSS', categoria: 'frontend', color: '#38bdf8' },
  { nombre: 'Vite', categoria: 'frontend', color: '#facc15' },
  { nombre: 'Framer Motion', categoria: 'frontend', color: '#ff4d9d' },
  { nombre: 'Canvas', categoria: 'frontend', color: '#f97316' },
  { nombre: 'Web Speech API', categoria: 'frontend', color: '#22c55e' },

  { nombre: 'Python', categoria: 'backend', icono: 'images/python.webp' },
  { nombre: 'Flask', categoria: 'backend', color: 'var(--color-white)' },
  { nombre: 'PHP', categoria: 'backend', color: '#8892bf' },
  { nombre: 'MySQL', categoria: 'backend', icono: 'images/sqlogo.webp' },

  { nombre: 'Ollama', categoria: 'ia', color: 'var(--color-white)' },
  { nombre: 'ChromaDB', categoria: 'ia', color: '#ff6446' },
  { nombre: 'Sentence Transformers', categoria: 'ia', color: '#fbbf24' },
  { nombre: 'Transformers.js', categoria: 'ia', color: '#fcd34d' },

  { nombre: 'Docker', categoria: 'despliegue', color: '#2496ed' },
  { nombre: 'Caddy', categoria: 'despliegue', color: '#22d3ee' },
  { nombre: 'Linux', categoria: 'despliegue', color: '#fde047' },
  { nombre: 'GitHub Actions', categoria: 'despliegue', icono: 'images/github.webp', adaptable: true },
  { nombre: 'Cloudflare', categoria: 'despliegue', color: '#f38020' },
  { nombre: 'Git', categoria: 'despliegue', color: '#f05032' },
]

export const categoriasTecnologia = ['frontend', 'backend', 'ia', 'despliegue']

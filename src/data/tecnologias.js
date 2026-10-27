// Única lista de tecnologías del portafolio: todo lo usado de verdad en los proyectos y en su despliegue.
// La leen la sección "Stack tecnológico" y el contador de "Sobre mí".
// `categoria` es la clave de t.skills.categories; `icono` es un icono de Simple Icons (CC0) o uno propio.
// Dónde se usa cada una sale de `technologies` de cada proyecto; `tambien` añade lo que no está
// en esas listas: este portafolio ('portafolio') o el servidor de las demos (títulos de proyecto).
import {
  siCaddy, siCloudflare, siCss, siDocker, siFlask, siFramer, siGit, siGithubactions, siHtml5, siHuggingface,
  siJavascript, siLinux, siMysql, siOllama, siPhp, siPython, siReact, siTailwindcss, siVite,
} from './logos'
import { featuredProjects, otherProjects } from './projects'

// Iconos propios (24×24) para lo que no tiene logo de marca
const propio = (svg, hex) => ({ svg, hex })
const iconoCanvas = propio('<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>', 'F97316')
const iconoVoz = propio('<path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/>', '22C55E')
const iconoChroma = propio('<circle cx="8" cy="14" r="5.5" opacity=".75"/><circle cx="16" cy="14" r="5.5" opacity=".75"/><circle cx="12" cy="7.5" r="5.5" opacity=".75"/>', 'FF6446')

const SERVIDOR = ['Novacapital SAS', 'Moves Location']

export const tecnologias = [
  { nombre: 'HTML', categoria: 'frontend', icono: siHtml5 },
  { nombre: 'CSS', categoria: 'frontend', icono: siCss },
  { nombre: 'JavaScript', categoria: 'frontend', icono: siJavascript },
  { nombre: 'React', categoria: 'frontend', icono: siReact, tambien: ['portafolio'] },
  { nombre: 'Tailwind CSS', categoria: 'frontend', icono: siTailwindcss, tambien: ['portafolio'] },
  { nombre: 'Vite', categoria: 'frontend', icono: siVite, tambien: ['portafolio'] },
  { nombre: 'Framer Motion', categoria: 'frontend', icono: siFramer, tambien: ['portafolio'] },
  { nombre: 'Canvas', categoria: 'frontend', icono: iconoCanvas },
  { nombre: 'Web Speech API', categoria: 'frontend', icono: iconoVoz },

  { nombre: 'Python', categoria: 'backend', icono: siPython },
  { nombre: 'Flask', categoria: 'backend', icono: siFlask },
  { nombre: 'PHP', categoria: 'backend', icono: siPhp },
  { nombre: 'MySQL', categoria: 'backend', icono: siMysql },

  { nombre: 'Ollama', categoria: 'ia', icono: siOllama },
  { nombre: 'ChromaDB', categoria: 'ia', icono: iconoChroma },
  { nombre: 'Sentence Transformers', categoria: 'ia', icono: siHuggingface, tambien: ['Laboratorio de IA local'] },
  { nombre: 'Transformers.js', categoria: 'ia', icono: siHuggingface },

  { nombre: 'Docker', categoria: 'despliegue', icono: siDocker, tambien: SERVIDOR },
  { nombre: 'Caddy', categoria: 'despliegue', icono: siCaddy, tambien: SERVIDOR },
  { nombre: 'Linux', categoria: 'despliegue', icono: siLinux, tambien: SERVIDOR },
  { nombre: 'GitHub Actions', categoria: 'despliegue', icono: siGithubactions, tambien: ['portafolio'] },
  { nombre: 'Cloudflare', categoria: 'despliegue', icono: siCloudflare, tambien: ['portafolio'] },
  { nombre: 'Git', categoria: 'despliegue', icono: siGit, tambien: ['portafolio'] },
]

export const categoriasTecnologia = ['frontend', 'backend', 'ia', 'despliegue']

// Proyectos (y 'portafolio') donde se ha usado una tecnología, sin repetir
const todos = [...featuredProjects, ...otherProjects]
export function usosDe(tecnologia) {
  const enProyectos = todos.filter((p) => p.technologies.includes(tecnologia.nombre))
  const extra = (tecnologia.tambien ?? [])
    .map((titulo) => (titulo === 'portafolio' ? 'portafolio' : todos.find((p) => p.title === titulo)))
    .filter((p) => p && !enProyectos.includes(p))
  // Git: todos los proyectos con repositorio, además del portafolio
  if (tecnologia.nombre === 'Git') return [...todos.filter((p) => p.github), 'portafolio']
  return [...enProyectos, ...extra]
}

// Cinta con las tecnologías que separa la portada de la sección de proyectos.
// El contenido se duplica para que el desplazamiento en bucle no tenga saltos.
// Todo lo usado de verdad en los proyectos del portafolio y en su despliegue
const TECNOLOGIAS = [
  'Python', 'Flask', 'React', 'JavaScript', 'PHP', 'MySQL', 'Tailwind CSS', 'HTML', 'CSS', 'Vite', 'Framer Motion',
  'Ollama', 'ChromaDB', 'Sentence Transformers', 'Transformers.js', 'Canvas', 'Web Speech API',
  'Docker', 'Caddy', 'Linux', 'GitHub Actions', 'Cloudflare', 'Git',
]

function Grupo({ oculto }) {
  return (
    <ul className="flex shrink-0" aria-hidden={oculto || undefined}>
      {TECNOLOGIAS.map((tecnologia, i) => (
        <li key={i} className="font-bebas text-3xl md:text-4xl tracking-wide text-white/70 px-5 flex items-center gap-10">
          {tecnologia}
          <span className="text-lg text-[#e63946]" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  )
}

export default function CintaTecnologias() {
  return (
    <div
      className="cinta relative z-20 -mt-8 bg-[var(--bg-card)] border-y border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] overflow-hidden"
      aria-label="Tecnologías"
    >
      <div className="cinta-pista flex whitespace-nowrap py-3">
        <Grupo />
        <Grupo oculto />
      </div>
    </div>
  )
}

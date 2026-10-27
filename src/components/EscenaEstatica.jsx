import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { img } from '../utils/img'
import { useParallax } from '../hooks/useParallax'

// DEMO C: la habitación como imagen fija (render de la escena 3D), sin Three.js.
// Se inclina hacia el ratón, se desplaza con el scroll y la lámpara "respira" con un brillo en CSS.
export default function EscenaEstatica({ tema, quieto }) {
  const noche = tema === 'dark'
  const caja = useRef(null)
  const y = useParallax(caja, -40)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(useTransform(rx, (v) => v * -6), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(ry, (v) => v * 8), { stiffness: 120, damping: 18 })

  useEffect(() => {
    if (quieto) return
    const mover = (e) => {
      const r = caja.current?.getBoundingClientRect()
      if (!r) return
      ry.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))))
      rx.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))))
    }
    window.addEventListener('pointermove', mover)
    return () => window.removeEventListener('pointermove', mover)
  }, [quieto, rx, ry])

  return (
    <div ref={caja} className="absolute inset-0" style={{ perspective: 900 }}>
      <motion.div style={{ y, rotateX, rotateY }} className="relative w-full h-full">
        <img
          src={img(noche ? 'images/escena-noche.webp' : 'images/escena-dia.webp')}
          alt="Habitación con mi escritorio, en ilustración 3D"
          width="1344"
          height="1344"
          className="w-full h-full object-contain select-none"
          draggable="false"
        />
        {noche && (
          <span
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none mix-blend-screen animate-[respirar_4s_ease-in-out_infinite]"
            style={{ left: '55%', top: '24%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(255,174,92,0.35), transparent 65%)' }}
          />
        )}
      </motion.div>
    </div>
  )
}

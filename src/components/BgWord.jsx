import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useParallax } from '../hooks/useParallax'

// Palabra gigante y casi transparente detrás del título de una sección.
// Se desplaza en horizontal con el scroll; `direction` (1 o -1) alterna el sentido.
export default function BgWord({ word, direction = 1 }) {
  const ref = useRef(null)
  const x = useParallax(ref, 120 * direction)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-x-0 top-6 overflow-hidden pointer-events-none select-none"
    >
      <motion.div
        style={{ x }}
        className="font-bebas leading-none text-center whitespace-nowrap text-[6rem] md:text-[11rem] text-white/[0.035]"
      >
        {word}
      </motion.div>
    </div>
  )
}

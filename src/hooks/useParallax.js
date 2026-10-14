import { useScroll, useTransform, useReducedMotion } from 'framer-motion'

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

// Desplazamiento vertical ligado al scroll mientras `ref` cruza la pantalla.
// Va de -distance a +distance (px); a la mitad en móvil y a 0 con movimiento reducido.
export function useParallax(ref, distance) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const d = reduce ? 0 : isMobile() ? distance / 2 : distance
  return useTransform(scrollYProgress, [0, 1], [-d, d])
}

import { useScroll, useTransform, useReducedMotion } from 'framer-motion'

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

// Desplazamiento ligado al scroll mientras `ref` cruza la pantalla.
// Va de -distance a +distance (px); a la mitad en móvil y a 0 con movimiento reducido.
// Con `settle`, va de distance a 0 y se queda en 0 cuando el elemento llega al centro de la pantalla.
export function useParallax(ref, distance, { settle = false } = {}) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: settle ? ['start end', 'center center'] : ['start end', 'end start'],
  })
  const d = reduce ? 0 : isMobile() ? distance / 2 : distance
  return useTransform(scrollYProgress, [0, 1], settle ? [d, 0] : [-d, d])
}

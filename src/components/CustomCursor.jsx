import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Solo en dispositivos con mouse
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let frame

    document.body.style.cursor = 'none'

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(animate)
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea')) {
        dot.style.transform += ' scale(0)'
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = '#e63946'
        ring.style.backgroundColor = 'rgba(230,57,70,0.08)'
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea')) {
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'rgba(255,255,255,0.3)'
        ring.style.backgroundColor = 'transparent'
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    frame = requestAnimationFrame(animate)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      {/* Dot principal */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#e63946] rounded-full pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      />
      {/* Ring con lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-[width,height,border-color,background-color] duration-200"
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgba(255,255,255,0.3)',
          willChange: 'transform',
        }}
      />
    </>
  )
}

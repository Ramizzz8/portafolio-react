// TEMPORAL (rama "rediseno"): permite comparar fuentes en beta.andresrami.com.
// ?texto=… cambia la fuente del texto y ?titulos=… la de los títulos; en beta o en local
// aparece un selector abajo a la izquierda. Se elimina cuando se elijan las fuentes.
const TEXTO = {
  actual: { nombre: 'Arial (actual)' },
  plex: { nombre: 'IBM Plex Sans', familia: 'IBM Plex Sans', pesos: '400;500;600;700' },
}
const TITULOS = {
  actual: { nombre: 'Bebas Neue (actual)' },
  tanker: { nombre: 'Tanker', familia: 'Tanker', fontshare: 'tanker@400', peso: 400 },
  contour: { nombre: 'Contour Generator', familia: 'Contour Generator', archivo: 'contour-generator', peso: 400 },
  technor: { nombre: 'Technor', familia: 'Technor', fontshare: 'technor@700', peso: 700 },
  tektur: { nombre: 'Tektur', familia: 'Tektur', pesos: '700', peso: 700 },
  turret: { nombre: 'Turret Road', familia: 'Turret Road', pesos: '800', peso: 800 },
  array: { nombre: 'Array', familia: 'Array', fontshare: 'array@600', peso: 600 },
  doto: { nombre: 'Doto', familia: 'Doto', pesos: '900', peso: 900 },
  majormono: { nombre: 'Major Mono Display', familia: 'Major Mono Display', pesos: '400', peso: 400 },
  michroma: { nombre: 'Michroma', familia: 'Michroma', pesos: '400', peso: 400 },
  panchang: { nombre: 'Panchang', familia: 'Panchang', fontshare: 'panchang@700', peso: 700 },
}

function cargar(fuente) {
  // Fuentes descargadas de dafont: se sirven desde /fuentes-prueba
  if (fuente.archivo) {
    const cara = new FontFace(fuente.familia, `url(/fuentes-prueba/${fuente.archivo}.woff2)`)
    document.fonts.add(cara)
    return cara.load().catch(() => {})
  }
  const enlace = document.createElement('link')
  enlace.rel = 'stylesheet'
  enlace.href = fuente.fontshare
    ? `https://api.fontshare.com/v2/css?f[]=${fuente.fontshare}&display=swap`
    : `https://fonts.googleapis.com/css2?family=${fuente.familia.replaceAll(' ', '+')}:wght@${fuente.pesos}&display=swap`
  document.head.appendChild(enlace)
  return new Promise((listo) => { enlace.onload = listo; enlace.onerror = listo })
}

// Ajusta el nombre de la portada para que ocupe el mismo ancho que con Bebas Neue
async function igualarAnchoNombre(fuente) {
  const muestra = 'RAMÍREZ'
  await Promise.all([
    document.fonts.load('100px "Bebas Neue"', muestra),
    document.fonts.load(`${fuente.peso} 100px "${fuente.familia}"`, muestra),
  ])
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = '100px "Bebas Neue"'
  const referencia = ctx.measureText(muestra).width
  ctx.font = `${fuente.peso} 100px "${fuente.familia}"`
  const ancho = ctx.measureText(fuente.sinMayusculas ? 'Ramírez' : muestra).width
  if (ancho > 0) document.documentElement.style.setProperty('--escala-nombre', (referencia / ancho).toFixed(3))
}

export function prepararPruebaFuentes() {
  const host = window.location.hostname
  if (!host.startsWith('beta.') && host !== 'localhost') return

  const parametros = new URLSearchParams(window.location.search)
  const claveTexto = TEXTO[parametros.get('texto')] ? parametros.get('texto') : 'plex'
  const claveTitulos = TITULOS[parametros.get('titulos')] ? parametros.get('titulos') : 'actual'
  const raiz = document.documentElement.style

  const texto = TEXTO[claveTexto]
  if (texto.familia) {
    cargar(texto)
    raiz.setProperty('--fuente-texto', `'${texto.familia}', Arial, sans-serif`)
  }
  const titulos = TITULOS[claveTitulos]
  if (titulos.familia) {
    const hojaCargada = cargar(titulos)
    raiz.setProperty('--fuente-titulos', `'${titulos.familia}'`)
    raiz.setProperty('--peso-titulos', titulos.peso)
    if (!titulos.sinMayusculas) raiz.setProperty('--mayusculas-titulos', 'uppercase')
    hojaCargada.then(() => igualarAnchoNombre(titulos))
  }

  const enlace = (texto, titulos) => `?texto=${texto}&titulos=${titulos}`
  const panel = document.createElement('nav')
  panel.setAttribute('aria-label', 'Probar fuentes')
  panel.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:9999;display:grid;gap:6px;padding:8px;background:#000d;border-radius:10px;font:600 12px/1 system-ui,sans-serif;max-width:calc(100vw - 32px)'
  const fila = (titulo, opciones, activa, href) => {
    const f = document.createElement('div')
    f.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;align-items:center;color:#fff9'
    f.append(titulo)
    for (const [id, o] of Object.entries(opciones)) {
      const a = document.createElement('a')
      a.href = href(id)
      a.textContent = o.nombre
      a.style.cssText = `padding:7px 9px;border-radius:6px;text-decoration:none;color:#fff;background:${id === activa ? '#e63946' : '#ffffff1a'}`
      f.appendChild(a)
    }
    return f
  }
  panel.append(
    fila('Títulos', TITULOS, claveTitulos, (id) => enlace(claveTexto, id)),
    fila('Texto', TEXTO, claveTexto, (id) => enlace(id, claveTitulos)),
  )
  if (document.readyState !== 'loading') document.body.appendChild(panel)
  else document.addEventListener('DOMContentLoaded', () => document.body.appendChild(panel))
}

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { img } from '../utils/img'

// Habitación isométrica con mi puesto de trabajo.
// Modelos: Furniture Kit de Kenney (www.kenney.nl, licencia CC0). La habitación, la luz y la interacción son propias.

const MODELOS = 'modelos/escritorio/'

// Lo que se ve en el monitor: las vistas previas de los proyectos, una tras otra
const PANTALLA = [
  { src: 'videos/novacapital-previa.mp4', nombre: 'Novacapital SAS' },
  { src: 'videos/camaron-previa.mp4', nombre: 'Camarón Viviendas' },
  { src: 'videos/laboratorio-ia-previa.mp4', nombre: 'Laboratorio de IA local' },
  { src: 'videos/brujula-previa.mp4', nombre: 'Brújula de temas' },
]

// Colores por material de Kenney, de noche (tema oscuro) y de día (tema claro)
const PALETAS = {
  dark: {
    pared: { wood: '#1c2541', _defaultMat: '#2a3358', metalDark: '#141a2e' },
    suelo: { wood: '#5a3d2b' },
    madera: { wood: '#8a5a3b', woodDark: '#5e3b26' },
    textil: { carpet: '#e63946', carpetDarker: '#8f222c', carpetWhite: '#d9d4cc' },
    metal: { metal: '#b8c0c8', metalMedium: '#4a5363', metalDark: '#22262f' },
    planta: { plant: '#3fa36f' },
    alfombra: { carpet: '#1f2436', carpetDarker: '#e63946' },
  },
  light: {
    pared: { wood: '#e8e2d8', _defaultMat: '#f4f0e8', metalDark: '#c9c1b4' },
    suelo: { wood: '#b78a62' },
    madera: { wood: '#c99467', woodDark: '#9a6b47' },
    textil: { carpet: '#e63946', carpetDarker: '#b92f3a', carpetWhite: '#ffffff' },
    metal: { metal: '#d6dce0', metalMedium: '#6b7584', metalDark: '#2d323c' },
    planta: { plant: '#46b47c' },
    alfombra: { carpet: '#d9d2c5', carpetDarker: '#e63946' },
  },
}

function Modelo({ nombre, colores, emisivos, alPulsar, alEntrar, alSalir, ...props }) {
  const { scene } = useGLTF(img(`${MODELOS}${nombre}.glb`))
  // Copia propia con materiales propios, para recolorear sin tocar la caché de useGLTF
  const copia = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true
      o.material = o.material.clone()
      o.material.metalness = 0
      o.material.roughness = o.material.name.startsWith('metal') ? 0.45 : 0.8
    })
    return c
  }, [scene])

  useEffect(() => {
    copia.traverse((o) => {
      if (!o.isMesh) return
      const m = o.material
      if (colores?.[m.name]) m.color.set(colores[m.name])
      const brillo = emisivos?.[m.name]
      m.emissive.set(brillo ? brillo.color : '#000000')
      m.emissiveIntensity = brillo ? brillo.intensidad : 0
    })
  }, [copia, colores, emisivos])

  const interactivo = Boolean(alPulsar)
  return (
    <primitive
      object={copia}
      {...props}
      onClick={interactivo ? (e) => { e.stopPropagation(); alPulsar() } : undefined}
      onPointerOver={interactivo ? (e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; alEntrar?.() } : undefined}
      onPointerOut={interactivo ? () => { document.body.style.cursor = ''; alSalir?.() } : undefined}
    />
  )
}

// Vídeo del monitor: recorre las vistas previas en bucle y solo se reproduce mientras se ve
function usePantalla(activa) {
  const [indice, setIndice] = useState(0)
  const video = useMemo(() => {
    const v = document.createElement('video')
    v.muted = true
    v.playsInline = true
    v.crossOrigin = 'anonymous'
    v.preload = 'auto'
    return v
  }, [])
  const textura = useMemo(() => {
    const t = new THREE.VideoTexture(video)
    t.colorSpace = THREE.SRGBColorSpace
    // La pantalla es algo más estrecha que 16:9: se recorta un poco por los lados
    t.repeat.set(0.923, 1)
    t.offset.set(0.0385, 0)
    return t
  }, [video])

  useEffect(() => {
    video.src = img(PANTALLA[indice].src)
    const siguiente = () => setIndice((i) => (i + 1) % PANTALLA.length)
    video.addEventListener('ended', siguiente)
    return () => video.removeEventListener('ended', siguiente)
  }, [video, indice])

  useEffect(() => {
    if (activa) video.play().catch(() => {})
    else video.pause()
  }, [video, activa, indice])

  useEffect(() => () => { video.pause(); video.removeAttribute('src'); textura.dispose() }, [video, textura])

  return { textura, proyecto: PANTALLA[indice].nombre }
}

// Guirnalda de luces colgando de lo alto de las paredes
function Guirnalda({ desde, hasta, n = 18, caida = 0.12, encendida }) {
  const puntos = useMemo(() => {
    const a = new THREE.Vector3(...desde)
    const b = new THREE.Vector3(...hasta)
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1)
      const p = a.clone().lerp(b, t)
      p.y -= Math.sin(t * Math.PI) * caida
      return p
    })
  }, [desde, hasta, n, caida])
  // Como primitive: en JSX, <line> choca con la etiqueta SVG del mismo nombre
  const cable = useMemo(
    () => new THREE.Line(new THREE.BufferGeometry().setFromPoints(puntos), new THREE.LineBasicMaterial({ color: '#3a3a3a' })),
    [puntos],
  )
  return (
    <group>
      <primitive object={cable} />
      {puntos.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color="#ffd9a0" emissive="#ffb347" emissiveIntensity={encendida ? 3 : 0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Cámara ortográfica en vista isométrica, con el zoom ajustado al ancho disponible
function Camara() {
  const { camera, size } = useThree()
  useEffect(() => {
    camera.zoom = Math.min(size.width / 3.05, size.height / 2.75)
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Habitacion({ tema, onToggleTheme, activa, quieto, textos }) {
  const p = PALETAS[tema]
  const noche = tema === 'dark'
  const grupo = useRef()
  const [aviso, setAviso] = useState(null)
  const { textura, proyecto } = usePantalla(activa)

  // La habitación se inclina un poco hacia el ratón
  useFrame((state, delta) => {
    if (!grupo.current || quieto) return
    const objetivoY = state.pointer.x * 0.12
    const objetivoX = -state.pointer.y * 0.05
    grupo.current.rotation.y = THREE.MathUtils.damp(grupo.current.rotation.y, objetivoY, 4, delta)
    grupo.current.rotation.x = THREE.MathUtils.damp(grupo.current.rotation.x, objetivoX, 4, delta)
  })

  const lampara = noche ? { lamp: { color: '#ffb35c', intensidad: 2.2 } } : null
  const irAProyectos = () => document.getElementById('trabajos')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <ambientLight intensity={noche ? 0.55 : 1.4} color={noche ? '#5b6fc0' : '#ffffff'} />
      <hemisphereLight args={[noche ? '#3d4f9c' : '#ffffff', noche ? '#120c08' : '#c8b69c', noche ? 0.5 : 0.8]} />
      {/* Luna o sol entrando por las ventanas */}
      <directionalLight
        position={[4, 6, 3]}
        intensity={noche ? 0.35 : 2.2}
        color={noche ? '#8fa8ff' : '#fff1d6'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      <group ref={grupo} position={[-1, 0, 1]}>
        {/* Lámpara de la mesa y brillo del monitor */}
        {noche && <pointLight position={[1.0, 0.62, -1.62]} intensity={1.6} distance={2.6} decay={1.4} color="#ffae5c" castShadow shadow-mapSize={[512, 512]} />}
        <pointLight position={[0.72, 0.6, -1.45]} intensity={noche ? 0.9 : 0.2} distance={1.6} decay={1.5} color="#7fb2ff" />
        {/* Suelo y paredes */}
        {[0, 1].flatMap((x) => [0, 1].map((z) => (
          <Modelo key={`${x}${z}`} nombre="floorFull" colores={p.suelo} position={[x, -0.05, -z]} />
        )))}
        <Modelo nombre="wallWindow" colores={p.pared} position={[1, 0, -1.93]} />
        <Modelo nombre="wall" colores={p.pared} position={[0, 0, -1.93]} />
        <Modelo nombre="wall" colores={p.pared} position={[0, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
        <Modelo nombre="wallWindow" colores={p.pared} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

        <Guirnalda desde={[0.08, 1.22, -1.86]} hasta={[1.95, 1.22, -1.86]} encendida={noche} />
        <Guirnalda desde={[0.08, 1.22, -1.86]} hasta={[0.08, 1.22, -0.05]} encendida={noche} />

        <Modelo nombre="rugRectangle" colores={p.alfombra} position={[0.4, 0, -0.25]} />

        {/* Escritorio */}
        <Modelo nombre="desk" colores={p.madera} position={[0.42, 0, -1.53]} />
        <Modelo nombre="speakerSmall" colores={{ ...p.madera, ...p.metal }} position={[0.44, 0.384, -1.75]} />
        <group position={[0.6, 0.384, -1.75]}>
          <Modelo
            nombre="computerScreen"
            colores={p.metal}
            alPulsar={irAProyectos}
            alEntrar={() => setAviso('monitor')}
            alSalir={() => setAviso(null)}
          />
          <mesh position={[0.1965, 0.1715, -0.029]} onClick={(e) => { e.stopPropagation(); irAProyectos() }}>
            <planeGeometry args={[0.379, 0.231]} />
            <meshBasicMaterial map={textura} toneMapped={false} />
          </mesh>
          {aviso === 'monitor' && (
            <Html position={[0.1965, 0.36, 0]} center className="pointer-events-none">
              <span className="aviso-3d">{proyecto} · {textos.monitor}</span>
            </Html>
          )}
        </group>
        <Modelo nombre="computerKeyboard" colores={p.metal} position={[0.66, 0.384, -1.585]} />
        <Modelo nombre="computerMouse" colores={p.metal} position={[1.0, 0.384, -1.62]} />
        <group position={[1.02, 0.384, -1.72]}>
          <Modelo
            nombre="lampSquareTable"
            colores={p.metal}
            emisivos={lampara}
            alPulsar={onToggleTheme}
            alEntrar={() => setAviso('lampara')}
            alSalir={() => setAviso(null)}
          />
          {aviso === 'lampara' && (
            <Html position={[0.06, 0.42, 0]} center className="pointer-events-none">
              <span className="aviso-3d">{noche ? textos.apagar : textos.encender}</span>
            </Html>
          )}
        </group>
        <Modelo nombre="chairDesk" colores={{ ...p.textil, ...p.metal }} position={[0.95, 0, -1.08]} rotation={[0, Math.PI, 0]} />

        {/* Estantería y plantas */}
        <Modelo nombre="bookcaseOpen" colores={p.madera} position={[0.3, 0, -0.75]} rotation={[0, Math.PI / 2, 0]} />
        <Modelo nombre="books" colores={{ ...p.textil, ...p.planta, ...p.metal }} position={[0.27, 0.88, -1.0]} rotation={[0, Math.PI / 2, 0]} />
        <Modelo nombre="plantSmall1" colores={{ ...p.madera, ...p.planta }} position={[0.17, 0.88, -0.78]} />
        <Modelo nombre="pottedPlant" colores={{ ...p.madera, ...p.planta }} position={[1.72, 0, -1.6]} />
      </group>
    </>
  )
}

export default function Escritorio3D({ tema, onToggleTheme, activa, quieto, textos }) {
  return (
    <Canvas
      orthographic
      shadows={{ type: THREE.PCFShadowMap }}
      gl={{ alpha: true }}
      dpr={[1, 2]}
      frameloop={activa ? 'always' : 'never'}
      camera={{ position: [6, 5.2, 6], near: 0.1, far: 50 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.45, 0)}
      aria-label={textos.descripcion}
      role="img"
    >
      <Camara />
      <Suspense fallback={null}>
        <Habitacion tema={tema} onToggleTheme={onToggleTheme} activa={activa} quieto={quieto} textos={textos} />
      </Suspense>
    </Canvas>
  )
}

;['desk', 'chairDesk', 'computerScreen', 'computerKeyboard', 'computerMouse', 'lampSquareTable', 'bookcaseOpen', 'pottedPlant', 'plantSmall1', 'rugRectangle', 'speakerSmall', 'wall', 'wallWindow', 'books', 'floorFull']
  .forEach((n) => useGLTF.preload(img(`${MODELOS}${n}.glb`)))

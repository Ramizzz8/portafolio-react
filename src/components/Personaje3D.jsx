import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Html, RoundedBox } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Robot propio hecho con piezas básicas: mira al cursor, parpadea, flota y saluda al pulsarlo.
// Sin usar por ahora: reservado para un futuro asistente de IA que responda preguntas sobre mí.

const BLANCO = { color: '#f4f6fa', roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.15 }
const ROJO = '#e63946'
const OJOS = '#5ad7ff'

// Posición del ratón en toda la página, relativa al centro del lienzo (-1..1 aprox.)
function useRatonGlobal() {
  const { gl } = useThree()
  const raton = useRef(new THREE.Vector2())
  useEffect(() => {
    const mover = (e) => {
      const r = gl.domElement.getBoundingClientRect()
      raton.current.set(
        THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1),
        THREE.MathUtils.clamp((e.clientY - (r.top + r.height * 0.3)) / r.height, -1, 1),
      )
    }
    window.addEventListener('pointermove', mover)
    return () => window.removeEventListener('pointermove', mover)
  }, [gl])
  return raton
}

function Ojo({ x, refOjo }) {
  return (
    <mesh ref={refOjo} position={[x, 0.02, 0.475]}>
      <capsuleGeometry args={[0.07, 0.1, 8, 16]} />
      <meshBasicMaterial color={OJOS} toneMapped={false} />
    </mesh>
  )
}

function Robot({ quieto }) {
  const raton = useRatonGlobal()
  const raiz = useRef()
  const cuerpo = useRef()
  const cabeza = useRef()
  const brazo = useRef()
  const ojoI = useRef()
  const ojoD = useRef()
  const pecho = useRef()
  const [encima, setEncima] = useState(false)
  const saludo = useRef(-10)
  const [hola, setHola] = useState(false)
  const parpadeo = useRef({ siguiente: 2, fin: 0 })

  const saludar = (e) => {
    e.stopPropagation()
    saludo.current = performance.now() / 1000
    setHola(true)
    setTimeout(() => setHola(false), 2200)
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const ahora = performance.now() / 1000
    const enSaludo = ahora - saludo.current
    const mx = quieto ? 0 : raton.current.x
    const my = quieto ? 0 : raton.current.y

    // Flotar y pequeño salto al saludar
    const salto = enSaludo < 0.5 ? Math.sin((enSaludo / 0.5) * Math.PI) * 0.25 : 0
    raiz.current.position.y = (quieto ? 0 : Math.sin(t * 1.6) * 0.05) + salto

    // La cabeza sigue al cursor y el cuerpo la acompaña un poco
    cabeza.current.rotation.y = THREE.MathUtils.damp(cabeza.current.rotation.y, mx * 0.6, 6, delta)
    cabeza.current.rotation.x = THREE.MathUtils.damp(cabeza.current.rotation.x, my * 0.35, 6, delta)
    cuerpo.current.rotation.y = THREE.MathUtils.damp(cuerpo.current.rotation.y, mx * 0.15, 4, delta)

    // Saludo con el brazo derecho durante 1,6 s
    const brazoZ = enSaludo < 1.6 ? 2.4 + Math.sin(enSaludo * 14) * 0.35 : 0.12
    brazo.current.rotation.z = THREE.MathUtils.damp(brazo.current.rotation.z, brazoZ, 10, delta)

    // Parpadeo cada pocos segundos; ojos "felices" (achatados) con el cursor encima
    const p = parpadeo.current
    if (t > p.siguiente) { p.fin = t + 0.12; p.siguiente = t + 2.5 + Math.random() * 3 }
    const alto = t < p.fin ? 0.1 : encima || enSaludo < 1.6 ? 0.45 : 1
    for (const ojo of [ojoI.current, ojoD.current]) ojo.scale.y = THREE.MathUtils.damp(ojo.scale.y, alto, 18, delta)

    pecho.current.emissiveIntensity = 1.5 + Math.sin(t * 2.5) * 0.8
  })

  return (
    <group ref={raiz}>
      <group
        ref={cuerpo}
        onClick={saludar}
        onPointerOver={(e) => { e.stopPropagation(); setEncima(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setEncima(false); document.body.style.cursor = '' }}
      >
        {/* Piernas */}
        {[-0.2, 0.2].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.32, 0]}>
              <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
              <meshPhysicalMaterial {...BLANCO} />
            </mesh>
            <RoundedBox args={[0.3, 0.16, 0.4]} radius={0.07} position={[0, 0.08, 0.05]}>
              <meshStandardMaterial color={ROJO} roughness={0.4} />
            </RoundedBox>
          </group>
        ))}

        {/* Cuerpo y luz del pecho */}
        <mesh position={[0, 0.88, 0]}>
          <capsuleGeometry args={[0.38, 0.32, 12, 24]} />
          <meshPhysicalMaterial {...BLANCO} />
        </mesh>
        <mesh position={[0, 0.92, 0.385]}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial ref={pecho} color={ROJO} emissive={ROJO} emissiveIntensity={1.5} toneMapped={false} />
        </mesh>

        {/* Brazos: el izquierdo cuelga, el derecho saluda */}
        <group position={[-0.47, 1.08, 0]} rotation={[0, 0, -0.12]}>
          <mesh position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.1, 0.32, 8, 16]} />
            <meshPhysicalMaterial {...BLANCO} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial color={ROJO} roughness={0.4} />
          </mesh>
        </group>
        <group ref={brazo} position={[0.47, 1.08, 0]} rotation={[0, 0, 0.12]}>
          <mesh position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.1, 0.32, 8, 16]} />
            <meshPhysicalMaterial {...BLANCO} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial color={ROJO} roughness={0.4} />
          </mesh>
        </group>

        {/* Cabeza: carcasa, visor oscuro, ojos, "orejas" y antena */}
        <group ref={cabeza} position={[0, 1.42, 0]}>
          <RoundedBox args={[1.1, 0.86, 0.9]} radius={0.3} smoothness={6} position={[0, 0.1, 0]}>
            <meshPhysicalMaterial {...BLANCO} />
          </RoundedBox>
          <group position={[0, 0.1, 0]}>
            <RoundedBox args={[0.9, 0.58, 0.12]} radius={0.05} smoothness={4} position={[0, 0, 0.4]}>
              <meshPhysicalMaterial color="#0b0d14" roughness={0.1} clearcoat={1} />
            </RoundedBox>
            <Ojo x={-0.19} refOjo={ojoI} />
            <Ojo x={0.19} refOjo={ojoD} />
            {[-0.57, 0.57].map((x) => (
              <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
                <meshStandardMaterial color={ROJO} roughness={0.4} />
              </mesh>
            ))}
          </group>
          <mesh position={[0, 0.66, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 12]} />
            <meshStandardMaterial color="#b8c0c8" />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.06, 20, 20]} />
            <meshStandardMaterial color={ROJO} emissive={ROJO} emissiveIntensity={2} toneMapped={false} />
          </mesh>
          {hola && (
            <Html position={[0, 1.0, 0]} center className="pointer-events-none">
              <span className="aviso-3d">¡Hola! Soy el ayudante de Andrés</span>
            </Html>
          )}
        </group>
      </group>
    </group>
  )
}

export default function Personaje3D({ tema, activa, quieto }) {
  const noche = tema === 'dark'
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={activa ? 'always' : 'never'}
      camera={{ position: [0, 1.35, 4.9], fov: 32 }}
      onCreated={({ camera }) => camera.lookAt(0, 1.2, 0)}
      gl={{ alpha: true }}
      aria-label="Robot en 3D que sigue el cursor y saluda al pulsarlo"
      role="img"
    >
      <ambientLight intensity={noche ? 0.5 : 0.9} />
      <directionalLight position={[2, 4, 5]} intensity={noche ? 1.6 : 2.2} />
      {/* Luces de contorno: azul y roja, como los brillos de la web */}
      <pointLight position={[-2.5, 2, -1.5]} intensity={noche ? 6 : 3} color="#3a86ff" />
      <pointLight position={[2.5, 1, -1.5]} intensity={noche ? 5 : 2} color={ROJO} />
      <Robot quieto={quieto} />
      <ContactShadows position={[0, -0.01, 0]} opacity={noche ? 0.6 : 0.35} scale={3} blur={2.4} far={1.5} />
    </Canvas>
  )
}

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getPulses, removePulseById, flashOrb } from '../../state/pulses'

const POOL_SIZE = 24
const PULSE_RADIUS = 0.05

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export default function LinePulses() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(POOL_SIZE).fill(null))
  const matRefs = useRef<(THREE.MeshBasicMaterial | null)[]>(
    Array(POOL_SIZE).fill(null),
  )

  useFrame(() => {
    const now = performance.now()
    const pulses = getPulses()

    for (let i = 0; i < POOL_SIZE; i++) {
      const mesh = meshRefs.current[i]
      const mat = matRefs.current[i]
      if (mesh) mesh.visible = false
      if (mat) mat.opacity = 0
    }

    const expired: number[] = []
    const visible = Math.min(pulses.length, POOL_SIZE)
    for (let i = 0; i < visible; i++) {
      const p = pulses[i]
      const t = (now - p.startMs) / p.durationMs
      if (t >= 1) {
        flashOrb(p.toIndex)
        expired.push(p.id)
        continue
      }

      const mesh = meshRefs.current[i]
      const mat = matRefs.current[i]
      if (!mesh || !mat) continue

      mesh.position.lerpVectors(p.from, p.to, easeInOut(t))
      mesh.visible = true

      const intensity = Math.sin(t * Math.PI)
      mat.color.set(p.color)
      mat.opacity = intensity
      mesh.scale.setScalar(0.6 + intensity * 0.9)
    }

    for (const id of expired) removePulseById(id)
  })

  return (
    <group>
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el
          }}
          visible={false}
        >
          <sphereGeometry args={[PULSE_RADIUS, 12, 12]} />
          <meshBasicMaterial
            ref={(el) => {
              matRefs.current[i] = el
            }}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 50

const POSITIONS = (() => {
  const arr = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 16
    arr[i * 3 + 1] = (Math.random() - 0.5) * 10
    arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
  }
  return arr
})()

const SPEEDS = Array.from({ length: COUNT }, () => ({
  x: (Math.random() - 0.5) * 0.002,
  y: (Math.random() - 0.5) * 0.002,
  z: (Math.random() - 0.5) * 0.001,
}))

interface Props {
  reducedMotion: boolean
}

export default function Particles({ reducedMotion }: Props) {
  const meshRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return
    const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += SPEEDS[i].x
      arr[i * 3 + 1] += SPEEDS[i].y
      arr[i * 3 + 2] += SPEEDS[i].z
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c4b5fd"
        transparent
        opacity={0.55}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  )
}

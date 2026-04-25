import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 600
const RADIUS_MIN = 22
const RADIUS_MAX = 32
const TARGET_OPACITY = 0.55
const FADE_DURATION = 600

const POSITIONS = (() => {
  const arr = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = RADIUS_MIN + Math.random() * (RADIUS_MAX - RADIUS_MIN)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
})()

interface Props {
  reducedMotion: boolean
}

export default function StarField({ reducedMotion }: Props) {
  const matRef = useRef<THREE.PointsMaterial>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = performance.now()
  }, [])

  useFrame(() => {
    if (!matRef.current) return
    if (reducedMotion) {
      matRef.current.opacity = TARGET_OPACITY
      return
    }
    if (startRef.current === null) {
      matRef.current.opacity = 0
      return
    }
    const t = (performance.now() - startRef.current) / FADE_DURATION
    matRef.current.opacity = Math.min(1, Math.max(0, t)) * TARGET_OPACITY
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.05}
        color="#e8e0ff"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

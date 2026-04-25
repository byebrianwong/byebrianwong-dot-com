import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import apps from '../../data/apps'

const TARGET_OPACITY = 0.18
const ENTRANCE_DELAY = 1200
const ENTRANCE_DURATION = 600
const BREATHE_HZ = 0.6

// Lines connect orb-to-orb (orb sits 0.5 units above each card's anchor).
const ORB_Y_OFFSET = 0.5

const POSITIONS = (() => {
  const arr: number[] = []
  for (let i = 0; i < apps.length; i++) {
    const a = apps[i].position
    const b = apps[(i + 1) % apps.length].position
    arr.push(a[0], a[1] + ORB_Y_OFFSET, a[2])
    arr.push(b[0], b[1] + ORB_Y_OFFSET, b[2])
  }
  return new Float32Array(arr)
})()

interface Props {
  reducedMotion: boolean
}

export default function ConstellationLines({ reducedMotion }: Props) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = performance.now()
  }, [])

  useFrame((state) => {
    if (!matRef.current) return
    if (startRef.current === null) {
      matRef.current.opacity = 0
      return
    }
    const elapsed = performance.now() - startRef.current
    const progress = Math.min(
      1,
      Math.max(0, (elapsed - ENTRANCE_DELAY) / ENTRANCE_DURATION),
    )
    if (reducedMotion) {
      matRef.current.opacity = progress * TARGET_OPACITY
      return
    }
    const breathe = 0.78 + 0.22 * Math.sin(state.clock.elapsedTime * BREATHE_HZ)
    matRef.current.opacity = progress * TARGET_OPACITY * breathe
  })

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={matRef}
        color="#c4b5fd"
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  )
}

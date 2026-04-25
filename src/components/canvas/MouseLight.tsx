import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '../../hooks/useMousePosition'

const TRAIL_LENGTH = 10
const LIGHT_DEPTH = 4
const LERP_SPEED = 0.16

export default function MouseLight() {
  const mouse = useMousePosition()
  const lightRef = useRef<THREE.PointLight>(null)
  const { camera } = useThree()

  // Trail spheres
  const trailRefs = useRef<(THREE.Mesh | null)[]>([])
  const trailPositions = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3(0, 0, LIGHT_DEPTH))
  )

  // Temp vectors
  const raycaster = useRef(new THREE.Raycaster())
  const targetPos = useRef(new THREE.Vector3())
  const smoothPos = useRef(new THREE.Vector3(0, 0, LIGHT_DEPTH))

  useFrame(() => {
    // Raycast mouse into 3D space
    raycaster.current.setFromCamera(mouse.current.ndc, camera)
    const dir = raycaster.current.ray.direction
    const origin = raycaster.current.ray.origin
    const t = (LIGHT_DEPTH - origin.z) / dir.z
    targetPos.current.copy(origin).addScaledVector(dir, Math.abs(t))

    // Smooth follow
    smoothPos.current.lerp(targetPos.current, LERP_SPEED)

    // Update light
    if (lightRef.current) {
      lightRef.current.position.copy(smoothPos.current)
    }

    // Shift trail positions
    for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
      trailPositions.current[i].lerp(trailPositions.current[i - 1], 0.3)
    }
    trailPositions.current[0].copy(smoothPos.current)

    // Update trail meshes
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const mesh = trailRefs.current[i]
      if (mesh) {
        mesh.position.copy(trailPositions.current[i])
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = (1 - i / TRAIL_LENGTH) * 0.5
      }
    }
  })

  return (
    <>
      <pointLight
        ref={lightRef}
        color="#c4b5fd"
        intensity={8}
        distance={12}
        decay={2}
      />
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
        >
          <sphereGeometry args={[0.012 + (1 - i / TRAIL_LENGTH) * 0.02, 4, 4]} />
          <meshBasicMaterial
            color="#c4b5fd"
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  )
}

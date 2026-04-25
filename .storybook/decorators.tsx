import type { ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

interface CanvasStageProps {
  children: ReactNode
  /** Camera Z. Defaults to 8 (matches production). */
  cameraZ?: number
  /** Add Bloom post-process pass (matches production). Defaults to true. */
  bloom?: boolean
  /** Height for the canvas stage. Defaults to 100vh. */
  height?: string | number
}

/**
 * CanvasStage wraps R3F components in a Canvas with the production camera
 * and lights so 3D stories render as they would in the real app.
 */
export function CanvasStage({
  children,
  cameraZ = 8,
  bloom = true,
  height = '100vh',
}: CanvasStageProps) {
  return (
    <div className="sb-canvas-stage" style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#e8e0ff"
        />
        {children}
        {bloom && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.85}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}

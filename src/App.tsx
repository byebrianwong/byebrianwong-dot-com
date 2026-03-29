import { Canvas } from '@react-three/fiber'
import Scene from './components/canvas/Scene'
import Bio from './components/overlay/Bio'
import CustomCursor from './components/overlay/CustomCursor'

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <Scene />
      </Canvas>

      {/* HTML overlay */}
      <Bio />
      <CustomCursor />
    </>
  )
}

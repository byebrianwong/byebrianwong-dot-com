import { EffectComposer, Bloom } from '@react-three/postprocessing'
import FloatingCard from './FloatingCard'
import MouseLight from './MouseLight'
import Particles from './Particles'
import apps from '../../data/apps'

export default function Scene() {
  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={0.15} />

      {/* Key light from above-right */}
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#e8e0ff" />

      {/* Mouse-following light + trail */}
      <MouseLight />

      {/* App cards */}
      {apps.map((app) => (
        <FloatingCard key={app.name} app={app} />
      ))}

      {/* Ambient particles */}
      <Particles />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

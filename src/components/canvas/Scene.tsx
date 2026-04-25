import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import FloatingCard from './FloatingCard'
import MouseLight from './MouseLight'
import Particles from './Particles'
import StarField from './StarField'
import ConstellationLines from './ConstellationLines'
import LinePulses from './LinePulses'
import apps from '../../data/apps'
import { useMousePosition } from '../../hooks/useMousePosition'

const PARALLAX_X = 0.35
const PARALLAX_Y = 0.22
const PARALLAX_LERP = 0.08

interface Props {
  reducedMotion: boolean
  isMobile: boolean
}

export default function Scene({ reducedMotion, isMobile }: Props) {
  const mouse = useMousePosition()
  const { camera } = useThree()
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (reducedMotion || isMobile) return
    const targetX = mouse.current.ndc.x * PARALLAX_X
    const targetY = mouse.current.ndc.y * PARALLAX_Y
    /* eslint-disable react-hooks/immutability -- R3F idiom: camera is a mutable three.js Object3D */
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      PARALLAX_LERP,
    )
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      PARALLAX_LERP,
    )
    camera.lookAt(lookTarget.current)
    /* eslint-enable react-hooks/immutability */
  })

  return (
    <>
      {/* No lights — every material in this scene is unlit (basic/points/line). */}
      <StarField reducedMotion={reducedMotion} />
      <Particles reducedMotion={reducedMotion} />
      {!isMobile && (
        <>
          <MouseLight />
          <ConstellationLines reducedMotion={reducedMotion} />
          <LinePulses />
          {apps.map((app, i) => (
            <FloatingCard
              key={app.name}
              app={app}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </>
      )}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.45}
          luminanceSmoothing={0.85}
          intensity={0.55}
          mipmapBlur
          levels={5}
          radius={0.7}
        />
      </EffectComposer>
    </>
  )
}

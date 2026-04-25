import { useSyncExternalStore } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/canvas/Scene'
import Bio from './components/overlay/Bio'
import MobileLayout from './components/overlay/MobileLayout'
import CustomCursor from './components/overlay/CustomCursor'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MOBILE_QUERY = '(max-width: 768px)'

function makeMediaStore(query: string) {
  return {
    subscribe(cb: () => void) {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    getSnapshot() {
      return window.matchMedia(query).matches
    },
    getServerSnapshot() {
      return false
    },
  }
}

const reducedMotionStore = makeMediaStore(REDUCED_MOTION_QUERY)
const mobileStore = makeMediaStore(MOBILE_QUERY)

export default function App() {
  const reducedMotion = useSyncExternalStore(
    reducedMotionStore.subscribe,
    reducedMotionStore.getSnapshot,
    reducedMotionStore.getServerSnapshot,
  )
  const isMobile = useSyncExternalStore(
    mobileStore.subscribe,
    mobileStore.getSnapshot,
    mobileStore.getServerSnapshot,
  )

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(ellipse at 50% 45%, #1a1230 0%, #0c0a1c 38%, #050309 80%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
      >
        <Scene reducedMotion={reducedMotion} isMobile={isMobile} />
      </Canvas>
      {isMobile ? <MobileLayout /> : <Bio />}
      <CustomCursor />
    </>
  )
}

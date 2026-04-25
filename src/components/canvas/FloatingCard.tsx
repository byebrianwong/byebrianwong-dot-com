import { useEffect, useRef, useState } from 'react'
import { Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import apps, { type AppData } from '../../data/apps'
import {
  getFlashStrength,
  spawnPulse,
} from '../../state/pulses'
import AppIcon from '../icons/AppIcon'

interface Props {
  app: AppData
  index: number
  reducedMotion: boolean
}

const ENTRANCE_BASE_DELAY = 600
const ENTRANCE_STAGGER = 200
const ENTRANCE_DURATION = 700
const HOVER_SCALE = 1.16
const RESTING_SCALE = 0.92
const ORB_Y = 0.5
const ORB_HOVER_BOOST = 1.45
const HALO_BASE_OPACITY = 0.16
const PULSE_INTERVAL_MS = 850
const PULSE_TRAVEL_MS = 750
const RING_DURATION_MS = 850

const ORB_POSITIONS = apps.map(
  (a) => new THREE.Vector3(a.position[0], a.position[1] + ORB_Y, a.position[2]),
)

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function spawnPulsesFromIndex(srcIndex: number) {
  const src = apps[srcIndex]
  const from = ORB_POSITIONS[srcIndex]
  const now = performance.now()
  for (let j = 0; j < apps.length; j++) {
    if (j === srcIndex) continue
    spawnPulse({
      from: from.clone(),
      to: ORB_POSITIONS[j].clone(),
      color: src.color,
      fromIndex: srcIndex,
      toIndex: j,
      startMs: now,
      durationMs: PULSE_TRAVEL_MS,
    })
  }
}

const COMING_SOON_DURATION_MS = 2000

export default function FloatingCard({ app, index, reducedMotion }: Props) {
  const [hovered, setHovered] = useState(false)
  const [entranceDone, setEntranceDone] = useState(false)
  const [comingSoon, setComingSoon] = useState(false)
  const comingSoonTimer = useRef<number | null>(null)
  const interactive = reducedMotion || entranceDone
  const isExternal = !!app.href && /^https?:\/\//.test(app.href)
  const groupRef = useRef<THREE.Group>(null)
  const orbMeshRef = useRef<THREE.Mesh>(null)
  const orbMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const haloMeshRef = useRef<THREE.Mesh>(null)
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const tetherMatRef = useRef<THREE.LineBasicMaterial>(null)
  const ringMeshRef = useRef<THREE.Mesh>(null)
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const mountRef = useRef<number | null>(null)
  const ringStartRef = useRef<number>(-Infinity)
  const lastSpawnRef = useRef<number>(-Infinity)

  const entranceDelay = ENTRANCE_BASE_DELAY + index * ENTRANCE_STAGGER

  useEffect(() => {
    mountRef.current = performance.now()
    if (reducedMotion) return
    const id = window.setTimeout(
      () => setEntranceDone(true),
      entranceDelay + ENTRANCE_DURATION,
    )
    return () => window.clearTimeout(id)
  }, [reducedMotion, entranceDelay])

  const handleEnter = () => {
    setHovered(true)
    if (reducedMotion) return
    ringStartRef.current = performance.now()
    lastSpawnRef.current = -Infinity // spawn immediately on next frame
  }

  const handleLeave = () => {
    setHovered(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (app.href) return
    e.preventDefault()
    setComingSoon(true)
    ringStartRef.current = performance.now()
    if (comingSoonTimer.current !== null) {
      window.clearTimeout(comingSoonTimer.current)
    }
    comingSoonTimer.current = window.setTimeout(
      () => setComingSoon(false),
      COMING_SOON_DURATION_MS,
    )
  }

  useEffect(() => {
    return () => {
      if (comingSoonTimer.current !== null) {
        window.clearTimeout(comingSoonTimer.current)
      }
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current || mountRef.current === null) return

    const now = performance.now()
    const elapsed = now - mountRef.current
    const rawProgress = reducedMotion
      ? 1
      : Math.max(0, Math.min(1, (elapsed - entranceDelay) / ENTRANCE_DURATION))
    const eased = 1 - Math.pow(1 - rawProgress, 3)
    const overshoot =
      rawProgress > 0 && rawProgress < 1
        ? 1 + Math.sin(rawProgress * Math.PI) * 0.06
        : 1

    const baseScale = hovered ? HOVER_SCALE : RESTING_SCALE
    const targetScale = eased * overshoot * baseScale
    const next = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.18,
    )
    groupRef.current.scale.setScalar(next)

    const flash = getFlashStrength(index)
    const t = state.clock.elapsedTime
    const pulse = reducedMotion
      ? 1
      : 0.7 + 0.3 * Math.sin(t * 1.2 + index * 0.9)

    if (orbMatRef.current) {
      orbMatRef.current.opacity = rawProgress * Math.min(1, pulse + flash * 0.6)
    }
    if (orbMeshRef.current) {
      const target = hovered ? ORB_HOVER_BOOST : 1
      const flashBoost = flash * 0.35
      const orbScale = THREE.MathUtils.lerp(
        orbMeshRef.current.scale.x,
        target + flashBoost,
        0.18,
      )
      orbMeshRef.current.scale.setScalar(orbScale)
    }
    if (haloMatRef.current) {
      const haloMul = hovered ? 1.9 : 1
      haloMatRef.current.opacity =
        rawProgress * (HALO_BASE_OPACITY * haloMul + flash * 0.5)
    }
    if (haloMeshRef.current) {
      const haloScaleTarget = (hovered ? 1.4 : 1) + flash * 0.6
      const haloScale = THREE.MathUtils.lerp(
        haloMeshRef.current.scale.x,
        haloScaleTarget,
        0.15,
      )
      haloMeshRef.current.scale.setScalar(haloScale)
    }
    if (tetherMatRef.current) {
      const tetherTarget = hovered ? 0.7 : 0.18
      tetherMatRef.current.opacity = THREE.MathUtils.lerp(
        tetherMatRef.current.opacity,
        rawProgress * tetherTarget,
        0.15,
      )
    }

    // Expanding ring "ping" on hover begin
    if (ringMatRef.current && ringMeshRef.current) {
      const ringElapsed = now - ringStartRef.current
      if (ringElapsed >= 0 && ringElapsed < RING_DURATION_MS) {
        const rt = ringElapsed / RING_DURATION_MS
        const scale = THREE.MathUtils.lerp(0.4, 4.2, easeOutCubic(rt))
        ringMeshRef.current.scale.setScalar(scale)
        ringMatRef.current.opacity = (1 - rt) * 0.7
      } else {
        ringMatRef.current.opacity = 0
      }
    }

    // Continuous pulse stream while hovered
    if (
      hovered &&
      !reducedMotion &&
      now - lastSpawnRef.current >= PULSE_INTERVAL_MS
    ) {
      lastSpawnRef.current = now
      spawnPulsesFromIndex(index)
    }
  })

  return (
    <Float
      speed={reducedMotion ? 0 : 1.2}
      rotationIntensity={reducedMotion ? 0 : 0.22}
      floatIntensity={reducedMotion ? 0 : 0.7}
      floatingRange={reducedMotion ? [0, 0] : [-0.12, 0.12]}
    >
      <group ref={groupRef} position={app.position} scale={0}>
        <mesh ref={orbMeshRef} position={[0, ORB_Y, 0]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshBasicMaterial
            ref={orbMatRef}
            color={app.color}
            transparent
            opacity={0}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={haloMeshRef} position={[0, ORB_Y, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial
            ref={haloMatRef}
            color={app.color}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={ringMeshRef} position={[0, ORB_Y, 0]}>
          <ringGeometry args={[0.16, 0.2, 48]} />
          <meshBasicMaterial
            ref={ringMatRef}
            color={app.color}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([0, 0.42, 0, 0, 0.08, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={tetherMatRef}
            color={app.color}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </line>
        <Html
          position={[0, 0, 0]}
          center
          style={{ pointerEvents: interactive ? 'auto' : 'none' }}
          zIndexRange={[10, 0]}
          distanceFactor={9}
        >
          <a
            ref={cardRef}
            href={app.href ?? undefined}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            style={{
              position: 'relative',
              display: 'block',
              width: '170px',
              padding: '14px 16px 15px',
              marginTop: '76px',
              background: hovered
                ? 'rgba(255, 255, 255, 0.13)'
                : 'rgba(255, 255, 255, 0.035)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderRadius: '13px',
              border: `1px solid ${
                comingSoon
                  ? app.color
                  : hovered
                    ? `${app.color}88`
                    : 'rgba(255,255,255,0.06)'
              }`,
              boxShadow:
                comingSoon
                  ? `0 0 70px ${app.color}66, 0 12px 40px rgba(0,0,0,0.45), inset 0 0 30px ${app.color}26`
                  : hovered
                    ? `0 0 60px ${app.color}55, 0 12px 40px rgba(0,0,0,0.45), inset 0 0 22px ${app.color}1c`
                    : '0 4px 22px rgba(0,0,0,0.25)',
              textDecoration: 'none',
              color: '#f0eef6',
              transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
              transition:
                'background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.4s ease, opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'none',
              opacity: hovered ? 1 : 0.78,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '6px',
                opacity: comingSoon ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '18px',
                  height: '18px',
                  color: app.color,
                  opacity: hovered ? 1 : 0.78,
                  filter: hovered
                    ? `drop-shadow(0 0 5px ${app.color})`
                    : `drop-shadow(0 0 2px ${app.color}66)`,
                  transform: hovered ? 'scale(1.08)' : 'scale(1)',
                  transition:
                    'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
                }}
              >
                <AppIcon name={app.name} size={18} />
              </span>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.015em',
                  color: hovered ? '#fff' : '#f0eef6',
                  textShadow: hovered ? `0 0 12px ${app.color}55` : 'none',
                  transition: 'color 0.3s ease, text-shadow 0.3s ease',
                }}
              >
                {app.name}
              </div>
            </div>
            <div
              style={{
                fontSize: '11px',
                opacity: comingSoon ? 0 : hovered ? 0.85 : 0.45,
                lineHeight: 1.55,
                fontWeight: 300,
                paddingLeft: '28px',
                transition: 'opacity 0.25s ease',
              }}
            >
              {app.description}
            </div>
            <div
              className={`coming-soon-overlay${comingSoon ? ' coming-soon-overlay--shown' : ''}`}
              style={
                {
                  ['--orb' as string]: app.color,
                } as React.CSSProperties
              }
              aria-hidden={!comingSoon}
            >
              <span className="coming-soon-spark" aria-hidden>
                ✦
              </span>
              <span className="coming-soon-text">
                Coming soon<span className="coming-soon-dots">...</span>
              </span>
            </div>
          </a>
        </Html>
      </group>
    </Float>
  )
}

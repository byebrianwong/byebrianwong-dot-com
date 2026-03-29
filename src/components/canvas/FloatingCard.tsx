import { useState, useRef } from 'react'
import { Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AppData } from '../../data/apps'

interface Props {
  app: AppData
}

export default function FloatingCard({ app }: Props) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const scaleTarget = useRef(1)

  scaleTarget.current = hovered ? 1.06 : 1

  useFrame(() => {
    if (!groupRef.current) return
    const s = groupRef.current.scale.x
    const next = THREE.MathUtils.lerp(s, scaleTarget.current, 0.1)
    groupRef.current.scale.setScalar(next)
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      floatingRange={[-0.15, 0.15]}
    >
      <group ref={groupRef} position={app.position}>
        <Html
          transform
          distanceFactor={6}
          style={{
            pointerEvents: 'auto',
          }}
        >
          <a
            href={app.href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'block',
              width: '200px',
              padding: '22px',
              background: hovered
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
              boxShadow: hovered
                ? `0 0 40px ${app.color}22, 0 8px 32px rgba(0,0,0,0.3)`
                : '0 4px 24px rgba(0,0,0,0.2)',
              textDecoration: 'none',
              color: '#f0eef6',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'none',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: app.color,
                marginBottom: '14px',
                boxShadow: hovered
                  ? `0 0 16px ${app.color}, 0 0 4px ${app.color}`
                  : `0 0 8px ${app.color}88`,
                transition: 'box-shadow 0.4s ease',
              }}
            />
            <div
              style={{
                fontSize: '15px',
                fontWeight: 500,
                marginBottom: '6px',
                letterSpacing: '0.02em',
              }}
            >
              {app.name}
            </div>
            <div
              style={{
                fontSize: '12px',
                opacity: 0.5,
                lineHeight: 1.5,
                fontWeight: 300,
              }}
            >
              {app.description}
            </div>
          </a>
        </Html>
      </group>
    </Float>
  )
}

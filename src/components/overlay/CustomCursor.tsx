import { useEffect, useRef, useState } from 'react'

const TRAIL_COUNT = 5

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef({ x: 0, y: 0 })
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  )
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const raf = useRef<number>(0)

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-interactive]')) {
        setIsHovering(true)
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-interactive]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }

      // Trail follows with increasing delay
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? pos.current : trailPos.current[i - 1]
        trailPos.current[i].x += (prev.x - trailPos.current[i].x) * (0.25 - i * 0.03)
        trailPos.current[i].y += (prev.y - trailPos.current[i].y) * (0.25 - i * 0.03)
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${trailPos.current[i].x}px, ${trailPos.current[i].y}px, 0)`
        }
      }

      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '40px' : '16px',
          height: isHovering ? '40px' : '16px',
          marginLeft: isHovering ? '-20px' : '-8px',
          marginTop: isHovering ? '-20px' : '-8px',
          borderRadius: '50%',
          border: '1.5px solid rgba(196, 181, 253, 0.8)',
          background: isHovering
            ? 'rgba(196, 181, 253, 0.08)'
            : 'rgba(196, 181, 253, 0.15)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease',
          mixBlendMode: 'screen',
        }}
      />
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${4 - i * 0.5}px`,
            height: `${4 - i * 0.5}px`,
            marginLeft: `${-(4 - i * 0.5) / 2}px`,
            marginTop: `${-(4 - i * 0.5) / 2}px`,
            borderRadius: '50%',
            background: `rgba(196, 181, 253, ${0.4 - i * 0.07})`,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}
    </>
  )
}

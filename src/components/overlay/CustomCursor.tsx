import { useEffect, useRef, useState, useCallback } from 'react'

const TRAIL_COUNT = 5
const BEAR_SIZE = 28
const BEAR_HOVER_SIZE = 36

// Distance threshold (px) to trigger a new expression
const EXPRESSION_DISTANCE = 120

type Expression = 'happy' | 'surprised' | 'sleepy' | 'wink' | 'tongue' | 'star' | 'uwu'

const EXPRESSIONS: Expression[] = ['happy', 'surprised', 'sleepy', 'wink', 'tongue', 'star', 'uwu']

function pickRandom(current: Expression): Expression {
  const others = EXPRESSIONS.filter((e) => e !== current)
  return others[Math.floor(Math.random() * others.length)]
}

/** Eyes for each expression */
function Eyes({ expr }: { expr: Expression }) {
  switch (expr) {
    case 'surprised':
      return (
        <>
          <circle cx="38" cy="47" r="5.5" fill="#0a0a0f" />
          <circle cx="62" cy="47" r="5.5" fill="#0a0a0f" />
          <circle cx="39.5" cy="45" r="2" fill="white" opacity="0.9" />
          <circle cx="63.5" cy="45" r="2" fill="white" opacity="0.9" />
        </>
      )
    case 'sleepy':
      return (
        <>
          {/* Closed/droopy eyes */}
          <path d="M33 48 Q38 44 43 48" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M57 48 Q62 44 67 48" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )
    case 'wink':
      return (
        <>
          <circle cx="38" cy="48" r="4" fill="#0a0a0f" />
          <circle cx="39.5" cy="46.5" r="1.5" fill="white" opacity="0.8" />
          {/* Winking eye */}
          <path d="M57 48 Q62 44 67 48" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )
    case 'star':
      return (
        <>
          {/* Star eyes */}
          <text x="32" y="52" fontSize="12" fill="#0a0a0f" style={{ fontFamily: 'sans-serif' }}>&#9733;</text>
          <text x="56" y="52" fontSize="12" fill="#0a0a0f" style={{ fontFamily: 'sans-serif' }}>&#9733;</text>
        </>
      )
    case 'uwu':
      return (
        <>
          {/* UwU squinty happy eyes */}
          <path d="M33 46 Q38 51 43 46" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M57 46 Q62 51 67 46" stroke="#0a0a0f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )
    case 'tongue':
    case 'happy':
    default:
      return (
        <>
          <circle cx="38" cy="48" r="4" fill="#0a0a0f" />
          <circle cx="62" cy="48" r="4" fill="#0a0a0f" />
          <circle cx="39.5" cy="46.5" r="1.5" fill="white" opacity="0.8" />
          <circle cx="63.5" cy="46.5" r="1.5" fill="white" opacity="0.8" />
        </>
      )
  }
}

/** Mouth for each expression */
function Mouth({ expr }: { expr: Expression }) {
  switch (expr) {
    case 'surprised':
      return <ellipse cx="50" cy="66" rx="4.5" ry="5" fill="#0a0a0f" opacity="0.6" />
    case 'sleepy':
      return (
        <path d="M47 64 Q50 66 53 64" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      )
    case 'wink':
      return (
        <path d="M44 63 Q50 70 56 63" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      )
    case 'tongue':
      return (
        <>
          <path d="M44 63 Q50 70 56 63" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Tongue sticking out */}
          <ellipse cx="50" cy="70" rx="4" ry="5" fill="#ff8fab" opacity="0.7" />
        </>
      )
    case 'star':
      return (
        <path d="M44 63 Q50 72 56 63" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      )
    case 'uwu':
      return (
        <>
          <path d="M46 62 Q48 65 50 62 Q52 65 54 62" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        </>
      )
    case 'happy':
    default:
      return (
        <path d="M46 63 Q50 68 54 63" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      )
  }
}

/** Whether this expression shows blush */
function showsBlush(expr: Expression, hovering: boolean): boolean {
  if (hovering) return true
  return expr === 'uwu' || expr === 'wink' || expr === 'tongue'
}

function BearSvg({ size, hovering, expression }: { size: number; hovering: boolean; expression: Expression }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{
        transition: 'transform 0.2s ease',
        transform: hovering ? 'scale(1.15)' : 'scale(1)',
        filter: 'drop-shadow(0 0 6px rgba(196, 181, 253, 0.5))',
      }}
    >
      {/* Left ear */}
      <circle cx="22" cy="22" r="18" fill="#c4b5fd" opacity="0.85" />
      <circle cx="22" cy="22" r="10" fill="#0a0a0f" opacity="0.5" />
      {/* Right ear */}
      <circle cx="78" cy="22" r="18" fill="#c4b5fd" opacity="0.85" />
      <circle cx="78" cy="22" r="10" fill="#0a0a0f" opacity="0.5" />
      {/* Head */}
      <circle cx="50" cy="54" r="36" fill="#c4b5fd" opacity="0.9" />

      {/* Eyes */}
      <Eyes expr={expression} />

      {/* Snout */}
      <ellipse cx="50" cy="62" rx="12" ry="9" fill="#e8e0ff" opacity="0.7" />
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="4" ry="3" fill="#0a0a0f" opacity="0.7" />

      {/* Mouth */}
      <Mouth expr={expression} />

      {/* Blush */}
      {showsBlush(expression, hovering) && (
        <>
          <circle cx="30" cy="58" r="5" fill="#ffb0c8" opacity="0.35" />
          <circle cx="70" cy="58" r="5" fill="#ffb0c8" opacity="0.35" />
        </>
      )}

      {/* Sleepy Z */}
      {expression === 'sleepy' && (
        <text x="68" y="38" fontSize="11" fill="#c4b5fd" opacity="0.6" fontWeight="bold" style={{ fontFamily: 'sans-serif' }}>z</text>
      )}
    </svg>
  )
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef({ x: 0, y: 0 })
  const lastExprPos = useRef({ x: 0, y: 0 })
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  )
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [expression, setExpression] = useState<Expression>('happy')
  const raf = useRef<number>(0)

  const checkExpressionChange = useCallback(() => {
    const dx = pos.current.x - lastExprPos.current.x
    const dy = pos.current.y - lastExprPos.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > EXPRESSION_DISTANCE) {
      lastExprPos.current.x = pos.current.x
      lastExprPos.current.y = pos.current.y
      setExpression((prev) => pickRandom(prev))
    }
  }, [])

  useEffect(() => {
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

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? pos.current : trailPos.current[i - 1]
        trailPos.current[i].x += (prev.x - trailPos.current[i].x) * (0.2 - i * 0.025)
        trailPos.current[i].y += (prev.y - trailPos.current[i].y) * (0.2 - i * 0.025)
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${trailPos.current[i].x}px, ${trailPos.current[i].y}px, 0)`
        }
      }

      checkExpressionChange()

      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [checkExpressionChange])

  if (isTouch) return null

  const size = isHovering ? BEAR_HOVER_SIZE : BEAR_SIZE

  return (
    <>
      {/* Bear cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${-size / 2}px`,
          marginTop: `${-size / 2}px`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease',
        }}
      >
        <BearSvg size={size} hovering={isHovering} expression={expression} />
      </div>
      {/* Paw-print trail */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${6 - i * 0.8}px`,
            height: `${6 - i * 0.8}px`,
            marginLeft: `${-(6 - i * 0.8) / 2}px`,
            marginTop: `${-(6 - i * 0.8) / 2}px`,
            borderRadius: '50%',
            background: `rgba(196, 181, 253, ${0.35 - i * 0.06})`,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}
    </>
  )
}

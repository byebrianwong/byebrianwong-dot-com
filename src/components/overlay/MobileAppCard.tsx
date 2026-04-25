import { useEffect, useRef, useState } from 'react'
import type { AppData } from '../../data/apps'
import AppIcon from '../icons/AppIcon'

const COMING_SOON_DURATION_MS = 2000

interface Props {
  app: AppData
  /** For Storybook / preview: force the Coming soon overlay to be shown. */
  forceComingSoon?: boolean
}

export default function MobileAppCard({ app, forceComingSoon = false }: Props) {
  const [comingSoon, setComingSoon] = useState(false)
  const timer = useRef<number | null>(null)
  const isExternal = !!app.href && /^https?:\/\//.test(app.href)
  const showOverlay = comingSoon || forceComingSoon

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (app.href) return
    e.preventDefault()
    setComingSoon(true)
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(
      () => setComingSoon(false),
      COMING_SOON_DURATION_MS,
    )
  }

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <a
      href={app.href ?? undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={`mobile-app-card${showOverlay ? ' mobile-app-card--coming-soon' : ''}`}
      style={
        {
          ['--orb' as string]: app.color,
        } as React.CSSProperties
      }
    >
      <span className="mobile-app-icon">
        <AppIcon name={app.name} size={22} />
      </span>
      <span className="mobile-app-text">
        <span className="mobile-app-name">{app.name}</span>
        <span className="mobile-app-desc">{app.description}</span>
      </span>
      <span className="mobile-app-arrow" aria-hidden>
        {app.href ? '→' : '✦'}
      </span>
      <span
        className={`coming-soon-overlay coming-soon-overlay--mobile${showOverlay ? ' coming-soon-overlay--shown' : ''}`}
        aria-hidden={!showOverlay}
      >
        <span className="coming-soon-spark" aria-hidden>
          ✦
        </span>
        <span className="coming-soon-text">
          Coming soon<span className="coming-soon-dots">...</span>
        </span>
      </span>
    </a>
  )
}

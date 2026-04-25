import { useEffect, useRef, useState } from 'react'
import apps, { type AppData } from '../../data/apps'
import AppIcon from '../icons/AppIcon'

const COMING_SOON_DURATION_MS = 2000

function MobileAppCard({ app }: { app: AppData }) {
  const [comingSoon, setComingSoon] = useState(false)
  const timer = useRef<number | null>(null)
  const isExternal = !!app.href && /^https?:\/\//.test(app.href)

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
      className={`mobile-app-card${comingSoon ? ' mobile-app-card--coming-soon' : ''}`}
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
        className={`coming-soon-overlay coming-soon-overlay--mobile${comingSoon ? ' coming-soon-overlay--shown' : ''}`}
        aria-hidden={!comingSoon}
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

export default function MobileLayout() {
  return (
    <div className="mobile-page">
      <section className="mobile-welcome">
        <h1 className="mobile-welcome-title">Welcome!</h1>
        <p className="mobile-welcome-body">
          Come enjoy some random games or semi-useful tools. I'm Brian, a San
          Francisco Bay Area native who enjoys building things and playing
          sportsballs.
        </p>
        <p className="mobile-welcome-body">
          Currently leading product{' '}
          <a
            href="https://www.chromatic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-link"
          >
            @chromatic
          </a>{' '}
          &{' '}
          <a
            href="https://storybook.js.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-link"
          >
            @storybook
          </a>{' '}
          (the UI testing layer for the world's agentic AI development). Or if
          you live in the real, analog paper world, check out{' '}
          <a
            href="https://instagram.com/paperandmilk"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-link"
          >
            @paperandmilk
          </a>
          .
        </p>
      </section>

      <section className="mobile-apps">
        {apps.map((app) => (
          <MobileAppCard key={app.name} app={app} />
        ))}
      </section>
    </div>
  )
}

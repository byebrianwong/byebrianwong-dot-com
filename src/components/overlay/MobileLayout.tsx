import apps from '../../data/apps'
import MobileAppCard from './MobileAppCard'

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

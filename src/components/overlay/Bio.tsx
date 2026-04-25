export default function Bio() {
  return (
    <div
      className="bio-fade bio-fade-in"
      style={{
        position: 'fixed',
        bottom: '48px',
        left: '48px',
        maxWidth: '420px',
        color: '#f0eef6',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div className="bio-hint">move your cursor</div>
      <h1
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '34px',
          fontWeight: 300,
          letterSpacing: '-0.005em',
          marginBottom: '14px',
          opacity: 0.92,
        }}
      >
        Welcome!
      </h1>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.7,
          opacity: 0.6,
          fontWeight: 300,
          letterSpacing: '0.015em',
          marginBottom: '12px',
        }}
      >
        Come enjoy some random games or semi-useful tools. I'm Brian, a San
        Francisco Bay Area native who enjoys building things and playing
        sportsballs.
      </p>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.7,
          opacity: 0.6,
          fontWeight: 300,
          letterSpacing: '0.015em',
        }}
      >
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
    </div>
  )
}

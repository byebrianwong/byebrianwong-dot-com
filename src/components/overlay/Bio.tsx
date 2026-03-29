const linkStyle: React.CSSProperties = {
  color: '#c4b5fd',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(196, 181, 253, 0.3)',
  pointerEvents: 'auto',
  cursor: 'none',
  transition: 'border-color 0.2s ease',
}

export default function Bio() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '48px',
        left: '48px',
        maxWidth: '340px',
        color: '#f0eef6',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 300,
          letterSpacing: '0.04em',
          marginBottom: '12px',
          opacity: 0.9,
        }}
      >
        Brian Wong
      </h1>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.7,
          opacity: 0.5,
          fontWeight: 300,
          letterSpacing: '0.02em',
        }}
      >
        Building enjoyable things. Currently{' '}
        <a href="https://www.chromatic.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>@chromatic</a>
        {' '}and{' '}
        <a href="https://storybook.js.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>@storybook</a>
        , previously healthtech AI and edtech (Y Combinator).
      </p>
    </div>
  )
}

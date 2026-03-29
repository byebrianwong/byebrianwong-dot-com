export default function Bio() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '48px',
        left: '48px',
        maxWidth: '380px',
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
          lineHeight: 1.6,
          opacity: 0.5,
          fontWeight: 300,
          letterSpacing: '0.02em',
        }}
      >
        Building things on the internet. Explore the floating cards to see what I've been working on.
      </p>
    </div>
  )
}

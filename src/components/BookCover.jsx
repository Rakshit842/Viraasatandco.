import Logo from './Logo.jsx'

export const covers = {
  terra: {
    label: 'Terracotta',
    bg: 'linear-gradient(135deg, #A8704F 0%, #8A5738 100%)',
    spine: '#6F4429',
    swatch: '#9E6747',
  },
  sage: {
    label: 'Sage',
    bg: 'linear-gradient(135deg, #6B7258 0%, #4F5540 100%)',
    spine: '#3F4433',
    swatch: '#5E644E',
  },
  char: {
    label: 'Charcoal',
    bg: 'linear-gradient(135deg, #2E2B29 0%, #121212 100%)',
    spine: '#000000',
    swatch: '#121212',
  },
}

export default function BookCover({ color = 'terra', family = 'Kapoor', width = 210, className = '' }) {
  const c = covers[color] || covers.terra
  const name = family.trim() || 'Your'

  return (
    <div
      className={`book ${className}`}
      style={{
        width,
        background: c.bg,
        boxShadow: `-8px 0 0 -2px ${c.spine}, 18px 26px 40px -14px rgba(18,18,18,.55)`,
      }}
      role="img"
      aria-label={`Hardcover book titled The ${name} Family Book`}
    >
      <div className="book-edge" />
      <div className="absolute inset-0 flex flex-col items-center justify-between text-center text-cream" style={{ padding: `${width * 0.16}px ${width * 0.09}px` }}>
        <Logo size={Math.round(width * 0.25)} tone="cream" title="" />
        <div className="min-w-0 w-full">
          <p className="font-display leading-tight break-words" style={{ fontSize: width * 0.115 }}>
            The {name}
            <br />
            Family Book
          </p>
          <div className="mx-auto h-px" style={{ background: 'rgba(247,244,235,.6)', width: width * 0.22, margin: `${width * 0.05}px auto` }} />
          <p className="uppercase opacity-85" style={{ fontSize: Math.max(9, width * 0.052), letterSpacing: '.2em' }}>
            Four generations
          </p>
        </div>
        <p className="uppercase opacity-75" style={{ fontSize: Math.max(8, width * 0.045), letterSpacing: '.25em' }}>
          Viraasat &amp; Co.
        </p>
      </div>
    </div>
  )
}

const stroke = { fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const problems = [
  {
    tone: 'terra',
    big: '80%',
    bigClass: 'font-display text-5xl font-semibold text-terra leading-none',
    text: 'of family stories are forgotten within 3 generations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" stroke="#9E6747" {...stroke} aria-hidden="true">
        <circle cx="12" cy="5" r="2.2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="12" r="2" />
        <circle cx="12" cy="19" r="1.6" strokeDasharray="2 2.5" />
        <path d="M11 7l-4 3.4M13 7l4 3.4M7 14l4 4M17 14l-4 4" strokeDasharray="1 3" />
      </svg>
    ),
  },
  {
    tone: 'sage',
    big: 'Photos without a name attached.',
    bigClass: 'font-display text-2xl font-semibold leading-snug text-sage',
    text: 'Photos sit lost in phone galleries without context.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" stroke="#5E644E" {...stroke} aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="1.8" /><path d="M4 17l5-4 4 3 3-2 4 3" />
      </svg>
    ),
  },
  {
    tone: 'terra',
    big: 'A blank page is a heavy thing.',
    bigClass: 'font-display text-2xl font-semibold leading-snug text-terra',
    text: 'Writing a memoir feels overwhelming.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" stroke="#9E6747" {...stroke} aria-hidden="true">
        <path d="M5 4h10l4 4v12H5z" /><path d="M15 4v4h4M8 12h8M8 16h5" />
      </svg>
    ),
  },
]

export default function Problem() {
  return (
    <section id="mission" className="py-16 lg:py-24" style={{ background: 'var(--cream-deep)' }}>
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Our mission</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            The people who remember are not getting any younger.
          </h2>
          <p className="mt-4" style={{ color: 'rgba(44,38,35,.82)' }}>
            Every family has a voice that knows where the recipes, the names and the old jokes came from. We built
            Viraasat &amp; Co. so that voice is still in the room after it’s gone quiet.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {problems.map((p) => (
            <article key={p.text} className="card p-7">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ background: p.tone === 'sage' ? 'rgba(94,100,78,.16)' : 'rgba(158,103,71,.14)' }}
              >
                {p.icon}
              </div>
              <p className={p.bigClass}>{p.big}</p>
              <p className="mt-3 font-medium text-lg leading-snug">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

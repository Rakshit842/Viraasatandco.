const s = { fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const pillars = [
  {
    title: 'AI Conversational Biographer',
    color: '#9E6747',
    body:
      'Sends weekly voice prompts by SMS or WhatsApp. You answer out loud. We transcribe the audio and shape it into narrative chapters in your own words.',
    points: ['Weekly SMS & WhatsApp prompts', 'Automatic transcription', 'Stories refined into chapters'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" stroke="#9E6747" {...s} aria-hidden="true">
        <rect x="17" y="5" width="14" height="24" rx="7" />
        <path d="M10 22c0 8 6 13 14 13s14-5 14-13M24 35v8M17 43h14" />
      </svg>
    ),
  },
  {
    title: 'Interactive Family Vault & Knowledge Graph',
    color: '#5E644E',
    body:
      'Every memory is kept safely in your cloud vault, placed on a life timeline and linked to the people in it. Open any relative and hear what they said, see where they lived, read what they left behind.',
    points: ['Cloud storage for photos, audio and documents', 'Chronological life timeline', 'Voice note player', 'Time capsules for future dates', 'Clickable family tree'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" stroke="#5E644E" {...s} aria-hidden="true">
        <circle cx="24" cy="9" r="4.5" /><circle cx="9" cy="37" r="4.5" /><circle cx="39" cy="37" r="4.5" /><circle cx="24" cy="26" r="3.5" />
        <path d="M22 13l-11 20M26 13l11 20M24 29.5V33M13.5 37h21" />
      </svg>
    ),
  },
  {
    title: 'Heirloom Hardcover Books',
    color: '#9E6747',
    body:
      'Export your vault into a custom-bound physical book in one click. Each chapter carries a QR code that plays the original voice recording.',
    points: ['One-click print export', 'Archived voice QR codes', 'Custom-bound hardcover'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" stroke="#9E6747" {...s} aria-hidden="true">
        <path d="M8 8h26a4 4 0 014 4v28H12a4 4 0 01-4-4V8z" />
        <path d="M12 40a4 4 0 010-8h26M16 14h14M16 19h9" />
        <rect x="29" y="22" width="6" height="6" rx="1" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Three pillars</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">Talk. Keep. Hold in your hands.</h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <article key={p.title} className="card p-8 flex flex-col">
              {p.icon}
              <h3 className="mt-6 text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3" style={{ color: 'rgba(44,38,35,.82)' }}>{p.body}</p>
              <ul className="mt-5 flex flex-col gap-2 text-sm font-medium">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span style={{ color: p.color }} aria-hidden="true">✓</span> {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

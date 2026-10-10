const s = { fill: 'none', stroke: '#F7F4EB', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const items = [
  {
    title: 'End-to-end encryption',
    text: 'Recordings and photos are encrypted on the way to your cloud vault and while they are stored.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...s} aria-hidden="true">
        <rect x="4" y="10" width="16" height="11" rx="2.5" /><path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
  },
  {
    title: '100% data ownership',
    text: 'Nothing is sold or used to train other products. Delete it any time.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Open export formats',
    text: 'Take everything with you as PDF, MP4 and MP3 files.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...s} aria-hidden="true">
        <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14" />
      </svg>
    ),
  },
]

export default function Security() {
  return (
    <section className="on-dark py-14 lg:py-20 bg-sage text-cream">
      <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <div>
          <p className="eyebrow" style={{ color: '#EBDDC3' }}>Security &amp; trust</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mt-3">
            Your family’s voice belongs to your family.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl p-6" style={{ background: 'rgba(18,18,18,.22)' }}>
              {it.icon}
              <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm" style={{ color: 'rgba(247,244,235,.92)' }}>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

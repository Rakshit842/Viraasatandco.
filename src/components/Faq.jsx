const items = [
  {
    q: 'Where are my memories stored?',
    a: 'In your private cloud vault. Photos, voice notes and documents are kept together on one timeline, so nothing is lost when a phone is replaced.',
  },
  {
    q: 'My parents are not comfortable with technology. Can they still take part?',
    a: 'Yes. Prompts arrive by SMS or WhatsApp as a short voice message. They listen, press record, and talk. There is no app to learn and no account for them to manage.',
  },
  {
    q: 'Who owns the recordings and photos?',
    a: 'You do. Everything stays yours, nothing is sold, and you can delete the vault whenever you choose.',
  },
  {
    q: 'Can I take my stories somewhere else?',
    a: 'Yes. You can export the vault as PDF, MP3 and MP4 files at any time.',
  },
  {
    q: 'What if someone does not want to be recorded?',
    a: 'Each storyteller chooses what to share. They can skip any prompt, re-record an answer, or mark a memory private to themselves.',
  },
  {
    q: 'How does the printed book work?',
    a: 'When you are ready, export the vault. You approve a proof of the layout, then the hardcover is printed and bound. Each chapter carries a QR code that plays the original voice.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="wrap grid lg:grid-cols-[1fr_1.6fr] gap-10">
        <div>
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">Things families ask first.</h2>
        </div>
        <div className="min-w-0 border-t" style={{ borderColor: 'var(--line)' }}>
          {items.map((it) => (
            <details key={it.q} className="faq border-b" style={{ borderColor: 'var(--line)' }}>
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer text-lg font-semibold">
                <span className="min-w-0">{it.q}</span>
                <span className="faq-icon shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-terra" style={{ borderColor: 'rgba(158,103,71,.5)' }} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="pb-5 pr-12" style={{ color: 'rgba(44,38,35,.85)' }}>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

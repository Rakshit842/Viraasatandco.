const steps = [
  { title: 'Receive gentle prompts', text: 'Once a week, a short voice question arrives on the app you already use.' },
  { title: 'Speak or upload', text: 'Talk for two minutes, or add old photographs and let the story find them.' },
  { title: 'AI builds the timeline', text: 'Dates, places and relatives are placed in order and linked to the family tree.' },
  { title: 'Share or print', text: 'Send the vault to family online, or order a hardcover legacy book.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="on-dark py-16 lg:py-24 bg-char text-cream">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Four steps from a phone call to a printed book.
          </h2>
        </div>

        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0">
          {steps.map((st, i) => (
            <li
              key={st.title}
              className="rounded-2xl p-7 border transition-colors duration-300 hover:border-terra"
              style={{ borderColor: 'rgba(247,244,235,.16)', background: 'rgba(247,244,235,.04)' }}
            >
              <span className="font-display text-4xl" style={{ color: '#D9A582' }}>{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{st.title}</h3>
              <p className="mt-2 text-[15px]" style={{ color: 'rgba(247,244,235,.78)' }}>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

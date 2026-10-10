import BookCover from './BookCover.jsx'

const bars = [30, 55, 40, 75, 60, 90, 50, 70, 35, 80, 55, 45, 65, 30]

export default function Hero() {
  return (
    <section
      className="pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden"
      style={{ background: 'radial-gradient(900px 400px at 85% 0%, rgba(94,100,78,.14), transparent 70%), var(--cream)' }}
    >
      <div className="wrap grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
        <div className="min-w-0 reveal">
          <p className="eyebrow mb-5">Digital legacy · AI biography · family heirlooms</p>
          <h1 className="font-semibold text-[2.4rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem] tracking-tight">
            Preserve Your Family’s Stories, Voice, and Legacy for{' '}
            <em className="text-terra">Generations.</em>
          </h1>
          <p className="mt-6 text-lg max-w-xl" style={{ color: 'rgba(44,38,35,.82)' }}>
            Viraasat &amp; Co. combines AI-powered voice interviews with interactive family trees and custom
            physical heirloom books so your roots live forever.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#create" className="btn btn-primary">Create Your Vault</a>
            <a href="#how" className="btn btn-ghost">See How It Works</a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'rgba(44,38,35,.8)' }}>
            {['Free to start', 'Private cloud storage', 'Works over WhatsApp & SMS'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5E644E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero visual: hardcover book with a live prompt and voice note */}
        <div className="relative min-w-0 reveal flex justify-center py-10" style={{ animationDelay: '.15s' }}>
          <div
            className="absolute inset-x-6 top-8 bottom-8 rounded-[40px]"
            style={{ background: 'rgba(94,100,78,.09)', border: '1px solid rgba(94,100,78,.18)' }}
            aria-hidden="true"
          />
          <div className="relative">
            <BookCover color="terra" family="Kapoor" width={250} />
          </div>

          <div className="float-card absolute left-0 sm:left-2 top-2 max-w-[230px] card !rounded-2xl p-4 !shadow-lg">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sage">WhatsApp · Tuesday, 9:00</p>
            <p className="mt-1.5 text-sm leading-snug">Tell me about the day you opened your first kitchen.</p>
          </div>

          <div className="float-card float-card-2 absolute right-0 sm:right-2 bottom-2 w-[210px] card !rounded-2xl p-4 !shadow-lg">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="uppercase tracking-wider text-terra">Voice note</span>
              <span className="tabular-nums" style={{ color: 'rgba(44,38,35,.7)' }}>0:48</span>
            </div>
            <div className="mt-2.5 flex items-end gap-[3px] h-8" aria-hidden="true">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i < 8 ? '#9E6747' : 'rgba(44,38,35,.22)' }} />
              ))}
            </div>
            <p className="mt-2 text-xs" style={{ color: 'rgba(44,38,35,.78)' }}>Transcribed into Chapter 7</p>
          </div>
        </div>
      </div>
    </section>
  )
}

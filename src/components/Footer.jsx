import Logo from './Logo.jsx'

const explore = [
  { href: '#mission', label: 'Our Mission' },
  { href: '#how', label: 'How It Works' },
  { href: '#create', label: 'Create Your Vault' },
]

const linkClass = 'hover:text-[#D9A582] transition-colors'

export default function Footer() {
  return (
    <footer className="on-dark pt-14 pb-10 bg-char text-cream">
      <div className="wrap">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={46} tone="dark" />
              <span className="font-display text-xl font-semibold">Viraasat &amp; Co.</span>
            </div>
            <p className="font-display italic text-2xl mt-5 max-w-sm leading-snug" style={{ color: '#D9A582' }}>
              Every family is a library. Keep the books open.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="flex flex-col gap-2 text-[15px]" style={{ color: 'rgba(247,244,235,.85)' }}>
              {explore.map((l) => (
                <li key={l.href}><a className={linkClass} href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Follow</p>
            <a
              className={`inline-flex items-center gap-2 text-[15px] ${linkClass}`}
              style={{ color: 'rgba(247,244,235,.85)' }}
              href="https://www.instagram.com/viraasatandco"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r=".8" fill="currentColor" />
              </svg>
              @viraasatandco
            </a>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm"
          style={{ borderColor: 'rgba(247,244,235,.18)', color: 'rgba(247,244,235,.75)' }}
        >
          <p>© 2026 Viraasat &amp; Co. All rights reserved.</p>
          <div className="flex gap-6">
            <a className={linkClass} href="#top">Privacy Policy</a>
            <a className={linkClass} href="#top">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

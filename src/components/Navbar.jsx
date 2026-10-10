import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

const links = [
  { id: 'mission', label: 'Our Mission' },
  { id: 'how', label: 'How It Works' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
]

export default function Navbar({ minimal = false }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // highlight the link for the section currently in view (landing page only)
  useEffect(() => {
    if (minimal || !('IntersectionObserver' in window)) return undefined
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [minimal])

  useEffect(() => setOpen(false), [minimal])

  return (
    <header
      className="sticky z-50 border-b"
      style={{ top: 'env(safe-area-inset-top, 0px)', background: 'rgba(247,244,235,.92)', backdropFilter: 'blur(10px)', borderColor: 'var(--line)' }}
    >
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <a href="#top" className="flex items-center gap-2.5 min-w-0" aria-label="Viraasat & Co. home">
          <Logo size={42} />
          <span className="font-display text-xl font-semibold leading-none truncate">
            Viraasat <span className="text-terra">&amp;</span> Co.
          </span>
        </a>

        {!minimal && (
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {links.map((l) => (
              <a key={l.id} className="navlink" href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {minimal ? (
            <a href="#top" className="btn btn-ghost !py-[10px] !px-[20px]">Back to home</a>
          ) : (
            <a href="#create" className="btn btn-primary hidden sm:inline-flex !py-[11px] !px-[22px]">Start Your Legacy</a>
          )}
          {!minimal && (
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border"
              style={{ borderColor: 'var(--line)' }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobileMenu"
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C2623" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          )}
        </div>
      </div>

      {open && !minimal && (
        <div id="mobileMenu" className="lg:hidden border-t bg-cream" style={{ borderColor: 'var(--line)' }}>
          <div className="wrap flex flex-col py-3">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="py-3 font-medium border-b" style={{ borderColor: 'var(--line)' }}>
                {l.label}
              </a>
            ))}
            <a href="#create" className="btn btn-primary mt-3">Start Your Legacy</a>
          </div>
        </div>
      )}
    </header>
  )
}

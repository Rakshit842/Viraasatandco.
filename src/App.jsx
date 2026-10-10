import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Security from './components/Security.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import CreateVault from './components/CreateVault.jsx'

// Two views, switched by the URL hash: "#create" is the vault page, everything else is the landing page.
const isCreate = () => window.location.hash.startsWith('#create')

export default function App() {
  const [create, setCreate] = useState(isCreate())

  useEffect(() => {
    const onHash = () => {
      const next = isCreate()
      setCreate(next)
      const id = window.location.hash.slice(1)
      // after the landing page mounts, jump to the section that was asked for
      setTimeout(() => {
        const el = id && !id.startsWith('/') ? document.getElementById(id) : null
        if (el) el.scrollIntoView()
        else window.scrollTo(0, 0)
      }, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <Navbar minimal={create} />
      <main id="top">
        {create ? (
          <CreateVault />
        ) : (
          <>
            <Hero />
            <Problem />
            <Features />
            <HowItWorks />
            <Security />
            <Faq />
            <FinalCta />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

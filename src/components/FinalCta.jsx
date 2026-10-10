import Logo from './Logo.jsx'

export default function FinalCta() {
  return (
    <section className="on-dark py-16 lg:py-20 bg-terra text-cream">
      <div className="wrap flex flex-col items-center text-center gap-6">
        <Logo size={64} tone="cream" title="" />
        <h2 className="text-3xl sm:text-4xl font-semibold leading-tight max-w-2xl">
          Someone in your family has a story only they can tell.
        </h2>
        <p className="max-w-xl" style={{ color: 'rgba(247,244,235,.92)' }}>
          Make a vault today, send one question, and hear the answer in their own voice.
        </p>
        <a href="#create" className="btn btn-cream">Create Your Vault</a>
      </div>
    </section>
  )
}

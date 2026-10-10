import { useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'viraasat-vault-v1'
const CAPACITY = 5 * 1024 * 1024 * 1024 // 5 GB shown in the preview meter
const THIS_YEAR = 2026

const GENERATIONS = [
  { id: 'great', label: 'Great-grandparents', span: 'Born before 1930', start: 1925 },
  { id: 'grand', label: 'Grandparents', span: 'Born 1930 to 1955', start: 1945 },
  { id: 'parents', label: 'Parents', span: 'Born 1955 to 1985', start: 1970 },
  { id: 'me', label: 'My generation', span: 'Born 1985 to 2005', start: 1995 },
  { id: 'children', label: 'Children', span: 'Born after 2005', start: 2012 },
  { id: 'all', label: 'The whole family', span: 'Every generation', start: 1950 },
]

const RELATIONS = ['Mother', 'Father', 'Grandmother', 'Grandfather', 'Aunt or uncle', 'Myself', 'The whole family', 'Someone else']

const KINDS = [
  { id: 'story', label: 'Story', accept: '' },
  { id: 'photo', label: 'Photo', accept: 'image/*' },
  { id: 'voice', label: 'Voice note', accept: 'audio/*' },
  { id: 'doc', label: 'Document', accept: '.pdf,.doc,.docx,image/*' },
]

const STARTERS = [
  ['Born', 0],
  ['First day of school', 6],
  ['First job', 22],
  ['Wedding', 26],
  ['A move that changed everything', 32],
]

const emptyVault = { set: false, family: '', person: '', relation: 'Grandmother', gens: [] }
const emptyDraft = { year: '', title: '', note: '', kind: 'story', file: null }

const fmtSize = (b) => {
  if (b < 1024 * 1024) return `${Math.max(1, Math.round(b / 1024))} KB`
  if (b < 1024 * 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)} MB`
  return `${(b / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

const load = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data && data.vault && Array.isArray(data.memories) ? data : null
  } catch (e) {
    return null
  }
}

export default function CreateVault() {
  const saved = useMemo(load, [])
  const [vault, setVault] = useState(saved ? saved.vault : emptyVault)
  const [memories, setMemories] = useState(saved ? saved.memories : [])

  // setup form state (kept separate so "Edit setup" can reopen it with the current values)
  const [setup, setSetup] = useState(saved ? saved.vault : emptyVault)
  const [setupErr, setSetupErr] = useState({})

  const [draft, setDraft] = useState(emptyDraft)
  const [draftErr, setDraftErr] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const [fileKey, setFileKey] = useState(0)
  const [flash, setFlash] = useState('')
  const titleRef = useRef(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ vault, memories }))
    } catch (e) {
      /* storage unavailable: the vault still works for this visit */
    }
  }, [vault, memories])

  useEffect(() => {
    if (!flash) return undefined
    const t = setTimeout(() => setFlash(''), 2600)
    return () => clearTimeout(t)
  }, [flash])

  const sorted = useMemo(() => [...memories].sort((a, b) => a.year - b.year || a.id - b.id), [memories])
  const used = memories.reduce((n, m) => n + (m.file ? m.file.size : 0), 0)
  const startYear = (vault.gens.length ? GENERATIONS.find((g) => g.id === vault.gens[0]).start : 1950)
  const genLabels = vault.gens.map((id) => GENERATIONS.find((g) => g.id === id).label)

  const input = 'w-full rounded-xl border px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-sage'
  const lab = 'block text-sm font-semibold mb-1.5'
  const bd = (bad) => ({ borderColor: bad ? '#9B3B24' : 'var(--line)' })
  const Err = ({ id, text }) =>
    text ? <p id={id} className="mt-1 text-sm font-medium" style={{ color: '#9B3B24' }}>{text}</p> : null

  /* ---------------- setup ---------------- */
  const toggleGen = (id) => {
    setSetup((s) => ({ ...s, gens: s.gens.includes(id) ? s.gens.filter((g) => g !== id) : [...s.gens, id] }))
    setSetupErr((e) => ({ ...e, gens: undefined }))
  }

  const submitSetup = (e) => {
    e.preventDefault()
    const err = {}
    if (!setup.gens.length) err.gens = 'Choose at least one generation.'
    if (!setup.person.trim()) err.person = 'Enter whose memories these are.'
    if (!setup.family.trim()) err.family = 'Enter a family name for the vault.'
    setSetupErr(err)
    if (Object.keys(err).length) return
    setVault({ ...setup, family: setup.family.trim(), person: setup.person.trim(), set: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!vault.set) {
    return (
      <section className="py-12 lg:py-16" style={{ background: 'radial-gradient(800px 380px at 85% 0%, rgba(94,100,78,.12), transparent 70%), var(--cream)' }}>
        <div className="wrap">
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-terra transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            Back to home
          </a>

          <div className="mt-6 max-w-2xl">
            <p className="eyebrow mb-3">Create your vault</p>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">Whose memories are you preserving?</h1>
            <p className="mt-4" style={{ color: 'rgba(44,38,35,.82)' }}>
              Your vault begins as a timeline stored in the cloud. Tell us who it is about and which generations it
              covers, and we will set up the years for you.
            </p>
          </div>

          <form onSubmit={submitSetup} noValidate className="mt-10 max-w-3xl card p-6 sm:p-8 flex flex-col gap-8 hover:!transform-none">
            <fieldset className="min-w-0">
              <legend className="text-lg font-semibold">Which generation do these memories belong to?</legend>
              <p className="text-sm mt-1" style={{ color: 'rgba(44,38,35,.75)' }}>Choose one or more.</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3" role="group" aria-label="Generations">
                {GENERATIONS.map((g) => {
                  const on = setup.gens.includes(g.id)
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleGen(g.id)}
                      className="text-left rounded-2xl border px-4 py-3.5 flex items-center gap-3 transition-colors"
                      style={{
                        borderColor: on ? 'var(--terra)' : 'rgba(44,38,35,.22)',
                        background: on ? 'rgba(158,103,71,.1)' : '#fff',
                        boxShadow: on ? 'inset 0 0 0 1px var(--terra)' : 'none',
                      }}
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: on ? 'var(--terra)' : 'rgba(44,38,35,.35)', background: on ? 'var(--terra)' : 'transparent' }} aria-hidden="true">
                        {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F7F4EB" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-tight">{g.label}</span>
                        <span className="block text-sm" style={{ color: 'rgba(44,38,35,.72)' }}>{g.span}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <Err id="gens-err" text={setupErr.gens} />
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="min-w-0">
                <label htmlFor="cv-person" className={lab}>Whose story is it?</label>
                <input id="cv-person" className={input} style={bd(setupErr.person)} value={setup.person} placeholder="Kamla Kapoor"
                  onChange={(e) => { setSetup({ ...setup, person: e.target.value }); setSetupErr((x) => ({ ...x, person: undefined })) }}
                  aria-invalid={!!setupErr.person} aria-describedby={setupErr.person ? 'person-err' : undefined} />
                <Err id="person-err" text={setupErr.person} />
              </div>
              <div className="min-w-0">
                <label htmlFor="cv-rel" className={lab}>They are your</label>
                <select id="cv-rel" className={input} style={{ borderColor: 'var(--line)' }} value={setup.relation} onChange={(e) => setSetup({ ...setup, relation: e.target.value })}>
                  {RELATIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="max-w-sm">
              <label htmlFor="cv-family" className={lab}>Family name for the vault</label>
              <input id="cv-family" className={input} style={bd(setupErr.family)} value={setup.family} maxLength={20} placeholder="Kapoor"
                onChange={(e) => { setSetup({ ...setup, family: e.target.value }); setSetupErr((x) => ({ ...x, family: undefined })) }}
                aria-invalid={!!setupErr.family} aria-describedby={setupErr.family ? 'family-err' : undefined} />
              <Err id="family-err" text={setupErr.family} />
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">Start my timeline</button>
              <p className="mt-3 text-xs" style={{ color: 'rgba(44,38,35,.7)' }}>
                Free to start. This preview keeps your vault in this browser only.
              </p>
            </div>
          </form>
        </div>
      </section>
    )
  }

  /* ---------------- timeline workspace ---------------- */
  const setD = (k) => (e) => {
    setDraft((d) => ({ ...d, [k]: e.target.value }))
    setDraftErr((x) => ({ ...x, [k]: undefined }))
  }

  const resetDraft = () => {
    setDraft(emptyDraft)
    setDraftErr({})
    setEditingId(null)
    setFileKey((k) => k + 1)
  }

  const submitMemory = (e) => {
    e.preventDefault()
    const err = {}
    const y = Number(draft.year)
    if (!/^\d{4}$/.test(String(draft.year).trim()) || y < 1850 || y > THIS_YEAR) err.year = `Enter a year between 1850 and ${THIS_YEAR}.`
    if (!draft.title.trim()) err.title = 'Give this memory a short title.'
    setDraftErr(err)
    if (Object.keys(err).length) return

    const item = { year: y, title: draft.title.trim(), note: draft.note.trim(), kind: draft.kind, file: draft.file }
    if (editingId) {
      setMemories((m) => m.map((x) => (x.id === editingId ? { ...x, ...item } : x)))
      setFlash('Memory updated.')
    } else {
      setMemories((m) => [...m, { id: Date.now(), ...item }])
      setFlash('Added to your timeline.')
    }
    resetDraft()
  }

  const editMemory = (m) => {
    setEditingId(m.id)
    setDraft({ year: String(m.year), title: m.title, note: m.note, kind: m.kind, file: m.file })
    setDraftErr({})
    titleRef.current?.focus()
    titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const removeMemory = (id) => {
    setMemories((m) => m.filter((x) => x.id !== id))
    setConfirmId(null)
    if (editingId === id) resetDraft()
    setFlash('Memory removed.')
  }

  const clearAll = () => {
    setMemories([])
    setVault(emptyVault)
    setSetup(emptyVault)
    setConfirmClear(false)
    resetDraft()
    window.scrollTo({ top: 0 })
  }

  const kindLabel = (id) => KINDS.find((k) => k.id === id).label
  const pct = Math.min(100, (used / CAPACITY) * 100)
  const fileAccept = KINDS.find((k) => k.id === draft.kind).accept

  return (
    <section className="py-10 lg:py-14" style={{ background: 'radial-gradient(800px 380px at 85% 0%, rgba(94,100,78,.12), transparent 70%), var(--cream)' }}>
      <div className="wrap">
        <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-terra transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          Back to home
        </a>

        {/* header */}
        <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow mb-2">Your vault · Timeline</p>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">The {vault.family} Vault</h1>
            <p className="mt-3 text-lg" style={{ color: 'rgba(44,38,35,.85)' }}>
              Memories of <strong className="font-semibold">{vault.person}</strong>
              <span style={{ color: 'rgba(44,38,35,.7)' }}> · your {vault.relation.toLowerCase()}</span>
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Generations in this vault">
              {genLabels.map((g) => (
                <li key={g} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(94,100,78,.16)', color: 'var(--sage)' }}>{g}</li>
              ))}
            </ul>
          </div>

          <div className="card p-5 w-full lg:w-[320px] hover:!transform-none">
            <div className="flex items-baseline justify-between gap-3">
              <p className="eyebrow">Cloud storage</p>
              <p className="text-sm font-semibold tabular-nums">{fmtSize(used)} of 5 GB</p>
            </div>
            <div className="mt-3 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(44,38,35,.12)' }} role="progressbar" aria-label="Storage used" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(pct)}>
              <div className="h-full rounded-full" style={{ width: `${Math.max(pct, used ? 2 : 0)}%`, background: 'var(--terra)', transition: 'width .4s ease' }} />
            </div>
            <p className="mt-2 text-xs" style={{ color: 'rgba(44,38,35,.72)' }}>
              {memories.length} {memories.length === 1 ? 'memory' : 'memories'}. Preview: attached files are counted but not uploaded.
            </p>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-12 items-start">
          {/* add / edit form */}
          <form onSubmit={submitMemory} noValidate className="card p-6 hover:!transform-none lg:sticky lg:top-24 min-w-0">
            <h2 className="text-2xl font-semibold">{editingId ? 'Edit this memory' : 'Add to the timeline'}</h2>

            {!editingId && memories.length === 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Not sure where to begin? Start with one of these.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {STARTERS.map(([t, off]) => (
                    <button key={t} type="button" className="rounded-full border px-3.5 py-2 text-sm font-medium hover:bg-black/5 transition-colors" style={{ borderColor: 'rgba(44,38,35,.3)' }}
                      onClick={() => { setDraft((d) => ({ ...d, title: t, year: String(Math.min(THIS_YEAR, startYear + off)) })); titleRef.current?.focus() }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-[110px_1fr] gap-4">
                <div className="min-w-0">
                  <label htmlFor="m-year" className={lab}>Year</label>
                  <input id="m-year" inputMode="numeric" maxLength={4} className={`${input} tabular-nums`} style={bd(draftErr.year)} value={draft.year} onChange={setD('year')} placeholder={String(startYear)} aria-invalid={!!draftErr.year} aria-describedby={draftErr.year ? 'year-err' : undefined} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="m-title" className={lab}>Title</label>
                  <input id="m-title" ref={titleRef} className={input} style={bd(draftErr.title)} value={draft.title} onChange={setD('title')} placeholder="The wedding in Amritsar" aria-invalid={!!draftErr.title} aria-describedby={draftErr.title ? 'title-err' : undefined} />
                </div>
              </div>
              <Err id="year-err" text={draftErr.year} />
              <Err id="title-err" text={draftErr.title} />

              <div>
                <span id="m-kind-l" className={lab}>What kind of memory?</span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="m-kind-l">
                  {KINDS.map((k) => (
                    <button key={k.id} type="button" role="radio" aria-checked={draft.kind === k.id}
                      onClick={() => { setDraft((d) => ({ ...d, kind: k.id, file: null })); setFileKey((n) => n + 1) }}
                      className="rounded-full border px-4 py-2 text-sm font-semibold"
                      style={draft.kind === k.id ? { background: 'var(--espresso)', color: 'var(--cream)', borderColor: 'var(--espresso)' } : { borderColor: 'rgba(44,38,35,.3)' }}>
                      {k.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="m-note" className={lab}>What happened? <span className="font-normal" style={{ color: 'rgba(44,38,35,.7)' }}>(optional)</span></label>
                <textarea id="m-note" rows={4} className={input} style={{ borderColor: 'var(--line)' }} value={draft.note} onChange={setD('note')} placeholder="Who was there, what you remember, what it meant." />
              </div>

              {draft.kind !== 'story' && (
                <div>
                  <label htmlFor="m-file" className={lab}>Attach a file <span className="font-normal" style={{ color: 'rgba(44,38,35,.7)' }}>(optional)</span></label>
                  <input
                    id="m-file" key={fileKey} type="file" accept={fileAccept}
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0]
                      setDraft((d) => ({ ...d, file: f ? { name: f.name, size: f.size } : null }))
                    }}
                    className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-espresso file:text-cream file:px-4 file:py-2 file:font-semibold file:cursor-pointer"
                  />
                  {draft.file && <p className="mt-1.5 text-sm" style={{ color: 'rgba(44,38,35,.8)' }}>{draft.file.name} · {fmtSize(draft.file.size)}</p>}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="btn btn-primary">{editingId ? 'Save changes' : 'Add memory'}</button>
              {editingId && <button type="button" className="btn btn-ghost" onClick={resetDraft}>Cancel</button>}
            </div>
            <p className="mt-3 text-sm font-semibold min-h-[1.5rem]" style={{ color: 'var(--sage)' }} role="status" aria-live="polite">{flash}</p>
          </form>

          {/* timeline */}
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-2xl font-semibold">Timeline</h2>
              <p className="text-sm tabular-nums" style={{ color: 'rgba(44,38,35,.75)' }}>
                {sorted.length ? `${sorted[0].year} to ${sorted[sorted.length - 1].year}` : 'No memories yet'}
              </p>
            </div>

            {sorted.length === 0 ? (
              <div className="rounded-3xl border border-dashed p-8 sm:p-10 text-center" style={{ borderColor: 'rgba(44,38,35,.35)' }}>
                <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(158,103,71,.14)' }} aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9E6747" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18" /><circle cx="12" cy="8" r="2.5" fill="#F7F4EB" /><circle cx="12" cy="16" r="2.5" fill="#F7F4EB" /></svg>
                </div>
                <p className="mt-4 font-display text-2xl">The timeline begins with one year.</p>
                <p className="mt-2 max-w-sm mx-auto" style={{ color: 'rgba(44,38,35,.8)' }}>
                  Add the first memory of {vault.person} and it will appear here, in order, with everything after it.
                </p>
              </div>
            ) : (
              <ol className="relative list-none p-0 m-0 flex flex-col gap-6 pl-11">
                <span className="absolute left-[15px] top-2 bottom-2 w-[2px]" style={{ background: 'linear-gradient(var(--terra), var(--sage))', opacity: 0.5 }} aria-hidden="true" />
                {sorted.map((m, i) => {
                  const tone = m.kind === 'photo' || m.kind === 'doc' ? 'var(--sage)' : 'var(--terra)'
                  return (
                    <li key={m.id} className="relative">
                      <span className="absolute -left-11 top-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--cream)', border: `3px solid ${tone}` }} aria-hidden="true">
                        <span className="w-2 h-2 rounded-full" style={{ background: tone }} />
                      </span>
                      <article className={`card p-5 hover:!transform-none ${editingId === m.id ? 'ring-2 ring-terra' : ''}`}>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="font-display text-3xl font-semibold tabular-nums leading-none" style={{ color: tone }}>{m.year}</p>
                          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: 'rgba(44,38,35,.08)' }}>{kindLabel(m.kind)}</span>
                          {i > 0 && m.year - sorted[i - 1].year > 0 && (
                            <span className="text-xs" style={{ color: 'rgba(44,38,35,.65)' }}>{m.year - sorted[i - 1].year} years after the last memory</span>
                          )}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold leading-snug">{m.title}</h3>
                        {m.note && <p className="mt-2 whitespace-pre-line break-words" style={{ color: 'rgba(44,38,35,.88)' }}>{m.note}</p>}
                        {m.file && (
                          <p className="mt-3 inline-flex items-center gap-2 text-sm rounded-lg px-3 py-1.5 max-w-full" style={{ background: 'rgba(94,100,78,.14)' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5E644E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12l-8.5 8.5a5 5 0 01-7-7L14 5a3.3 3.3 0 014.7 4.7L10 18.4a1.7 1.7 0 01-2.4-2.4L15 8.6" /></svg>
                            <span className="truncate">{m.file.name} · {fmtSize(m.file.size)}</span>
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button type="button" className="rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-black/5" style={{ borderColor: 'rgba(44,38,35,.3)' }} onClick={() => editMemory(m)}>Edit</button>
                          {confirmId === m.id ? (
                            <>
                              <button type="button" className="rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ background: '#9B3B24' }} onClick={() => removeMemory(m.id)}>Confirm delete</button>
                              <button type="button" className="rounded-full px-4 py-1.5 text-sm font-semibold" onClick={() => setConfirmId(null)}>Keep it</button>
                            </>
                          ) : (
                            <button type="button" className="rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-black/5" style={{ color: '#9B3B24' }} onClick={() => setConfirmId(m.id)}>Delete</button>
                          )}
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ol>
            )}

            <div className="mt-10 pt-6 border-t flex flex-wrap items-center gap-3" style={{ borderColor: 'var(--line)' }}>
              <button type="button" className="btn btn-ghost !py-[10px] !px-[20px]" onClick={() => { setSetup(vault); setVault({ ...vault, set: false }) }}>
                Change who or which generation
              </button>
              {confirmClear ? (
                <>
                  <button type="button" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: '#9B3B24' }} onClick={clearAll}>Yes, delete this vault</button>
                  <button type="button" className="rounded-full px-4 py-2.5 text-sm font-semibold" onClick={() => setConfirmClear(false)}>Keep it</button>
                </>
              ) : (
                <button type="button" className="rounded-full px-4 py-2.5 text-sm font-semibold hover:bg-black/5" style={{ color: '#9B3B24' }} onClick={() => setConfirmClear(true)}>Start over</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

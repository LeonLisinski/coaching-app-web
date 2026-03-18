'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

const topics = {
  hr: ['Opće pitanje', 'Tehnička podrška', 'Fakturiranje i plaćanje', 'Partnerstvo', 'Prijava greške'],
  en: ['General question', 'Technical support', 'Billing & payments', 'Partnership', 'Bug report'],
}

export default function ContactPage() {
  const locale = useLocale()
  const router = useRouter()
  const isHr = locale === 'hr'
  const otherLocale = isHr ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const navLinks = isHr
    ? [['Kako radi', '#kako-radi'], ['Mobilna app', '#funkcije'], ['Cijene', '#cijene'], ['FAQ', '#faq']]
    : [['How it works', '#kako-radi'], ['Mobile app', '#funkcije'], ['Pricing', '#cijene'], ['FAQ', '#faq']]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = isHr ? 'Unesite ime' : 'Enter your name'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = isHr ? 'Unesite valjanu email adresu' : 'Enter a valid email'
    if (!form.topic) e.topic = isHr ? 'Odaberite temu' : 'Select a topic'
    if (form.message.trim().length < 10)
      e.message = isHr ? 'Poruka mora imati najmanje 10 znakova' : 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', topic: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  const topicList = isHr ? topics.hr : topics.en

  return (
    <div className="legal-root">
      {/* Navbar */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={28} />
          <span className="nw">UnitLift</span>
        </Link>
        <ul className="navlinks">
          {navLinks.map(([label, href]) => (
            <li key={label}><a href={`/${locale}${href}`}>{label}</a></li>
          ))}
        </ul>
        <div className="navact">
          <button className="langbtn" onClick={() => router.push(`/${otherLocale}/kontakt`)}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <a href={`/${locale}`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
          <a href="https://app.unitlift.com/login" className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Prijava' : 'Login'}
          </a>
          <a href="https://app.unitlift.com/register" className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Isprobaj besplatno' : 'Try for free'}
          </a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={`/${locale}${href}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="mobc">
          <a href={`/${locale}`} className="btn btn-g btn-fw" onClick={() => setMenuOpen(false)}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          <div className="legal-badge">
            <span className="bdot" />
            {isHr ? 'Pomoć i podrška' : 'Help & Support'}
          </div>
          <h1 className="legal-title">{isHr ? 'Kontaktiraj nas' : 'Contact us'}</h1>
          <p className="legal-date">
            {isHr ? 'Odgovaramo unutar jednog radnog dana.' : 'We respond within one business day.'}
          </p>
          <div className="legal-tabs">
            <Link href={`/${locale}/blog`} className="legal-tab">Blog</Link>
            <Link href={`/${locale}/faq`} className="legal-tab">FAQ</Link>
            <Link href={`/${locale}/kontakt`} className="legal-tab active">
              {isHr ? 'Kontakt' : 'Contact'}
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body" style={{ flex: 1 }}>
        <div className="legal-body-inner">
          {/* Form */}
          <main className="legal-main">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="contact-success-ico">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" stroke="var(--ba)" strokeWidth="2" />
                    <path d="M8 14l4 4 8-8" stroke="var(--ba)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>{isHr ? 'Poruka je poslana!' : 'Message sent!'}</h3>
                <p>
                  {isHr
                    ? 'Hvala na poruci. Javljamo se unutar jednog radnog dana na email koji si naveo.'
                    : 'Thanks for reaching out. We\'ll get back to you within one business day.'}
                </p>
                <button className="btn btn-p" style={{ marginTop: '20px' }} onClick={() => setStatus('idle')}>
                  {isHr ? 'Pošalji još jednu poruku' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">{isHr ? 'Ime i prezime' : 'Full name'}</label>
                    <input
                      className={`cf-input${errors.name ? ' error' : ''}`}
                      type="text"
                      placeholder={isHr ? 'Marko Markić' : 'John Smith'}
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                    />
                    {errors.name && <span className="cf-error">{errors.name}</span>}
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Email</label>
                    <input
                      className={`cf-input${errors.email ? ' error' : ''}`}
                      type="email"
                      placeholder="marko@email.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                    />
                    {errors.email && <span className="cf-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="cf-field">
                  <label className="cf-label">{isHr ? 'Tema' : 'Topic'}</label>
                  <select
                    className={`cf-input${errors.topic ? ' error' : ''}`}
                    value={form.topic}
                    onChange={e => set('topic', e.target.value)}
                  >
                    <option value="">{isHr ? 'Odaberi temu…' : 'Select topic…'}</option>
                    {topicList.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.topic && <span className="cf-error">{errors.topic}</span>}
                </div>
                <div className="cf-field">
                  <label className="cf-label">{isHr ? 'Poruka' : 'Message'}</label>
                  <textarea
                    className={`cf-input cf-textarea${errors.message ? ' error' : ''}`}
                    placeholder={isHr ? 'Opiši svoju situaciju ili pitanje…' : 'Describe your situation or question…'}
                    rows={6}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                  />
                  {errors.message && <span className="cf-error">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <div className="cf-send-error">
                    {isHr
                      ? 'Slanje nije uspjelo. Pokušaj ponovo ili nam se javi direktno na support@unitlift.com'
                      : 'Sending failed. Please try again or contact us at support@unitlift.com'}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-p btn-lg"
                  disabled={status === 'loading'}
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading'
                    ? (isHr ? 'Šalje se…' : 'Sending…')
                    : (isHr ? 'Pošalji poruku →' : 'Send message →')}
                </button>
              </form>
            )}
          </main>

          {/* Sidebar */}
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              <div className="legal-toc-title">
                {isHr ? 'Kontakt info' : 'Contact info'}
              </div>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-ico">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4l6 5 6-5M2 4h12v9H2V4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info-lbl">Email</div>
                    <a href="mailto:support@unitlift.com" className="contact-info-val">support@unitlift.com</a>
                  </div>
                </div>
              </div>

              {/* FAQ CTA — prominent */}
              <div className="contact-faq-cta">
                <div className="contact-faq-cta-inner">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="10" cy="10" r="9" stroke="var(--ba)" strokeWidth="1.5" />
                    <path d="M10 13v.5M10 6.5c1.1 0 2 .9 2 2 0 1.5-2 2-2 2.5" stroke="var(--ba)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div>
                    <div className="contact-faq-cta-title">
                      {isHr ? 'Možda je odgovor već tu' : 'Your answer might already be here'}
                    </div>
                    <p className="contact-faq-cta-text">
                      {isHr
                        ? 'Provjeri FAQ s 24 odgovora na najčešća pitanja o UnitLiftu.'
                        : 'Check our FAQ with 24 answers to the most common questions.'}
                    </p>
                  </div>
                </div>
                <Link href={`/${locale}/faq`} className="btn btn-p btn-fw" style={{ fontSize: '.82rem', marginTop: '14px' }}>
                  {isHr ? 'Pogledaj FAQ →' : 'Browse FAQ →'}
                </Link>
              </div>

              <div className="legal-toc-back">
                <a href={`/${locale}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M6 2L1 7l5 5M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {isHr ? 'Na glavnu stranicu' : 'Back to homepage'}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="legal-footer-bar">
        <div className="con">
          <div className="legal-footer-row">
            <a href={`/${locale}`} className="fl-logo">
              <LogoSvg height={20} />
              <span>UnitLift</span>
            </a>
            <div className="legal-footer-links">
              <Link href={`/${locale}/faq`}>FAQ</Link>
              <Link href={`/${locale}/kontakt`}>{isHr ? 'Kontakt' : 'Contact'}</Link>
              <Link href={`/${locale}/uvjeti`}>{isHr ? 'Uvjeti korištenja' : 'Terms'}</Link>
              <Link href={`/${locale}/privatnost`}>{isHr ? 'Privatnost' : 'Privacy'}</Link>
            </div>
            <span className="legal-footer-copy">© 2026 UnitDuo, vl. Leon Lišinski</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

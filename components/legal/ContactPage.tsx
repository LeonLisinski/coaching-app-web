'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

export default function ContactPage() {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const navLabels = t.raw('nav') as string[]
  const navLinks = [
    [t('common.navBack'), `/${locale}`],
    [navLabels[0], `/${locale}/kako-radi`],
    [navLabels[1], `/${locale}#funkcije`],
    [navLabels[2], `/${locale}/cijene`],
    ['Blog', `/${locale}/blog`],
    ['FAQ', `/${locale}/faq`],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = t('contact.nameErr')
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = t('contact.emailErr')
    if (!form.topic) e.topic = t('contact.topicErr')
    if (form.message.trim().length < 10)
      e.message = t('contact.msgErr')
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

  const topicList = t.raw('contact.topics') as string[]

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/kontakt`)
  }

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
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="navact">
          <button className="langbtn navlang" onClick={switchLang}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <a href={`${APP_URL}/login`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('login')}
          </a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('common.tryFree')}
          </a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label={t('common.menuAria')}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <button className="langbtn mobc" onClick={() => { switchLang(); setMenuOpen(false) }}>
          {t('common.langSwitchLabel')} {otherLocale.toUpperCase()}
        </button>
      </div>

      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          <div className="legal-badge">
            <span className="bdot" />
            {t('contact.badge')}
          </div>
          <h1 className="legal-title">{t('contact.heroTitle')}</h1>
          <p className="legal-date">{t('contact.heroSub')}</p>
          <div className="legal-tabs">
            <Link href={`/${locale}/blog`} className="legal-tab">Blog</Link>
            <Link href={`/${locale}/faq`} className="legal-tab">FAQ</Link>
            <Link href={`/${locale}/kontakt`} className="legal-tab active">
              {t('contact.tab')}
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
                <h3>{t('contact.successTitle')}</h3>
                <p>{t('contact.successText')}</p>
                <button className="btn btn-p" style={{ marginTop: '20px' }} onClick={() => setStatus('idle')}>
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">{t('contact.nameLbl')}</label>
                    <input
                      className={`cf-input${errors.name ? ' error' : ''}`}
                      type="text"
                      placeholder={t('contact.namePh')}
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
                  <label className="cf-label">{t('contact.topicLbl')}</label>
                  <select
                    className={`cf-input${errors.topic ? ' error' : ''}`}
                    value={form.topic}
                    onChange={e => set('topic', e.target.value)}
                  >
                    <option value="">{t('contact.topicPh')}</option>
                    {topicList.map(topic => <option key={topic} value={topic}>{topic}</option>)}
                  </select>
                  {errors.topic && <span className="cf-error">{errors.topic}</span>}
                </div>
                <div className="cf-field">
                  <label className="cf-label">{t('contact.msgLbl')}</label>
                  <textarea
                    className={`cf-input cf-textarea${errors.message ? ' error' : ''}`}
                    placeholder={t('contact.msgPh')}
                    rows={6}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                  />
                  {errors.message && <span className="cf-error">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <div className="cf-send-error">{t('contact.sendErr')}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-p btn-lg"
                  disabled={status === 'loading'}
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? t('contact.sending') : t('contact.send')}
                </button>
              </form>
            )}
          </main>

          {/* Sidebar */}
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              <div className="legal-toc-title">{t('contact.infoTitle')}</div>

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

              <div className="contact-faq-cta">
                <div className="contact-faq-cta-inner">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="10" cy="10" r="9" stroke="var(--ba)" strokeWidth="1.5" />
                    <path d="M10 13v.5M10 6.5c1.1 0 2 .9 2 2 0 1.5-2 2-2 2.5" stroke="var(--ba)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div>
                    <div className="contact-faq-cta-title">{t('contact.faqCtaTitle')}</div>
                    <p className="contact-faq-cta-text">{t('contact.faqCtaText')}</p>
                  </div>
                </div>
                <Link href={`/${locale}/faq`} className="btn btn-p btn-fw" style={{ fontSize: '.82rem', marginTop: '14px' }}>
                  {t('contact.faqCtaBtn')}
                </Link>
              </div>

              <div className="legal-toc-back">
                <a href={`/${locale}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M6 2L1 7l5 5M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('contact.backHome')}
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
              <Link href={`/${locale}/kontakt`}>{t('common.contact')}</Link>
              <Link href={`/${locale}/uvjeti`}>{t('common.termsShort')}</Link>
              <Link href={`/${locale}/privatnost`}>{t('common.privacy')}</Link>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

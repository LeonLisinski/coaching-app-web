'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import type { FAQData } from '@/lib/faq/types'

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function FAQPage({ data }: { data: FAQData }) {
  const locale = useLocale()
  const router = useRouter()
  const isHr = locale === 'hr'
  const otherLocale = isHr ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(data.categories[0]?.id ?? '')
  const [openItem, setOpenItem] = useState<string | null>(null)

  const navLinks = isHr
    ? [['Kako radi', `/${locale}/kako-radi`], ['Mobilna app', `/${locale}#funkcije`], ['Cijene', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]
    : [['How it works', `/${locale}/kako-radi`], ['Mobile app', `/${locale}#funkcije`], ['Pricing', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = data.categories.map(c => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [data.categories])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
  }

  const toggle = (key: string) => setOpenItem(prev => prev === key ? null : key)

  const totalQ = data.categories.reduce((s, c) => s + c.questions.length, 0)

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
          <button className="langbtn navlang" onClick={() => router.push(`/${otherLocale}/faq`)}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <a href={`/${locale}`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
          <a href="https://app.unitlift.com/login" className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Prijava' : 'Login'}
          </a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Isprobaj besplatno' : 'Try for free'}
          </a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="mobc">
          <a href={`/${locale}`} className="btn btn-g btn-fw" onClick={() => setMenuOpen(false)}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
        </div>
        <button className="langbtn mobc" onClick={() => { router.push(`/${otherLocale}/faq`); setMenuOpen(false) }}>
          {isHr ? `Jezik: ${otherLocale.toUpperCase()}` : `Language: ${otherLocale.toUpperCase()}`}
        </button>
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
          <h1 className="legal-title">{data.title}</h1>
          <p className="legal-date">{data.subtitle}</p>
          <div className="legal-tabs">
            <Link href={`/${locale}/blog`} className="legal-tab">Blog</Link>
            <Link href={`/${locale}/faq`} className="legal-tab active">FAQ</Link>
            <Link href={`/${locale}/kontakt`} className="legal-tab">
              {isHr ? 'Kontakt' : 'Contact'}
            </Link>
          </div>
          <div className="faq-stats">
            <span><strong>{data.categories.length}</strong> {isHr ? 'kategorija' : 'categories'}</span>
            <span className="faq-stats-sep">·</span>
            <span><strong>{totalQ}</strong> {isHr ? 'pitanja' : 'questions'}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body">
        <div className="legal-body-inner">
          <main className="legal-main">
            {data.categories.map(cat => (
              <section key={cat.id} id={cat.id} className="legal-section faq-cat">
                <h2>{cat.title}</h2>
                <div className="faq-page-list">
                  {cat.questions.map((faq, i) => {
                    const key = `${cat.id}-${i}`
                    const isOpen = openItem === key
                    return (
                      <div key={key} className={`faq-page-item${isOpen ? ' open' : ''}`}>
                        <button className="faq-page-q" onClick={() => toggle(key)}>
                          <span>{faq.q}</span>
                          <span className="faqico"><PlusIcon /></span>
                        </button>
                        <div className="faq-page-a">{faq.a}</div>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}

            <div className="legal-footer-note">
              <span>{isHr ? 'Ne nalaziš odgovor?' : 'Can\'t find an answer?'}</span>
              <Link href={`/${locale}/kontakt`} style={{ color: 'var(--ba)', textDecoration: 'none', fontWeight: 600 }}>
                {isHr ? 'Kontaktiraj nas →' : 'Contact us →'}
              </Link>
            </div>
          </main>

          {/* Sticky TOC */}
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              <div className="legal-toc-title">{isHr ? 'Kategorije' : 'Categories'}</div>
              <div className="legal-toc-nav">
                {data.categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`legal-toc-item${activeSection === cat.id ? ' active' : ''}`}
                    onClick={() => scrollTo(cat.id)}
                  >
                    {cat.title}
                    <span className="toc-count">{cat.questions.length}</span>
                  </button>
                ))}
              </div>
              <div className="legal-toc-back">
                <Link href={`/${locale}/kontakt`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {isHr ? 'Postavi pitanje' : 'Ask a question'}
                </Link>
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

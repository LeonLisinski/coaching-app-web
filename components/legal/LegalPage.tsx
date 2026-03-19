'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import type { LegalDocument } from '@/lib/legal/types'

interface LegalPageProps {
  doc: LegalDocument
  docType: 'terms' | 'privacy'
}

export default function LegalPage({ doc, docType }: LegalPageProps) {
  const locale = useLocale()
  const router = useRouter()
  const [activeId, setActiveId] = useState<string>(doc.sections[0]?.id ?? '')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

  const isHr = locale === 'hr'
  const otherLocale = isHr ? 'en' : 'hr'
  // Routes are always /uvjeti and /privatnost for both locales
  const termsSlug = '/uvjeti'
  const privacySlug = '/privatnost'
  const currentSlug = docType === 'terms' ? termsSlug : privacySlug

  const mainNavLinks = isHr
    ? [['Kako radi', `/${locale}/kako-radi`], ['Mobilna app', `/${locale}#funkcije`], ['Cijene', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]
    : [['How it works', `/${locale}/kako-radi`], ['Mobile app', `/${locale}#funkcije`], ['Pricing', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionEls = doc.sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!sectionEls.length) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )
    sectionEls.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [doc.sections])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 90
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="legal-root">
      {/* ─── Navbar ─── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={28} />
          <span className="nw">UnitLift</span>
        </Link>

        <ul className="navlinks">
          {mainNavLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="navact">
          <button
            className="langbtn navlang"
            onClick={() => router.push(`/${otherLocale}${currentSlug}`)}
          >
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

      {/* Mobile menu */}
      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {mainNavLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <div className="mobc" style={{ display: 'flex', gap: '8px' }}>
          <a href={`/${locale}`} className="btn btn-g btn-fw" onClick={() => setMenuOpen(false)}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
        </div>
        <button className="langbtn mobc" onClick={() => { router.push(`/${otherLocale}${currentSlug}`); setMenuOpen(false) }}>
          {isHr ? `Jezik: ${otherLocale.toUpperCase()}` : `Language: ${otherLocale.toUpperCase()}`}
        </button>
      </div>

      {/* ─── Hero Header ─── */}
      <div className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          <div className="legal-badge">
            <span className="bdot" />
            {isHr ? 'Pravni dokumenti' : 'Legal documents'}
          </div>
          <h1 className="legal-title">{doc.title}</h1>
          <p className="legal-date">
            {isHr ? 'Zadnja izmjena:' : 'Last updated:'} <strong>{doc.lastUpdated}</strong>
          </p>
          {/* Doc type tabs */}
          <div className="legal-tabs">
            <Link
              href={`/${locale}${termsSlug}`}
              className={`legal-tab${docType === 'terms' ? ' active' : ''}`}
            >
              {isHr ? 'Uvjeti korištenja' : 'Terms of Service'}
            </Link>
            <Link
              href={`/${locale}${privacySlug}`}
              className={`legal-tab${docType === 'privacy' ? ' active' : ''}`}
            >
              {isHr ? 'Politika privatnosti' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="legal-body">
        <div className="legal-body-inner">
          {/* Main content */}
          <main className="legal-main">
            {/* Callout */}
            <div className="legal-callout">{doc.callout}</div>

            {doc.sections.map(section => (
              <section key={section.id} id={section.id} className="legal-section">
                <h2>{section.title}</h2>
                {section.content.map((item, i) => {
                  if (item.subsection) {
                    return <h3 key={i}>{item.subsection}</h3>
                  }
                  if (item.note) {
                    return (
                      <div key={i} className="legal-note">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity=".5"/>
                          <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>{item.note}</span>
                      </div>
                    )
                  }
                  if (item.items) {
                    return (
                      <ul key={i} className="legal-list">
                        {item.items.map((li, j) => <li key={j}>{li}</li>)}
                      </ul>
                    )
                  }
                  if (item.text) {
                    return <p key={i}>{item.text}</p>
                  }
                  return null
                })}
              </section>
            ))}

            <div className="legal-footer-note">
              <span>{isHr ? 'Verzija' : 'Version'} {doc.version} &nbsp;·&nbsp; {doc.lastUpdated}</span>
              <a href="mailto:support@unitlift.com">support@unitlift.com</a>
            </div>
          </main>

          {/* Sticky TOC */}
          <aside className="legal-toc" ref={tocRef}>
            <div className="legal-toc-sticky">
              <div className="legal-toc-title">
                {isHr ? 'Sadržaj' : 'Contents'}
              </div>
              <div className="legal-toc-nav">
                {doc.sections.map(s => (
                  <button
                    key={s.id}
                    className={`legal-toc-item${activeId === s.id ? ' active' : ''}`}
                    onClick={() => scrollToSection(s.id)}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <div className="legal-toc-back">
                <a href={`/${locale}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M6 2L1 7l5 5M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {isHr ? 'Na glavnu stranicu' : 'Back to homepage'}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Footer (minimal) ─── */}
      <footer className="legal-footer-bar">
        <div className="con">
          <div className="legal-footer-row">
            <a href={`/${locale}`} className="fl-logo">
              <LogoSvg height={20} />
              <span>UnitLift</span>
            </a>
            <div className="legal-footer-links">
              <Link href={`/${locale}${termsSlug}`}>
                {isHr ? 'Uvjeti korištenja' : 'Terms of Service'}
              </Link>
              <Link href={`/${locale}${privacySlug}`}>
                {isHr ? 'Politika privatnosti' : 'Privacy Policy'}
              </Link>
              <a href="mailto:support@unitlift.com">support@unitlift.com</a>
            </div>
            <span className="legal-footer-copy">
              © 2026 UnitDuo, vl. Leon Lišinski
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

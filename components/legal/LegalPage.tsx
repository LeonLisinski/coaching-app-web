'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
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
  const t = useTranslations()
  const router = useRouter()
  const [activeId, setActiveId] = useState<string>(doc.sections[0]?.id ?? '')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

  const otherLocale = locale === 'hr' ? 'en' : 'hr'
  const termsSlug = '/uvjeti'
  const privacySlug = '/privatnost'
  const currentSlug = docType === 'terms' ? termsSlug : privacySlug

  const navLabels = t.raw('nav') as string[]
  const mainNavLinks = [
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
      const top = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}${currentSlug}`)
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
          {mainNavLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="navact">
          <button className="langbtn navlang" onClick={switchLang}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <a href="https://app.unitlift.com/login" className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
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

      {/* Mobile menu */}
      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {mainNavLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
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
            {t('legalPage.badge')}
          </div>
          <h1 className="legal-title">{doc.title}</h1>
          <p className="legal-date">
            {t('common.lastUpdated')} <strong>{doc.lastUpdated}</strong>
          </p>
          <div className="legal-tabs">
            <Link
              href={`/${locale}${termsSlug}`}
              className={`legal-tab${docType === 'terms' ? ' active' : ''}`}
            >
              {t('legalPage.termsTitle')}
            </Link>
            <Link
              href={`/${locale}${privacySlug}`}
              className={`legal-tab${docType === 'privacy' ? ' active' : ''}`}
            >
              {t('legalPage.privacyTitle')}
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body">
        <div className="legal-body-inner">
          <main className="legal-main">
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
              <span>{t('common.version')} {doc.version} &nbsp;·&nbsp; {doc.lastUpdated}</span>
              <a href="mailto:support@unitlift.com">support@unitlift.com</a>
            </div>
          </main>

          {/* Sticky TOC */}
          <aside className="legal-toc" ref={tocRef}>
            <div className="legal-toc-sticky">
              <div className="legal-toc-title">{t('legalPage.tocTitle')}</div>
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
                  {t('legalPage.backHome')}
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
              <Link href={`/${locale}${termsSlug}`}>{t('legalPage.termsTitle')}</Link>
              <Link href={`/${locale}${privacySlug}`}>{t('legalPage.privacyTitle')}</Link>
              <a href="mailto:support@unitlift.com">support@unitlift.com</a>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

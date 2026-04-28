'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import type { FAQData } from '@/lib/faq/types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function FAQPage({ data }: { data: FAQData }) {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(data.categories[0]?.id ?? '')
  const [openItem, setOpenItem] = useState<string | null>(null)

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

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/faq`)
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
            {t('faqPage.badge')}
          </div>
          <h1 className="legal-title">{data.title}</h1>
          <p className="legal-date">{data.subtitle}</p>
          <div className="legal-tabs">
            <Link href={`/${locale}/blog`} className="legal-tab">Blog</Link>
            <Link href={`/${locale}/faq`} className="legal-tab active">FAQ</Link>
            <Link href={`/${locale}/kontakt`} className="legal-tab">
              {t('common.contact')}
            </Link>
          </div>
          <div className="faq-stats">
            <span><strong>{data.categories.length}</strong> {t('faqPage.catLbl')}</span>
            <span className="faq-stats-sep">·</span>
            <span><strong>{totalQ}</strong> {t('faqPage.qLbl')}</span>
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
              <span>{t('faqPage.notFound')}</span>
              <Link href={`/${locale}/kontakt`} style={{ color: 'var(--ba)', textDecoration: 'none', fontWeight: 600 }}>
                {t('faqPage.contactUs')}
              </Link>
            </div>
          </main>

          {/* Sticky TOC */}
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              <div className="legal-toc-title">{t('faqPage.tocTitle')}</div>
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
                  {t('faqPage.askQuestion')}
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

'use client'

import { useState, useEffect } from 'react'

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

export default function HowItWorksPage() {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const steps = t.raw('howItWorksPage.steps') as Array<{ n: string; t: string; d: string }>
  const coachFeats = t.raw('howItWorksPage.coachFeats') as string[]
  const clientFeats = t.raw('howItWorksPage.clientFeats') as string[]
  const bottomFaqs = t.raw('howItWorksPage.bottomFaqs') as Array<{ q: string; a: string }> | undefined
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/kako-radi`)
  }

  return (
    <div className="legal-root">
      {/* Navbar */}
      <nav className={scrolled ? 'scrolled' : ''} style={{ background: scrolled ? 'rgba(10,16,36,.97)' : 'rgba(10,16,36,.9)' }}>
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
          <a href="https://app.unitlift.com/login" className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('login')}
          </a>
          <a href={`/${locale}#cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('common.tryFree')}
          </a>
          <button className="langbtn navlang" onClick={switchLang}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label={t('common.menuAria')}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="https://app.unitlift.com/login" onClick={() => setMenuOpen(false)}>{t('login')}</a>
        <a href={`/${locale}#cijene`} className="btn btn-p btn-fw mobc" onClick={() => setMenuOpen(false)}>
          {t('common.tryFree')}
        </a>
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
            {t('howItWorksPage.badge')}
          </div>
          <h1 className="legal-title">{t('howItWorksPage.heroTitle')}</h1>
          <p className="legal-date">{t('howItWorksPage.heroSub')}</p>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body">
        <div className="con">

          {/* Section 1: For coaches */}
          <div className="hiw-section">
            <div className="legal-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="bdot" />
              {t('howItWorksPage.coachBadge')}
            </div>
            <h2 className="hiw-h2">{t('howItWorksPage.coachH2')}</h2>
            <p className="hiw-p">{t('howItWorksPage.coachP')}</p>
            <div className="hiw-features">
              {coachFeats.map((feat, i) => (
                <div key={i} className="hiw-feat">
                  <span className="hiw-check">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <p className="hiw-quote">{t('howItWorksPage.coachQuote')}</p>
          </div>

          {/* Section 2: For clients */}
          <div className="hiw-section">
            <div className="legal-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="bdot" />
              {t('howItWorksPage.clientBadge')}
            </div>
            <h2 className="hiw-h2">{t('howItWorksPage.clientH2')}</h2>
            <p className="hiw-p">{t('howItWorksPage.clientP')}</p>
            <div className="hiw-features">
              {clientFeats.map((feat, i) => (
                <div key={i} className="hiw-feat">
                  <span className="hiw-check">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <p className="hiw-quote">{t('howItWorksPage.clientQuote')}</p>
          </div>

          {/* Section 3: 3 steps */}
          <div className="hiw-section">
            <div className="legal-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="bdot" />
              {t('howItWorksPage.startBadge')}
            </div>
            <h2 className="hiw-h2">{t('howItWorksPage.startH2')}</h2>
            <p className="hiw-p">{t('howItWorksPage.startP')}</p>
            <div className="hiw-steps">
              {steps.map((step, i) => (
                <div key={i} className="hiw-step">
                  <div className="hiw-step-num">{step.n}</div>
                  <div className="hiw-step-content">
                    <h3 className="hiw-step-t">{step.t}</h3>
                    <p className="hiw-step-d">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="hiw-cta">
            <h2 className="hiw-cta-t">{t('howItWorksPage.ctaTitle')}</h2>
            <p className="hiw-cta-s">{t('howItWorksPage.ctaSub')}</p>
            <Link href={`/${locale}/cijene`} className="btn btn-p btn-xl">
              {t('howItWorksPage.ctaBtn')}
            </Link>
            <p style={{ marginTop: '14px', fontSize: '.78rem', color: 'rgba(255,255,255,.45)' }}>
              {t('howItWorksPage.ctaNote')}
            </p>
          </div>

          {bottomFaqs && bottomFaqs.length > 0 && (
            <div className="hiw-section" style={{ marginTop: '48px' }}>
              <h2 className="hiw-h2" style={{ marginBottom: '20px' }}>{t('howItWorksPage.bottomFaqTitle')}</h2>
              <div className="faq-list">
                {bottomFaqs.map((faq, i) => (
                  <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                    <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{faq.q}</span>
                      <span className="faqico">
                        <PlusIcon />
                      </span>
                    </button>
                    <div className="faq-a">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              <Link href={`/${locale}/kako-radi`}>{navLabels[0]}</Link>
              <Link href={`/${locale}/cijene`}>{navLabels[2]}</Link>
              <Link href={`/${locale}/faq`}>FAQ</Link>
              <Link href={`/${locale}/kontakt`}>{t('common.contact')}</Link>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

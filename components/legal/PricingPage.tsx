'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

const PLANS = ['starter', 'pro', 'scale'] as const
const PRICES = [29, 59, 99]
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

export default function PricingPage() {
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

  const tiers = (t.raw('tiers') as Array<{
    name: string; price: number; clients: string; feats: string[]; btn: string
  }>).map((tier, i) => ({
    ...tier,
    popular: i === 1,
    note: i === 2 ? t('scaleNote') : null,
  }))

  const baseFeats = t.raw('baseFeats') as string[]
  const advCards = t.raw('pricingPage.advCards') as Array<{ title: string; desc: string }>
  const stats = t.raw('pricingPage.stats') as [string, string][]

  const IcoCheckin = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  const IcoPhone   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/></svg>
  const IcoMoney   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  const IcoApps    = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17h7M17 14v7"/></svg>
  const IcoChart   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  const IcoLock    = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  const icons = [IcoCheckin, IcoPhone, IcoMoney, IcoApps, IcoChart, IcoLock]

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/cijene`)
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
          <a href={`${APP_URL}/login`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('login')}
          </a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
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
        <a href={`${APP_URL}/login`} onClick={() => setMenuOpen(false)}>{t('login')}</a>
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
            {t('pricingPage.badge')}
          </div>
          <h1 className="legal-title">{t('pricingPage.heroTitle')}</h1>
          <p className="legal-date">{t('pricingPage.heroSub')}</p>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body" style={{ background: '#ffffff' }}>
        <div className="con">

          {/* Intro */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 800, color: 'var(--lt)', marginBottom: '12px', letterSpacing: '-.5px' }}>
              {t('priceTit')}
            </h2>
            <p style={{ color: 'var(--ls)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              {t('priceSub')}
            </p>
          </div>

          {/* Pricing cards */}
          <div className="pg pricing-page-grid" style={{ marginTop: 0 }}>
            {tiers.map((tier, i) => (
              <div key={i} className={`pc pricing-page-card ${['basic', 'pop', 'elite'][i]}`} style={{ paddingTop: tier.popular ? '50px' : undefined }}>
                {tier.popular && <div className="popbdg">{t('pop')}</div>}
                <div className="ptier">{tier.name}</div>
                <div className="pamt">€<span>{PRICES[i]}</span><span className="psmall">/{t('common.monthSuffix')}</span></div>
                <div className="pper" style={{ marginBottom: '22px' }}>{tier.clients}</div>
                <div className="pdiv" />
                <ul className="pfeats">
                  {tier.feats.map((feat, j) => (
                    <li key={j}><span className="pchk">✓</span>{feat}</li>
                  ))}
                  {baseFeats.map((feat, j) => (
                    <li key={`base-${j}`} className="pfeat-muted">
                      <span className="pchk pchk-muted">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                {tier.note && (
                  <p style={{ marginBottom: '12px', fontSize: '.75rem', color: 'var(--lt)', textAlign: 'center', lineHeight: 1.5 }}>
                    {tier.note}
                  </p>
                )}
                <a
                  href={`${APP_URL}/register?plan=${PLANS[i]}`}
                  className="btn btn-p btn-fw"
                  style={{ textAlign: 'center' }}
                >
                  {tier.btn}
                </a>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--ls)', fontSize: '.83rem' }}>
            {t('priceNote')}
          </p>

          {/* Stats row */}
          <div className="pp-stats-row">
            {stats.map(([val, lbl]) => (
              <div key={lbl} className="pp-stat">
                <span className="pp-stat-val">{val}</span>
                <span className="pp-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          {/* Advantages */}
          <div className="pp-advantages" style={{ background: '#fff', border: '1px solid var(--lb)' }}>
            <h2 className="pp-adv-h2" style={{ color: 'var(--lt)', marginBottom: '8px' }}>
              {t('pricingPage.whyTitle')}
            </h2>
            <p style={{ color: 'var(--ls)', fontSize: '.88rem', marginBottom: '28px', lineHeight: 1.6 }}>
              {t('pricingPage.whySub')}
            </p>
            <div className="pp-adv-grid-rich">
              {advCards.map(({ title, desc }, i) => (
                <div key={title} className="pp-adv-card">
                  <div className="pp-adv-icon">{icons[i]}</div>
                  <div>
                    <div className="pp-adv-card-title">{title}</div>
                    <div className="pp-adv-card-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner section */}
          <div className="pp-partner" style={{ background: 'var(--bdk)' }}>
            <div className="pp-partner-inner">
              <div>
                <h3 className="pp-partner-h">{t('pricingPage.partnerTitle')}</h3>
                <p className="pp-partner-p">{t('pricingPage.partnerText')}</p>
              </div>
              <a href="mailto:info@unitlift.com" className="btn btn-g">
                {t('pricingPage.partnerBtn')}
              </a>
            </div>
          </div>

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

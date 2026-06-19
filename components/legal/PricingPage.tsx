'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import LegalNavbar from './LegalNavbar'

import { PLANS, PRICES } from '@/lib/pricing-config'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.unitlift.com'

export default function PricingPage() {
  const locale = useLocale()
  const t = useTranslations()

  const tiers = (t.raw('tiers') as Array<{
    name: string; price: number; clients: string; desc: string; feats: string[]; btn: string
  }>).map((tier, i) => ({
    ...tier,
    popular: i === 1,
  }))

  const navLabels = t.raw('nav') as string[]

  const baseFeats = t.raw('baseFeats') as string[]
  const advCards = t.raw('pricingPage.advCards') as Array<{ title: string; desc: string }>
  const stats = t.raw('pricingPage.stats') as [string, string][]

  const includedCoaching = t.raw('includedCoaching') as string[]
  const includedClients  = t.raw('includedClients')  as string[]
  const includedBusiness = t.raw('includedBusiness') as string[]

  const IcoCheckin = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  const IcoPhone   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/></svg>
  const IcoMoney   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  const IcoApps    = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17h7M17 14v7"/></svg>
  const IcoChart   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  const IcoLock    = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  const icons = [IcoCheckin, IcoPhone, IcoMoney, IcoApps, IcoChart, IcoLock]

  return (
    <div className="legal-root">
      <LegalNavbar switchPath="/cijene" />

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
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
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
              <div key={i} className={`pc pricing-page-card ${['basic', 'pop', 'elite'][i]}`}
                style={{ paddingTop: tier.popular ? '50px' : undefined, position: 'relative' }}>
                {tier.popular && <div className="popbdg">{t('pop')}</div>}

                <div className="ptier">{tier.name}</div>

                <div className="pamt">€<span>{PRICES[PLANS[i]]}</span><span className="psmall">/{t('common.monthSuffix')}</span></div>

                <div className="pper" style={{ marginBottom: '8px' }}>{tier.clients}</div>
                {tier.desc && (
                  <p style={{ fontSize: '.82rem', color: 'var(--ls)', marginBottom: '18px', lineHeight: 1.5 }}>{tier.desc}</p>
                )}
                <div className="pdiv" />
                <ul className="pfeats">
                  {baseFeats.map((feat, j) => (
                    <li key={j}><span className="pchk">✓</span>{feat}</li>
                  ))}
                </ul>
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

          {/* Scale overage note */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: 'var(--ls)', fontSize: '.8rem', margin: 0 }}>
              {t('scaleNote')}
            </p>
          </div>

          {/* Stats row */}
          <div className="pp-stats-row" style={{ marginTop: '40px' }}>
            {stats.map(([val, lbl]) => (
              <div key={lbl} className="pp-stat">
                <span className="pp-stat-val">{val}</span>
                <span className="pp-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          {/* All included grid */}
          <div style={{ marginTop: '56px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', fontWeight: 800, color: 'var(--lt)', textAlign: 'center', marginBottom: '32px', letterSpacing: '-.4px' }}>
              {t('allIncludedTitle')}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 220px))', gap: '40px' }}>
                {[
                  { title: t('includedCoachingTitle'), items: includedCoaching },
                  { title: t('includedClientsTitle'),  items: includedClients  },
                  { title: t('includedBusinessTitle'), items: includedBusiness },
                ].map(col => (
                  <div key={col.title}>
                    <p style={{ fontWeight: 700, fontSize: '.8rem', letterSpacing: '.08em', textTransform: 'uppercase', color: '#0066ff', marginBottom: '14px' }}>
                      {col.title}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {col.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '.88rem', color: 'var(--lt)', lineHeight: 1.4 }}>
                          <span style={{ color: '#0066ff', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '.8rem', color: 'var(--ls)' }}>
              {t('includedExtras')}
            </p>
          </div>

          {/* Advantages */}
          <div className="pp-advantages" style={{ background: '#fff', border: '1px solid var(--lb)', marginTop: '40px' }}>
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

          {/* Price note */}
          <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--ls)', fontSize: '.83rem' }}>
            {t('priceNote')}
          </p>

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



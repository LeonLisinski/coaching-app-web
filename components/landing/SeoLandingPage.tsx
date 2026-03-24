'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'
import Navbar from './Navbar'
import Testimonials from './Testimonials'
import Pricing from './Pricing'
import CTA from './CTA'
import Footer from './Footer'
import RevealObserver from './RevealObserver'
import WaveDivider from './WaveDivider'

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function SeoLandingPage() {
  const t      = useTranslations('seoPage')
  const locale = useLocale()
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const problemRef  = useReveal<HTMLElement>()
  const featRef     = useReveal<HTMLElement>()
  const usecaseRef  = useReveal<HTMLElement>()

  const mockupClients = t.raw('mockupClients') as Array<{ initials: string; name: string; sub: string; status: string; type: string }>
  const problemCards  = t.raw('problemCards')  as Array<{ icon: string; title: string; text: string }>
  const features      = t.raw('features')      as Array<{ icon: string; title: string; desc: string }>
  const featVisItems  = t.raw('featVisualItems') as Array<{ initials: string; name: string; meta: string; badge: string; type: string }>
  const usecases      = t.raw('usecases')      as Array<{ num: string; title: string; text: string }>
  const faqs          = t.raw('faqs')          as Array<{ q: string; a: string }>

  const statusStyle = (type: string) => {
    if (type === 'ok')   return { background: 'rgba(0,102,255,.12)', color: '#4488ff' }
    if (type === 'warn') return { background: 'rgba(234,170,50,.12)', color: '#e09010' }
    return { background: 'rgba(220,60,60,.10)', color: '#e05050' }
  }

  const avatarColors = ['#4488ff', '#7dd3fc', '#f9a8d4', '#a78bfa', '#6ee7b7']

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UnitLift',
    applicationCategory: 'BusinessApplication',
    description: locale === 'hr'
      ? 'Platforma za online fitness trenere. Planovi treninga i prehrane, check-in sustav, praćenje plaćanja i chat — sve na jednom mjestu.'
      : 'Platform for online fitness coaches. Training and nutrition plans, check-in system, payment tracking and chat — all in one place.',
    operatingSystem: 'Web, iOS, Android',
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '29', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Pro',     price: '59', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Scale',   price: '99', priceCurrency: 'EUR' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <RevealObserver />
      <Navbar />

      {/* ── HERO — dark background ── */}
      <section className="seo-hero">
        <div className="hbg" />
        <div className="hgrid" />
        <div className="seo-hero-inner">
          <div className="seo-hero-text">
            <div className="hbadge">
              <span className="bdot" />
              <span>{t('heroBadge')}</span>
            </div>
            <h1
              className="seo-h1"
              dangerouslySetInnerHTML={{ __html: t.raw('heroH1') as string }}
            />
            <p className="seo-hsub">{t('heroSub')}</p>
            <div className="seo-hcta">
              <a href={`/${locale}#cijene`} className="btn btn-p btn-lg">
                {t('heroBtn1')}
              </a>
              <a href={`/${locale}/kako-radi`} className="btn btn-g btn-lg">
                {t('heroBtn2')}
              </a>
            </div>
            <p className="seo-hnote">{t('heroNote')}</p>
          </div>

          {/* Static mockup — lightweight, no JS */}
          <div className="seo-mockup">
            <div className="sbar">
              <div className="sdots">
                <div className="sdot" style={{ background: '#ff5f56' }} />
                <div className="sdot" style={{ background: '#ffbd2e' }} />
                <div className="sdot" style={{ background: '#27c93f' }} />
              </div>
              <div className="surl">{t('mockupTitle')}</div>
            </div>
            <div className="seo-mockup-body">
              {mockupClients.map((c, i) => (
                <div key={i} className="seo-mclient">
                  <div className="seo-mav" style={{ background: avatarColors[i % avatarColors.length] }}>{c.initials}</div>
                  <div className="seo-minfo">
                    <div className="seo-mname">{c.name}</div>
                    <div className="seo-msub">{c.sub}</div>
                  </div>
                  <span className="seo-mstat" style={statusStyle(c.type)}>{c.status}</span>
                </div>
              ))}
              <div className="seo-mstats">
                <div className="seo-mstat-box">
                  <div className="seo-mstat-val">{t('mockupStat1Val')}</div>
                  <div className="seo-mstat-lbl">{t('mockupStat1Lbl')}</div>
                </div>
                <div className="seo-mstat-box">
                  <div className="seo-mstat-val">{t('mockupStat2Val')}</div>
                  <div className="seo-mstat-lbl">{t('mockupStat2Lbl')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM — light (sl) ── */}
      <section className="sl sp" ref={problemRef}>
        <div className="con">
          <div className="tc rev">
            <div className="slbl">{t('problemTag')}</div>
            <h2 className="stit" dangerouslySetInnerHTML={{ __html: t.raw('problemH2') as string }} />
            <p className="ssub">{t('problemSub')}</p>
          </div>
          <div className="seo-problem-grid">
            {problemCards.map((card, i) => (
              <div key={i} className="seo-problem-card rev" style={{ transitionDelay: `${(i + 1) * 0.08}s` }}>
                <div className="seo-problem-icon">{card.icon}</div>
                <div className="seo-problem-title">{card.title}</div>
                <div className="seo-problem-text">{card.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* problem light → features light-accent */}
      <WaveDivider from="#f5f7ff" to="#eceffe" />

      {/* ── FEATURES — light accent (sa) ── */}
      <section className="sa sp" ref={featRef}>
        <div className="con">
          <div className="rev">
            <div className="slbl">{t('featTag')}</div>
            <h2 className="stit" dangerouslySetInnerHTML={{ __html: t.raw('featH2') as string }} />
            <p className="ssub">{t('featSub')}</p>
          </div>
          <div className="seo-feat-grid">
            <ul className="seo-feat-list">
              {features.map((feat, i) => (
                <li key={i} className="seo-feat-item rev" style={{ transitionDelay: `${(i + 1) * 0.06}s` }}>
                  <div className="seo-feat-icon">{feat.icon}</div>
                  <div>
                    <div className="seo-feat-title">{feat.title}</div>
                    <div className="seo-feat-desc">{feat.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="seo-feat-visual rev d2">
              <div className="seo-fv-header">{t('featVisualTitle')}</div>
              {featVisItems.map((item, i) => (
                <div key={i} className="seo-fv-item">
                  <div className="seo-fv-av" style={{ background: avatarColors[i % avatarColors.length] }}>{item.initials}</div>
                  <div className="seo-fv-info">
                    <div className="seo-fv-name">{item.name}</div>
                    <div className="seo-fv-meta">{item.meta}</div>
                  </div>
                  <span
                    className="seo-fv-badge"
                    style={item.type === 'warn' ? { background: 'rgba(234,170,50,.12)', color: '#e09010' } : undefined}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
              <div className="seo-fv-stat">
                <div className="seo-fv-stat-lbl">{t('featVisualStatLbl')}</div>
                <div className="seo-fv-stat-val">{t('featVisualStatVal')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* features light-accent → use cases light */}
      <WaveDivider from="#eceffe" to="#f5f7ff" />

      {/* ── USE CASES — light (sl) ── */}
      <section className="sl sp" ref={usecaseRef}>
        <div className="con">
          <div className="tc rev">
            <div className="slbl">{t('usecaseTag')}</div>
            <h2 className="stit" style={{ color: 'var(--lt)' }}>{t('usecaseH2')}</h2>
          </div>
          <div className="seo-usecase-grid">
            {usecases.map((uc, i) => (
              <div key={i} className="seo-usecase-card rev" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
                <div className="seo-usecase-num">{uc.num}</div>
                <div className="seo-usecase-title">{uc.title}</div>
                <div className="seo-usecase-text">{uc.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* use cases light → testimonials (#eceffe start) */}
      <WaveDivider from="#f5f7ff" to="#eceffe" />

      {/* ── TESTIMONIALS — reuse existing component ── */}
      <Testimonials />

      {/* testimonials (#f5f7ff end) → pricing (white start) */}
      <WaveDivider from="#f5f7ff" to="#ffffff" />

      {/* ── PRICING — reuse existing component ── */}
      <Pricing />

      {/* pricing (#f5f9ff end) → faq light-accent */}
      <WaveDivider from="#f5f9ff" to="#eceffe" />

      {/* ── FAQ — light accent (sa) ── */}
      <section className="sa sp">
        <div className="con">
          <div className="tc rev">
            <div className="slbl">{t('faqTag')}</div>
            <h2 className="stit" style={{ color: 'var(--lt)' }}>{t('faqH2')}</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${faqOpen === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setFaqOpen(prev => prev === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faqico"><PlusIcon /></span>
                </button>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — reuse existing component (dark) ── */}
      <CTA />

      {/* ── FOOTER — reuse existing component (dark) ── */}
      <Footer />
    </>
  )
}

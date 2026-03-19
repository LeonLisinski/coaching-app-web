'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

const PLANS = ['starter', 'pro', 'scale'] as const
const PRICES = [29, 59, 99]

export default function PricingPage() {
  const locale = useLocale()
  const router = useRouter()
  const isHr = locale === 'hr'
  const otherLocale = isHr ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const navLinks = isHr
    ? [['Kako radi', `/${locale}/kako-radi`], ['Mobilna app', `/${locale}#funkcije`], ['Cijene', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]
    : [['How it works', `/${locale}/kako-radi`], ['Mobile app', `/${locale}#funkcije`], ['Pricing', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCheckout = async (plan: string) => {
    setLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url, error } = await res.json()
      if (error || !url) throw new Error(error || 'No URL')
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      alert(isHr ? 'Greška pri otvaranju plaćanja. Pokušaj ponovo.' : 'Payment error. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const tiers = isHr
    ? [
        {
          name: 'Starter', price: 29, clients: 'Do 15 klijenata', popular: false,
          feats: ['Do 15 aktivnih klijenata', 'Planovi treninga i prehrane', 'Check-in praćenje s automatskim podsjetnicima', 'Chat s klijentima', 'Mobilna app za klijente (besplatna)', 'Financijski pregled i praćenje plaćanja', 'Prilagodljivi parametri praćenja'],
          btn: 'Kreni besplatno',
        },
        {
          name: 'Pro', price: 59, clients: 'Do 50 klijenata', popular: true,
          feats: ['Do 50 aktivnih klijenata', 'Sve iz Starter plana', 'Vlastiti logo i boje u klijentskoj app', 'Prioritetna podrška'],
          btn: 'Kreni besplatno',
        },
        {
          name: 'Scale', price: 99, clients: 'Do 150 klijenata', popular: false,
          feats: ['Do 150 aktivnih klijenata', 'Sve iz Pro plana', 'Više od 150 klijenata: +€10/mj za svakih dodatnih 25'],
          btn: 'Kreni besplatno',
          note: 'Više od 150 klijenata? +€10/mj za svakih dodatnih 25.',
        },
      ]
    : [
        {
          name: 'Starter', price: 29, clients: 'Up to 15 clients', popular: false,
          feats: ['Up to 15 active clients', 'Training and nutrition plans', 'Check-in tracking with automatic reminders', 'Client chat', 'Client mobile app (free)', 'Financial overview and payment tracking', 'Custom tracking parameters'],
          btn: 'Get started free',
        },
        {
          name: 'Pro', price: 59, clients: 'Up to 50 clients', popular: true,
          feats: ['Up to 50 active clients', 'Everything in Starter', 'Custom logo and colors in client app', 'Priority support'],
          btn: 'Get started free',
        },
        {
          name: 'Scale', price: 99, clients: 'Up to 150 clients', popular: false,
          feats: ['Up to 150 active clients', 'Everything in Pro', 'More than 150 clients: +€10/mo per additional 25'],
          btn: 'Get started free',
          note: 'More than 150 clients? +€10/mo for every additional 25.',
        },
      ]

  const advantages = isHr
    ? ['Check-in automatizacija', 'Mobilna app za klijente (besplatna)', 'Financijski pregled', 'Vlastiti branding', 'Sve u jednom (nema WhatsApp, Excel, PDF)']
    : ['Check-in automation', 'Client mobile app (free)', 'Financial overview', 'Own branding', 'All-in-one (no WhatsApp, Excel, PDFs)']

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
            {isHr ? 'Prijava' : 'Log in'}
          </a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Isprobaj besplatno' : 'Try for free'}
          </a>
          <button className="langbtn navlang" onClick={() => router.push(`/${otherLocale}/cijene`)}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="https://app.unitlift.com/login" onClick={() => setMenuOpen(false)}>{isHr ? 'Prijava' : 'Log in'}</a>
        <button className="langbtn mobc" onClick={() => { router.push(`/${otherLocale}/cijene`); setMenuOpen(false) }}>
          {otherLocale.toUpperCase()} ↕
        </button>
      </div>

      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          <div className="legal-badge">
            <span className="bdot" />
            {isHr ? 'Cijene i planovi' : 'Pricing & plans'}
          </div>
          <h1 className="legal-title">
            {isHr ? 'Jednostavne cijene. Bez iznenađenja.' : 'Simple pricing. No surprises.'}
          </h1>
          <p className="legal-date">
            {isHr
              ? '14 dana besplatno na svim planovima. Kartica potrebna za aktivaciju.'
              : '14 days free on all plans. Card required for activation.'}
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: 'var(--bdk)', padding: '52px 5% 80px', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Intro */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-.5px' }}>
              {isHr ? 'Koji plan odgovara tebi?' : 'Which plan suits you?'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              {isHr
                ? 'Svi planovi uključuju iste funkcije — jedina razlika je broj klijenata koje možeš voditi.'
                : 'All plans include the same features — the only difference is the number of clients you can manage.'}
            </p>
          </div>

          {/* Pricing cards */}
          <div className="pg" style={{ marginTop: 0 }}>
            {tiers.map((tier, i) => (
              <div key={i} className={`pc ${['basic', 'pop', 'elite'][i]}`} style={{ paddingTop: tier.popular ? '50px' : undefined }}>
                {tier.popular && <div className="popbdg">{isHr ? 'Najpopularniji' : 'Most popular'}</div>}
                <div className="ptier">{tier.name}</div>
                <div className="pamt">€<span>{PRICES[i]}</span><span className="psmall">/mj</span></div>
                <div className="pper" style={{ marginBottom: '22px' }}>{tier.clients}</div>
                <div className="pdiv" />
                <ul className="pfeats">
                  {tier.feats.map((feat, j) => (
                    <li key={j}><span className="pchk">✓</span>{feat}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout(PLANS[i])}
                  disabled={loading !== null}
                  className={`btn ${['btn-g', 'btn-p', 'btn-g'][i]} btn-fw`}
                  style={{ cursor: loading ? 'wait' : 'pointer', opacity: loading && loading !== PLANS[i] ? 0.6 : 1 }}
                >
                  {loading === PLANS[i] ? '...' : tier.btn}
                </button>
                {tier.note && (
                  <p style={{ marginTop: '12px', fontSize: '.75rem', color: 'rgba(255,255,255,.45)', textAlign: 'center', lineHeight: 1.5 }}>
                    {tier.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '28px', color: 'rgba(255,255,255,.5)', fontSize: '.83rem' }}>
            {isHr ? 'Svi planovi uključuju 14-dnevno besplatno probno razdoblje. Kartica potrebna za aktivaciju.' : 'All plans include a 14-day free trial. Card required for activation.'}
          </p>

          {/* Advantages */}
          <div className="pp-advantages">
            <h2 className="pp-adv-h2">
              {isHr ? 'Zašto treneri biraju UnitLift' : 'Why coaches choose UnitLift'}
            </h2>
            <div className="pp-adv-grid">
              {advantages.map((adv, i) => (
                <div key={i} className="pp-adv-item">
                  <span className="pp-adv-ico">✓</span>
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partner section */}
          <div className="pp-partner">
            <div className="pp-partner-inner">
              <div>
                <h3 className="pp-partner-h">{isHr ? 'Trener si? Preporuči UnitLift.' : 'Are you a coach? Recommend UnitLift.'}</h3>
                <p className="pp-partner-p">
                  {isHr
                    ? 'Svaki trener kojeg preporučiš donosi ti pogodnosti. Kontaktiraj nas za detalje o partnerskom programu.'
                    : 'Every coach you refer brings you benefits. Contact us for details about our partner program.'}
                </p>
              </div>
              <a href="mailto:info@unitlift.com" className="btn btn-g">
                {isHr ? 'Kontaktiraj nas' : 'Contact us'}
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
              <Link href={`/${locale}/kako-radi`}>{isHr ? 'Kako radi' : 'How it works'}</Link>
              <Link href={`/${locale}/cijene`}>{isHr ? 'Cijene' : 'Pricing'}</Link>
              <Link href={`/${locale}/faq`}>FAQ</Link>
              <Link href={`/${locale}/kontakt`}>{isHr ? 'Kontakt' : 'Contact'}</Link>
            </div>
            <span className="legal-footer-copy">© 2026 UnitDuo, vl. Leon Lišinski</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

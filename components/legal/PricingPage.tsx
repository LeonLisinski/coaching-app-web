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
  const APP_URL = 'https://app.unitlift.com'

  const navLinks = isHr
    ? [['← Početna', `/${locale}`], ['Kako radi', `/${locale}/kako-radi`], ['Mobilna app', `/${locale}#funkcije`], ['Cijene', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]
    : [['← Home', `/${locale}`], ['How it works', `/${locale}/kako-radi`], ['Mobile app', `/${locale}#funkcije`], ['Pricing', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const baseFeats = isHr
    ? ['Planovi treninga i prehrane', 'Prati što ti je važno — koraci, san, težina, raspoloženje', 'Chat s klijentima', 'Mobilna app za klijente (besplatna)', 'Vidi odmah tko je platio i koliko si zaradio']
    : ['Training and nutrition plans', 'Track what matters — steps, sleep, weight, mood', 'Client chat', 'Client mobile app (free)', 'See instantly who paid and how much you earned']

  const tiers = isHr
    ? [
        {
          name: 'Starter', price: 29, clients: 'Do 15 klijenata', popular: false,
          feats: ['Do 15 aktivnih klijenata'],
          btn: 'Kreni besplatno', note: null,
        },
        {
          name: 'Pro', price: 59, clients: 'Do 50 klijenata', popular: true,
          feats: ['Do 50 aktivnih klijenata', 'Vlastiti logo i boje u klijentskoj app'],
          btn: 'Kreni besplatno', note: null,
        },
        {
          name: 'Scale', price: 99, clients: 'Do 150 klijenata', popular: false,
          feats: ['Do 150 aktivnih klijenata', 'Vlastiti logo i boje u klijentskoj app'],
          btn: 'Kreni besplatno', note: 'Više od 150 klijenata? +€10/mj za svakih dodatnih 25.',
        },
      ]
    : [
        {
          name: 'Starter', price: 29, clients: 'Up to 15 clients', popular: false,
          feats: ['Up to 15 active clients'],
          btn: 'Get started free', note: null,
        },
        {
          name: 'Pro', price: 59, clients: 'Up to 50 clients', popular: true,
          feats: ['Up to 50 active clients', 'Custom logo and colors in client app'],
          btn: 'Get started free', note: null,
        },
        {
          name: 'Scale', price: 99, clients: 'Up to 150 clients', popular: false,
          feats: ['Up to 150 active clients', 'Custom logo and colors in client app'],
          btn: 'Get started free', note: 'More than 150 clients? +€10/mo for every additional 25.',
        },
      ]

  const IcoCheckin = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  const IcoPhone   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/></svg>
  const IcoMoney   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  const IcoApps    = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17h7M17 14v7"/></svg>
  const IcoChart   = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  const IcoLock    = <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>

  const advCardsHr = [
    { icon: IcoCheckin, title: 'Check-in praćenje bez muke', desc: 'Klijent ispuni check-in u dvije minute. Ti odmah vidiš napredak — bez jedne poruke, bez čekanja, bez traženja po WhatsAppu.' },
    { icon: IcoPhone,   title: 'Jedna app za sve', desc: 'Planovi, prehrana, komunikacija, check-ini — sve na jednom mjestu. Zaboravi na Excel, WhatsApp, PDF i ostale kaos-alate.' },
    { icon: IcoMoney,   title: 'Praćenje plaćanja u sekundi', desc: 'Vidiš točno tko je platio, tko kasni i koliko si zaradio ovaj mjesec. Bez ručnog praćenja, bez neugodnih podsjetnika.' },
    { icon: IcoApps,    title: 'Klijentima jednostavnije', desc: 'Klijent preuzme jednu app i sve je tamo. Nema registracija na 3 platforme, nema linkova po SMS-u, nema zbunjenosti.' },
    { icon: IcoChart,   title: 'Napredak koji se vidi', desc: 'Sve mjere, foto check-ini i komentari arhivirani automatski. Lako prilagodi program na temelju podataka, ne nagađanja.' },
    { icon: IcoLock,    title: 'Manje app, više mira', desc: 'Jedna pretplata. Jedan login. Sve u jednom. Nema više žongliranja s desecima alata i plaćanja na svakom koraku.' },
  ]

  const advCardsEn = [
    { icon: IcoCheckin, title: 'Check-in tracking without the hassle', desc: 'Client fills in a check-in in two minutes. You instantly see progress — no messages, no waiting, no digging through WhatsApp.' },
    { icon: IcoPhone,   title: 'One app for everything', desc: 'Plans, nutrition, communication, check-ins — all in one place. Forget Excel, WhatsApp, PDFs and other chaos tools.' },
    { icon: IcoMoney,   title: 'Payment tracking in seconds', desc: 'See exactly who paid, who\'s late and how much you earned this month. No manual tracking, no awkward reminders.' },
    { icon: IcoApps,    title: 'Less hassle for clients', desc: 'Client downloads one app and everything is there. No registrations on 3 platforms, no links over SMS, no confusion.' },
    { icon: IcoChart,   title: 'Progress that shows', desc: 'All measurements, photo check-ins and comments archived automatically. Adjust programs based on data, not guessing.' },
    { icon: IcoLock,    title: 'Fewer apps, more peace of mind', desc: 'One subscription. One login. All in one. No more juggling dozens of tools and paying at every step.' },
  ]

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
      <div className="legal-body" style={{ background: '#ffffff' }}>
        <div className="con">

          {/* Intro */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 800, color: 'var(--lt)', marginBottom: '12px', letterSpacing: '-.5px' }}>
              {isHr ? 'Koji plan odgovara tebi?' : 'Which plan suits you?'}
            </h2>
            <p style={{ color: 'var(--ls)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              {isHr
                ? 'Svi planovi uključuju iste funkcije — jedina razlika je broj klijenata koje možeš voditi.'
                : 'All plans include the same features — the only difference is the number of clients you can manage.'}
            </p>
          </div>

          {/* Pricing cards */}
          <div className="pg pricing-page-grid" style={{ marginTop: 0 }}>
            {tiers.map((tier, i) => (
              <div key={i} className={`pc pricing-page-card ${['basic', 'pop', 'elite'][i]}`} style={{ paddingTop: tier.popular ? '50px' : undefined }}>
                {tier.popular && <div className="popbdg">{isHr ? 'Najpopularniji' : 'Most popular'}</div>}
                <div className="ptier">{tier.name}</div>
                <div className="pamt">€<span>{PRICES[i]}</span><span className="psmall">/mj</span></div>
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
            {isHr ? 'Svi planovi uključuju 14-dnevno besplatno probno razdoblje. Kartica potrebna za aktivaciju.' : 'All plans include a 14-day free trial. Card required for activation.'}
          </p>

          {/* Stats row */}
          <div className="pp-stats-row">
            {(isHr
              ? [['5 min', 'postavljanje profila'], ['14 dana', 'besplatno probno'], ['Fiksna cijena', 'bez skrivenih troškova'], ['0 €', 'klijentska app']]
              : [['5 min', 'profile setup'], ['14 days', 'free trial'], ['Fixed price', 'no hidden costs'], ['€ 0', 'client app']]
            ).map(([val, lbl]) => (
              <div key={lbl} className="pp-stat">
                <span className="pp-stat-val">{val}</span>
                <span className="pp-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          {/* Advantages */}
          <div className="pp-advantages" style={{ background: '#fff', border: '1px solid var(--lb)' }}>
            <h2 className="pp-adv-h2" style={{ color: 'var(--lt)', marginBottom: '8px' }}>
              {isHr ? 'Zašto treneri biraju UnitLift' : 'Why coaches choose UnitLift'}
            </h2>
            <p style={{ color: 'var(--ls)', fontSize: '.88rem', marginBottom: '28px', lineHeight: 1.6 }}>
              {isHr
                ? 'Sve što trebaš za profesionalan online coaching — bez Excela, WhatsAppa i gomile PDF-ova.'
                : 'Everything you need for professional online coaching — no Excel, WhatsApp or endless PDFs.'}
            </p>
            <div className="pp-adv-grid-rich">
              {(isHr ? advCardsHr : advCardsEn).map(({ icon, title, desc }) => (
                <div key={title} className="pp-adv-card">
                  <div className="pp-adv-icon">{icon}</div>
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

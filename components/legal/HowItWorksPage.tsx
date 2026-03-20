'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

export default function HowItWorksPage() {
  const locale = useLocale()
  const router = useRouter()
  const isHr = locale === 'hr'
  const otherLocale = isHr ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = isHr
    ? [['← Početna', `/${locale}`], ['Kako radi', `/${locale}/kako-radi`], ['Mobilna app', `/${locale}#funkcije`], ['Cijene', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]
    : [['← Home', `/${locale}`], ['How it works', `/${locale}/kako-radi`], ['Mobile app', `/${locale}#funkcije`], ['Pricing', `/${locale}/cijene`], ['Blog', `/${locale}/blog`], ['FAQ', `/${locale}/faq`]]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const steps = isHr
    ? [
        { n: '01', t: 'Postavi profil', d: 'Registriraj se i prilagodi parametre treninga i prehrane prema svom coaching pristupu. Brzo i intuitivno — za manje od 5 minuta.' },
        { n: '02', t: 'Dodaj klijente', d: 'Pozovi klijente putem e-maila. Oni preuzmu mobilnu aplikaciju i odmah imaju pristup svim planovima i check-inovima.' },
        { n: '03', t: 'Vodi i prati', d: 'Kreiraj planove, prati napredak kroz check-ine i komuniciraj — sve iz jednog sučelja. Administracija svedena na minimum.' },
      ]
    : [
        { n: '01', t: 'Set up your profile', d: 'Register and customize training and nutrition parameters to match your coaching approach. Fast and intuitive — in under 5 minutes.' },
        { n: '02', t: 'Add clients', d: 'Invite clients by email. They download the mobile app and instantly have access to all their plans and check-ins.' },
        { n: '03', t: 'Coach and track', d: 'Create plans, track progress through check-ins and communicate — all from one interface. Administration reduced to a minimum.' },
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
          <a href={`/${locale}#cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Isprobaj besplatno' : 'Try for free'}
          </a>
          <button className="langbtn navlang" onClick={() => router.push(`/${otherLocale}/kako-radi`)}>
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
        <a href={`/${locale}#cijene`} className="btn btn-p btn-fw mobc" onClick={() => setMenuOpen(false)}>
          {isHr ? 'Isprobaj besplatno' : 'Try for free'}
        </a>
        <button className="langbtn mobc" onClick={() => { router.push(`/${otherLocale}/kako-radi`); setMenuOpen(false) }}>
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
            {isHr ? 'Platforma za trenere' : 'Platform for coaches'}
          </div>
          <h1 className="legal-title">
            {isHr ? 'Kako UnitLift funkcionira' : 'How UnitLift works'}
          </h1>
          <p className="legal-date">
            {isHr
              ? 'Jedna platforma. Trener radi, klijent napreduje.'
              : 'One platform. Coach works, client progresses.'}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body">
        <div className="con">

          {/* Section 1: Za trenere */}
          <div className="hiw-section">
            <div className="legal-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="bdot" />
              {isHr ? 'Za trenere — web app' : 'For coaches — web app'}
            </div>
            <h2 className="hiw-h2">
              {isHr ? 'Sve što trener treba — na jednom ekranu' : 'Everything a coach needs — on one screen'}
            </h2>
            <p className="hiw-p">
              {isHr
                ? 'Zaboravi na Excel, WhatsApp i PDF-ove. UnitLift je web platforma koja centralizira cijeli tvoj coaching posao — od planiranja treninga i prehrane do praćenja plaćanja i komunikacije s klijentima.'
                : 'Forget Excel, WhatsApp and PDFs. UnitLift is a web platform that centralizes your entire coaching business — from planning training and nutrition to tracking payments and communicating with clients.'}
            </p>
            <div className="hiw-features">
              {(isHr
                ? ['Planovi treninga i prehrane za svakog klijenta', 'Tjedni check-in sustav s automatskim podsjetnicima', 'Financijski pregled — tko je platio, komu ističe pretplata', 'Integrirani chat s klijentima', 'Mobilni pregled — dodaj web app na početni ekran']
                : ['Training and nutrition plans for every client', 'Weekly check-in system with automatic reminders', 'Financial overview — who has paid, whose subscription expires', 'Integrated client chat', 'Mobile overview — add web app to your home screen']
              ).map((feat, i) => (
                <div key={i} className="hiw-feat">
                  <span className="hiw-check">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <p className="hiw-quote">
              {isHr
                ? '"Sve što trebaš za profesionalan online coaching — na jednom ekranu. Zaboravi na Excel, WhatsApp i PDF-ove."'
                : '"Everything you need for professional online coaching — on one screen. Forget Excel, WhatsApp and PDFs."'}
            </p>
          </div>

          {/* Section 2: Za klijente */}
          <div className="hiw-section">
            <div className="legal-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="bdot" />
              {isHr ? 'Za klijente — mobilna app' : 'For clients — mobile app'}
            </div>
            <h2 className="hiw-h2">
              {isHr ? 'Klijenti preuzmu app, ti im pošalješ pristup' : 'Clients download the app, you send them access'}
            </h2>
            <p className="hiw-p">
              {isHr
                ? 'Klijent preuzme besplatnu UnitLift app na App Store ili Google Play, kreira račun i odmah vidi planove koje si mu dodijelio. Nema papira, nema PDF-ova, nema WhatsApp poruka s rasporedom.'
                : 'The client downloads the free UnitLift app from the App Store or Google Play, creates an account and immediately sees the plans you assigned them. No paperwork, no PDFs, no WhatsApp messages with schedules.'}
            </p>
            <div className="hiw-features">
              {(isHr
                ? ['Planovi treninga i prehrane uvijek dostupni u appu', 'Tjedni check-in za 2 minute — direktno iz appu', 'Chat s trenerom — sve poruke na jednom mjestu', 'Push obavijesti za podsjetnike i novosti']
                : ['Training and nutrition plans always available in the app', 'Weekly check-in in 2 minutes — directly in the app', 'Chat with coach — all messages in one place', 'Push notifications for reminders and updates']
              ).map((feat, i) => (
                <div key={i} className="hiw-feat">
                  <span className="hiw-check">✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <p className="hiw-quote">
              {isHr
                ? '"Klijenti preuzmu app, ti im pošalješ pristup. Od tog trenutka — sve je automatsko."'
                : '"Clients download the app, you send them access. From that moment — everything is automatic."'}
            </p>
          </div>

          {/* Section 3: 3 koraka */}
          <div className="hiw-section">
            <div className="legal-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="bdot" />
              {isHr ? 'Kako početi' : 'How to start'}
            </div>
            <h2 className="hiw-h2">
              {isHr ? 'Tri koraka do potpunog coaching sistema' : 'Three steps to a complete coaching system'}
            </h2>
            <p className="hiw-p">
              {isHr ? 'Od registracije do prvog klijenta za manje od 10 minuta.' : 'From registration to your first client in under 10 minutes.'}
            </p>
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
            <h2 className="hiw-cta-t">
              {isHr ? 'Spreman? Odaberi plan.' : 'Ready? Choose a plan.'}
            </h2>
            <p className="hiw-cta-s">
              {isHr
                ? '14 dana besplatno na svim planovima. Kartica potrebna za aktivaciju.'
                : '14 days free on all plans. Card required for activation.'}
            </p>
            <Link href={`/${locale}/cijene`} className="btn btn-p btn-xl">
              {isHr ? 'Pogledaj cijene →' : 'See pricing →'}
            </Link>
            <p style={{ marginTop: '14px', fontSize: '.78rem', color: 'rgba(255,255,255,.45)' }}>
              {isHr ? 'Kartica potrebna za aktivaciju · Bez naplate 14 dana · Otkaži kad hoćeš' : 'Card required for activation · No charge for 14 days · Cancel anytime'}
            </p>
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

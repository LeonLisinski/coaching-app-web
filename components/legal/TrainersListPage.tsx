'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import type { Trainer } from '@/lib/trainers/types'
import { resolveTrainer } from '@/lib/trainers/types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

function TrainerCard({ trainer, locale }: { trainer: Trainer; locale: string }) {
  const imgPos = trainer.imagePosition ?? 'center center'
  return (
    <Link href={`/${locale}/treneri/${trainer.slug}`} className={`trainer-card${trainer.isFounder ? ' trainer-card--founder' : ''}`}>
      <div className="trainer-card-circle">
        {trainer.image ? (
          <img src={trainer.image} alt={trainer.name} style={{ objectPosition: imgPos }} />
        ) : (
          <div className="trainer-card-circle-fallback">
            {trainer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      {trainer.isFounder && <div className="trainer-founder-badge">⚡ {locale === 'en' ? 'Founder' : 'Osnivač'}</div>}
      <div className="trainer-card-body">
        <div className="trainer-card-name">{trainer.name}</div>
        <div className="trainer-card-title">{trainer.title}</div>
        <p className="trainer-card-bio">{trainer.shortBio}</p>
        <div className="trainer-card-tags">
          {(trainer.specialties ?? []).slice(0, 1).map(s => (
            <span key={s} className="trainer-tag">{s}</span>
          ))}
        </div>
        <div className="trainer-card-cta">{locale === 'en' ? 'View profile' : 'Pogledaj profil'}</div>
      </div>
    </Link>
  )
}

function PlaceholderCard() {
  return (
    <div className="trainer-card trainer-card--placeholder">
      <div className="trainer-card-circle trainer-card-circle--ph" />
      <div className="trainer-card-body">
        <div className="trainer-ph-name" />
        <div className="trainer-ph-title" />
        <div className="trainer-ph-bio" />
        <div className="trainer-ph-bio trainer-ph-bio--short" />
        <div className="trainer-ph-tags">
          <div className="trainer-ph-tag" />
          <div className="trainer-ph-tag" />
        </div>
        <div className="trainer-ph-cta" />
      </div>
      <div className="trainer-card-soon">Uskoro</div>
    </div>
  )
}

export default function TrainersListPage({ trainers }: { trainers: Trainer[] }) {
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

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/treneri`)
  }

  const active = trainers.filter(t => !t.isPlaceholder)
  const placeholders = trainers.filter(t => t.isPlaceholder)
  // Founder always first, rest in original order
  const sorted = [...active]
    .sort((a, b) => (b.isFounder ? 1 : 0) - (a.isFounder ? 1 : 0))
    .map(t => resolveTrainer(t, locale))

  return (
    <div className="legal-root">
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={28} />
          <span className="nw">UnitLift</span>
        </Link>
        <ul className="navlinks">
          {navLinks.map(([label, href], i) => (
            <li key={label}><a href={href} className={i === 0 ? 'nav-home-link' : ''}>{label}</a></li>
          ))}
        </ul>
        <div className="navact">
          <button className="langbtn navlang" onClick={switchLang}>{locale.toUpperCase()}</button>
          <a href={`${APP_URL}/login`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>{t('login')}</a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>{t('common.tryFree')}</a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label={t('common.menuAria')}><span /><span /><span /></button>
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
      <div className="legal-hero trainers-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner trainers-hero-inner">
          <div>
            <div className="legal-badge"><span className="bdot" />{locale === 'en' ? 'UnitLift trainer network' : 'UnitLift mreža trenera'}</div>
            <h1 className="legal-title" style={{ maxWidth: 560 }}>{locale === 'en' ? 'Find your trainer' : 'Pronađi svog trenera'}</h1>
            <p className="trainers-hero-sub">
              {locale === 'en'
                ? 'Certified personal trainers using the UnitLift system - structured training, regular progress tracking and clear results.'
                : 'Certificirani osobni treneri koji koriste UnitLift sustav - strukturiran trening, redovito praćenje i jasan napredak.'}
            </p>
          </div>
          <div className="trainers-hero-stats">
            <div className="trainers-stat">
              <span className="trainers-stat-n">{active.length}</span>
              <span>{locale === 'en' ? 'trainers' : 'trenera'}</span>
            </div>
            <div className="trainers-stat-sep" />
            <div className="trainers-stat">
              <span className="trainers-stat-n">100%</span>
              <span>{locale === 'en' ? 'certified' : 'certificirani'}</span>
            </div>
            <div className="trainers-stat-sep" />
            <div className="trainers-stat">
              <span className="trainers-stat-n">Online</span>
              <span>{locale === 'en' ? '& in person' : '& uživo'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="trainers-section">
        <div className="con">
          <div className="trainers-grid">
            {sorted.map(trainer => (
              <TrainerCard key={trainer.slug} trainer={trainer} locale={locale} />
            ))}
            {placeholders.map((_, i) => (
              <PlaceholderCard key={`ph-${i}`} />
            ))}
          </div>

          <div className="trainers-cta">
            <div className="trainers-cta-inner">
              <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>💪</div>
              <div style={{ flex: 1 }}>
                <div className="trainers-cta-title">{locale === 'en' ? 'Want your profile among the trainers?' : 'Želiš svoj profil među trenerima?'}</div>
                <div className="trainers-cta-text">{locale === 'en' ? 'Join UnitLift, present your services and let clients sign up for coaching.' : 'Pridruži se UnitLiftu, predstavi svoje usluge i omogući klijentima da se prijave za coaching.'}</div>
              </div>
              <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.9rem', whiteSpace: 'nowrap' }}>{locale === 'en' ? 'Join' : 'Pridruži se'}</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="legal-footer-bar">
        <div className="con">
          <div className="legal-footer-row">
            <a href={`/${locale}`} className="fl-logo"><LogoSvg height={20} /><span>UnitLift</span></a>
            <div className="legal-footer-links">
              <Link href={`/${locale}/treneri`}>Treneri</Link>
              <Link href={`/${locale}/cijene`}>{t('common.tryFree')}</Link>
              <Link href={`/${locale}/kontakt`}>{t('common.contact')}</Link>
              <Link href={`/${locale}/privatnost`}>{t('common.privacy')}</Link>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

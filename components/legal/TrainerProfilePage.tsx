'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import type { Trainer } from '@/lib/trainers/types'
import { resolveTrainer } from '@/lib/trainers/types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
)

export default function TrainerProfilePage({ trainer: trainerRaw }: { trainer: Trainer }) {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const trainer = resolveTrainer(trainerRaw, locale)

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
    router.push(`/${otherLocale}/treneri/${trainer.slug}`)
  }

  const quickInfo = trainer.quickInfo ?? [
    ...(trainer.certifications?.length ? [{ label: 'Iskustvo', value: trainer.certifications[0] }] : []),
    { label: 'Specijalnosti', value: `${trainer.specialties?.length ?? 0} područja` },
  ]

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
      <div className={`legal-hero trainer-hero${trainer.isFounder ? ' trainer-hero--founder' : ''}`}>
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner trainer-hero-inner">
          <div className="trainer-hero-avatar trainer-hero-avatar--lg">
            {trainer.image ? (
              <Image src={trainer.image} alt={trainer.name} fill style={{ objectFit: 'cover', objectPosition: trainerRaw.imagePosition ?? 'center center' }} sizes="160px" />
            ) : (
              <div className="trainer-avatar-lg">
                {trainer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="legal-badge" style={{ marginBottom: '0.6rem' }}>
              <span className="bdot" />
              {trainer.isFounder ? '⚡ Osnivač UnitLifta' : 'UnitLift trener'}
            </div>
            <h1 className="legal-title" style={{ marginBottom: '0.4rem' }}>{trainer.name}</h1>
            <p className="trainer-hero-title">{trainer.title}</p>
            {quickInfo[0] && (
              <p className="trainer-hero-location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {quickInfo[0].value}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body" style={{ background: '#f4f6ff' }}>
        <div className="legal-body-inner">
          <main className="legal-main">
            <section className="legal-section">
              <h2>{locale === 'en' ? 'About the trainer' : 'O treneru'}</h2>
              {(trainer.fullBio ?? []).map((para, i) => <p key={i}>{para}</p>)}
            </section>

            <section className="legal-section">
              <h2>{locale === 'en' ? 'Specialties' : 'Specijalnosti'}</h2>
              <ul className="legal-list">
                {(trainer.specialties ?? []).map(s => <li key={s}>{s}</li>)}
              </ul>
            </section>

            {trainer.certifications && trainer.certifications.length > 0 && (
              <section className="legal-section">
                <h2>{locale === 'en' ? 'Certifications & education' : 'Certifikati i edukacije'}</h2>
                <ul className="legal-list">
                  {trainer.certifications.map(c => <li key={c}>{c}</li>)}
                </ul>
              </section>
            )}

            <section className="legal-section">
              <h2>{locale === 'en' ? 'Contact the trainer' : 'Kontaktiraj trenera'}</h2>
              <p>{trainer.contactIntro ?? (locale === 'en' ? 'Get in touch for more information or to arrange a coaching programme.' : 'Javi se za više informacija ili dogovor oko coaching programa.')}</p>
              <div className="trainer-contact-btns">
                {trainer.instagram && (
                  <a href={trainer.instagram} target="_blank" rel="noopener noreferrer" className="trainer-contact-btn trainer-contact-instagram">
                    <InstagramIcon />Instagram
                  </a>
                )}
                {trainer.whatsapp && (
                  <a href={`https://wa.me/${trainer.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="trainer-contact-btn trainer-contact-whatsapp">
                    <WhatsAppIcon />WhatsApp
                  </a>
                )}
                {trainer.email && (
                  <a href={`mailto:${trainer.email}`} className="trainer-contact-btn trainer-contact-email">
                    <MailIcon />{trainer.email}
                  </a>
                )}
              </div>
            </section>

            {/* Coaching CTA */}
            <div className="trainer-coaching-cta">
              <div className="trainer-coaching-cta-inner">
                <div className="trainer-coaching-cta-icon">🚀</div>
                <div>
                  <div className="trainer-coaching-cta-title">
                    {locale === 'en'
                      ? `Want to train with ${trainerRaw.firstName ?? trainerRaw.name.split(' ')[0]}?`
                      : `Želiš trenirati s ${trainerRaw.instrumentalName}?`}
                  </div>
                  <div className="trainer-coaching-cta-text">
                    {locale === 'en'
                      ? 'Sign up for coaching and reach your goal with structured training, an individual approach and regular progress tracking.'
                      : 'Prijavi se za coaching i ostvari svoj cilj uz strukturiran trening, individualan pristup i redovito praćenje napretka.'}
                  </div>
                </div>
                <a href={trainerRaw.coachingLink} className="trainer-coaching-cta-btn">
                  {locale === 'en' ? 'Sign up for coaching' : 'Prijavi se za coaching'}
                </a>
              </div>
            </div>

            <div className="legal-footer-note">
              <Link href={`/${locale}/treneri`} style={{ color: 'var(--ba)', textDecoration: 'none', fontWeight: 600 }}>
                ← {locale === 'en' ? 'All trainers' : 'Svi treneri'}
              </Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              <div className="trainer-sidebar-card">
                <div className="legal-toc-title">{locale === 'en' ? 'Quick info' : 'Brze informacije'}</div>
                <div style={{ marginTop: '0.5rem' }}>
                  {quickInfo.map((item, i) => (
                    <div key={i} className="trainer-info-row">
                      <span className="trainer-info-label">{item.label}</span>
                      <span className="trainer-info-val">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div className="legal-toc-title">{locale === 'en' ? 'Contact' : 'Kontakt'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.75rem' }}>
                  {trainer.instagram && (
                    <a href={trainer.instagram} target="_blank" rel="noopener noreferrer" className="trainer-sidebar-contact">
                      <InstagramIcon />Instagram
                    </a>
                  )}
                  {trainer.whatsapp && (
                    <a href={`https://wa.me/${trainer.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="trainer-sidebar-contact">
                      <WhatsAppIcon />WhatsApp
                    </a>
                  )}
                  {trainer.email && (
                    <a href={`mailto:${trainer.email}`} className="trainer-sidebar-contact">
                      <MailIcon />{trainer.email}
                    </a>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <a href={trainerRaw.coachingLink} className="trainer-sidebar-cta-btn">
                  {locale === 'en' ? 'Sign up for coaching' : 'Prijavi se za coaching'}
                </a>
              </div>
            </div>
          </aside>
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

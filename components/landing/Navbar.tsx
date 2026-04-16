'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import LogoSvg from './LogoSvg'

export default function Navbar() {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Restore preferred locale on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('unitlift_locale')
      if (saved && saved !== locale) {
        const segments = pathname.split('/')
        segments[1] = saved
        router.replace(segments.join('/') || '/')
      }
    } catch {}
  }, [])

  function toggleLang() {
    const next = locale === 'hr' ? 'en' : 'hr'
    try { localStorage.setItem('unitlift_locale', next) } catch {}
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || '/')
  }

  const navLabels = t.raw('nav') as string[]
  const navItems = [
    { label: navLabels[0], href: `/${locale}/kako-radi` },
    { label: navLabels[1], href: '#funkcije' },
    { label: navLabels[2], href: `/${locale}/cijene` },
    { label: navLabels[3], href: `/${locale}/blog` },
    { label: navLabels[4], href: `/${locale}/faq` },
  ]

  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  return (
    <>
      <nav
        id="navbar"
        style={{
          background: scrolled ? 'rgba(10,16,36,.97)' : 'rgba(10,16,36,.9)',
        }}
      >
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={26} />
          <span className="nw">UnitLift</span>
        </Link>

        <ul className="navlinks">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="navact">
          <a href="https://app.unitlift.com/login" className="btn btn-g">
            {t('login')}
          </a>
          <a
            href={`/${locale}#cijene`}
            className="btn btn-p"
            aria-label={t('common.tryFreeAria')}
          >
            {t('common.tryFree')}
          </a>
          <button className="langbtn navlang" onClick={toggleLang}>
            {otherLocale.toUpperCase()}
          </button>
          <button
            className="hburg"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t('common.menuAria')}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`} id="mobMenu">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          href="https://app.unitlift.com/login"
          onClick={() => setMenuOpen(false)}
        >
          {t('login')}
        </a>
        <a
          href={`/${locale}#cijene`}
          className="btn btn-p btn-fw mobc"
          onClick={() => setMenuOpen(false)}
          aria-label={t('common.tryFreeMenuAria')}
        >
          {t('common.tryFree')}
        </a>
        <button
          className="langbtn mobc"
          onClick={() => { toggleLang(); setMenuOpen(false) }}
        >
          {t('common.langSwitchLabel')} {otherLocale.toUpperCase()}
        </button>
      </div>
    </>
  )
}

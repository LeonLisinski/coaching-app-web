'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import LogoSvg from './LogoSvg'
import { routing } from '@/i18n/routing'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.unitlift.com'

/** Returns a locale-aware path, omitting the prefix for the default locale. */
function localePath(locale: string, path: string) {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`
}

export default function Navbar() {
  const locale = useLocale()
  const t = useTranslations()
  // next-intl's router/pathname strip the locale segment automatically
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Restore preferred locale on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('unitlift_locale')
      if (saved && saved !== locale) {
        router.replace(pathname, { locale: saved })
      }
    } catch {}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function toggleLang() {
    const next = locale === 'hr' ? 'en' : 'hr'
    try { localStorage.setItem('unitlift_locale', next) } catch {}
    router.push(pathname, { locale: next })
  }

  const navLabels = t.raw('nav') as string[]
  const homeHref = localePath(locale, '/')

  const navItems = [
    { label: navLabels[0], href: localePath(locale, '/kako-radi') },
    { label: navLabels[1], href: `${homeHref}#funkcije` },
    { label: navLabels[2], href: localePath(locale, '/cijene') },
    { label: navLabels[3], href: localePath(locale, '/treneri') },
    { label: navLabels[4], href: localePath(locale, '/faq') },
  ]

  const otherLocale = locale === 'hr' ? 'en' : 'hr'
  const cijeneHref = `${homeHref}#cijene`

  return (
    <>
      <nav
        id="navbar"
        style={{
          background: scrolled ? 'rgba(10,16,36,.97)' : 'rgba(10,16,36,.9)',
        }}
      >
        <Link href={homeHref} className="nl">
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
          <a href={`${APP_URL}/login`} className="btn btn-g">
            {t('login')}
          </a>
          <a
            href={cijeneHref}
            className="btn btn-p"
            aria-label={t('common.tryFreeAria')}
          >
            {t('common.tryFree')}
          </a>
          <button className="langbtn navlang" onClick={toggleLang}>
            {locale.toUpperCase()}
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
          href={`${APP_URL}/login`}
          onClick={() => setMenuOpen(false)}
        >
          {t('login')}
        </a>
        <a
          href={cijeneHref}
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

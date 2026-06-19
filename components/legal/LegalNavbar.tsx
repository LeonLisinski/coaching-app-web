'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import { routing } from '@/i18n/routing'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.unitlift.com'

/** Returns a locale-prefixed path. HR (default locale) has no prefix. */
function lp(locale: string, path: string) {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`
}

interface LegalNavbarProps {
  /**
   * Path WITHOUT locale prefix that the lang-switcher navigates to.
   * e.g. '/faq', '/kontakt', '/cijene', '/treneri/leon-lisinski'
   */
  switchPath: string
}

export default function LegalNavbar({ switchPath }: LegalNavbarProps) {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLabels = t.raw('nav') as string[]
  const homeHref = lp(locale, '/')
  const navLinks: [string, string][] = [
    [t('common.navBack'),  homeHref],
    [navLabels[0],         lp(locale, '/kako-radi')],
    [navLabels[1],         `${homeHref}#funkcije`],
    [navLabels[2],         lp(locale, '/cijene')],
    [navLabels[3],         lp(locale, '/treneri')],
    ['FAQ',                lp(locale, '/faq')],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}${switchPath}`)
  }

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={homeHref} className="nl">
          <LogoSvg height={28} />
          <span className="nw">UnitLift</span>
        </Link>

        <ul className="navlinks">
          {navLinks.map(([label, href], i) => (
            <li key={label}>
              <a href={href} className={i === 0 ? 'nav-home-link' : ''}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="navact">
          <button className="langbtn navlang" onClick={switchLang}>
            {locale.toUpperCase()}
          </button>
          <a
            href={`${APP_URL}/login`}
            className="btn btn-g"
            style={{ fontSize: '.82rem', padding: '7px 16px' }}
          >
            {t('login')}
          </a>
          <a
            href={lp(locale, '/cijene')}
            className="btn btn-p"
            style={{ fontSize: '.82rem', padding: '7px 16px' }}
          >
            {t('common.tryFree')}
          </a>
          <button
            className="hburg"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={t('common.menuAria')}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <button
          className="langbtn mobc"
          onClick={() => { switchLang(); setMenuOpen(false) }}
        >
          {t('common.langSwitchLabel')} {otherLocale.toUpperCase()}
        </button>
      </div>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import LogoSvg from './LogoSvg'

export default function Navbar() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleLang() {
    const next = locale === 'hr' ? 'en' : 'hr'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || '/')
  }

  const navItems = t.raw('nav') as string[]
  const anchors = ['#kako-radi', '#funkcije', '#cijene', '#faq', '#kontakt']

  return (
    <>
      <nav
        id="navbar"
        style={{
          background: scrolled ? 'rgba(8,8,24,.97)' : 'rgba(8,8,24,.9)',
        }}
      >
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={26} />
          <span className="nw">UnitLift</span>
        </Link>

        <ul className="navlinks">
          {navItems.map((label, i) => (
            <li key={i}>
              <a href={anchors[i]}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="navact">
          <button className="langbtn" onClick={toggleLang}>
            {locale === 'hr' ? 'EN' : 'HR'}
          </button>
          <a href="https://app.unitlift.com/login" className="btn btn-g">
            {t('login')}
          </a>
          <a
            href="https://app.unitlift.com/register"
            className="btn btn-p"
          >
            {t('ctaNav')}
          </a>
          <button
            className="hburg"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`} id="mobMenu">
        {navItems.map((label, i) => (
          <a key={i} href={anchors[i]} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href="https://app.unitlift.com/login"
          onClick={() => setMenuOpen(false)}
        >
          {t('login')}
        </a>
        <a
          href="https://app.unitlift.com/register"
          className="btn btn-p btn-fw mobc"
          onClick={() => setMenuOpen(false)}
        >
          {t('ctaNav')}
        </a>
      </div>
    </>
  )
}

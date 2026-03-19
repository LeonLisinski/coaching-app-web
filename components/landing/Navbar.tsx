'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import LogoSvg from './LogoSvg'

export default function Navbar() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleLang() {
    const next = locale === 'hr' ? 'en' : 'hr'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || '/')
  }

  const isHr = locale === 'hr'

  const navItems = isHr
    ? [
        { label: 'Kako radi', href: `/${locale}/kako-radi` },
        { label: 'Mobilna app', href: '#funkcije' },
        { label: 'Cijene', href: `/${locale}/cijene` },
        { label: 'Blog', href: `/${locale}/blog` },
        { label: 'FAQ', href: '#faq' },
      ]
    : [
        { label: 'How it works', href: `/${locale}/kako-radi` },
        { label: 'Mobile app', href: '#funkcije' },
        { label: 'Pricing', href: `/${locale}/cijene` },
        { label: 'Blog', href: `/${locale}/blog` },
        { label: 'FAQ', href: '#faq' },
      ]

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
            {isHr ? 'Prijava' : 'Log in'}
          </a>
          <a href={`/${locale}#cijene`} className="btn btn-p">
            {isHr ? 'Isprobaj besplatno' : 'Try for free'}
          </a>
          <button className="langbtn navlang" onClick={toggleLang}>
            {locale === 'hr' ? 'EN' : 'HR'}
          </button>
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
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          href="https://app.unitlift.com/login"
          onClick={() => setMenuOpen(false)}
        >
          {isHr ? 'Prijava' : 'Log in'}
        </a>
        <a
          href={`/${locale}#cijene`}
          className="btn btn-p btn-fw mobc"
          onClick={() => setMenuOpen(false)}
        >
          {isHr ? 'Isprobaj besplatno' : 'Try for free'}
        </a>
        <button className="langbtn mobc" onClick={() => { toggleLang(); setMenuOpen(false) }}>
          {locale === 'hr' ? 'EN ↕' : 'HR ↕'}
        </button>
      </div>
    </>
  )
}

'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

export default function NotFound() {
  const locale = useLocale()
  const isHr = locale === 'hr'

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A1024',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'var(--f, system-ui, sans-serif)',
      textAlign: 'center',
    }}>
      <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
        <LogoSvg height={28} />
        <span style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>UnitLift</span>
      </Link>

      <div style={{ fontSize: 96, fontWeight: 900, color: '#0066FF', lineHeight: 1, marginBottom: 16 }}>404</div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
        {isHr ? 'Stranica nije pronađena' : 'Page not found'}
      </h1>
      <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 420, lineHeight: 1.6, margin: '0 0 36px' }}>
        {isHr
          ? 'Stranica koju tražiš ne postoji ili je premještena. Vrati se na početnu stranicu.'
          : 'The page you\'re looking for doesn\'t exist or has been moved. Go back to the homepage.'}
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href={`/${locale}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#0066FF', color: '#fff', fontWeight: 700,
          fontSize: '0.95rem', padding: '13px 28px', borderRadius: 12,
          textDecoration: 'none', transition: 'opacity .2s',
        }}>
          {isHr ? '← Početna' : '← Home'}
        </Link>
        <Link href={`/${locale}/cijene`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
          fontWeight: 600, fontSize: '0.95rem', padding: '13px 28px',
          borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)',
        }}>
          {isHr ? 'Pogledaj cijene' : 'See pricing'}
        </Link>
      </div>
    </div>
  )
}

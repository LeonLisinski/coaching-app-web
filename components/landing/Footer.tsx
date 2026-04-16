'use client'

import { useTranslations, useLocale } from 'next-intl'
import LogoSvg from './LogoSvg'


function ObfuscatedEmail() {
  const user = 'info'
  const domain = 'unitlift.com'
  return <a href={`mailto:${user}@${domain}`}>{user}@{domain}</a>
}

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.02a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1-.41z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const footerCols = t.raw('footerCols') as Array<{
    title: string
    links: [string, string][]
  }>

  return (
    <footer>
      <div className="con">
        <div className="fg2">
          {/* Brand column */}
          <div>
            <a href={`/${locale}`} className="flr">
              <LogoSvg height={22} />
              <span className="fwm">UnitLift</span>
            </a>
            <p className="ftag">{t('tagline')}</p>
            <div className="fsocial">
              <a href="https://www.instagram.com/unitlift.app/" className="fsoc-link" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
              <a href="https://www.tiktok.com/@unitlift" className="fsoc-link" aria-label="TikTok" title="TikTok" target="_blank" rel="noopener noreferrer">
                <TikTokIcon />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61575384151370" className="fsoc-link" aria-label="Facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
            </div>
            <div className="fco">
              {t('footer.company')}<br />
              {t('footer.owner')}<br />
              {t('footer.address')}<br />
              {t('footer.legal')}<br />
              <ObfuscatedEmail />
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col, i) => (
            <div key={i}>
              <div className="fct">{col.title}</div>
              <ul className="fls">
                {col.links.map(([label, href], j) => (
                  <li key={j}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="fbot">
          <span className="fcopy">{t('copy')}</span>
          <div className="payrow">
            <span className="paylbl">{t('payLbl')}</span>
            <div className="payico">
              <svg viewBox="0 0 52 18" width="44" height="16">
                <text x="26" y="14" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="15" fill="#1a1f71" letterSpacing="-0.3">VISA</text>
              </svg>
            </div>
            <div className="payico" style={{ padding: '3px 5px' }}>
              <svg viewBox="0 0 38 24" width="34" height="22">
                <circle cx="14" cy="12" r="10" fill="#EB001B"/>
                <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
                <path d="M19 4.8a10 10 0 0 1 0 14.4A10 10 0 0 1 19 4.8z" fill="#FF5F00"/>
              </svg>
            </div>
            <div className="payico dark">
              <svg viewBox="0 0 60 18" width="52" height="16">
                <text x="30" y="13" textAnchor="middle" fontFamily="-apple-system,Arial" fontWeight="500" fontSize="10" fill="white">Apple Pay</text>
              </svg>
            </div>
            <div className="payico">
              <svg viewBox="0 0 66 18" width="58" height="16">
                <text x="33" y="13" textAnchor="middle" fontFamily="Arial" fontWeight="500" fontSize="11">
                  <tspan fill="#4285F4">G</tspan>
                  <tspan fill="#5f6368">oogle </tspan>
                  <tspan fill="#4285F4">P</tspan>
                  <tspan fill="#EA4335">a</tspan>
                  <tspan fill="#FBBC05">y</tspan>
                </text>
              </svg>
            </div>
            <div className="payico blue">
              <svg viewBox="0 0 48 14" width="44" height="13">
                <text x="24" y="11" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="9" fill="white" letterSpacing="0.5">SEPA</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

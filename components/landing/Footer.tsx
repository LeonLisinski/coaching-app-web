import { useTranslations } from 'next-intl'
import LogoSvg from './LogoSvg'

export default function Footer() {
  const t = useTranslations()
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
            <a href="#" className="flr">
              <LogoSvg height={22} />
              <span className="fwm">UnitLift</span>
            </a>
            <p className="ftag">{t('tagline')}</p>
            <div className="fco">
              UnitDuo, obrt za digitalne usluge<br />
              vl. Leon Lišinski<br />
              Vijenac Ivana Meštrovića 80, Osijek<br />
              OIB: 61111415884 &nbsp;·&nbsp; MB: 99113821<br />
              <a href="mailto:info@unitlift.com">info@unitlift.com</a>
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
                <text x="1" y="14" fontFamily="Arial" fontWeight="900" fontSize="15" fill="#1a1f71" letterSpacing="-0.3">VISA</text>
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
                <text x="2" y="13" fontFamily="-apple-system,Arial" fontWeight="500" fontSize="10" fill="white">Apple Pay</text>
              </svg>
            </div>
            <div className="payico">
              <svg viewBox="0 0 66 18" width="58" height="16">
                <text x="1" y="13" fontFamily="Arial" fontWeight="500" fontSize="11">
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
                <text x="2" y="11" fontFamily="Arial" fontWeight="700" fontSize="9" fill="white" letterSpacing="0.5">SEPA</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

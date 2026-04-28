'use client'

import { useTranslations } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

const PRICES = [29, 59, 99]
const PLANS  = ['starter', 'pro', 'scale'] as const
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

export default function Pricing() {
  const t = useTranslations()
  const tiers = t.raw('tiers') as Array<{
    name: string
    price: number
    clients: string
    feats: string[]
    btn: string
  }>
  const baseFeats = t.raw('baseFeats') as string[]
  const ref = useReveal<HTMLElement>()

  const tierClass    = ['basic', 'pop', 'elite']
  const tierBtnClass = ['btn-p', 'btn-p', 'btn-p']

  return (
    <section className="sl sp pricing-home-sec" id="cijene" ref={ref}>
      <div className="con">
        <div className="tc rev">
          <div className="slbl">{t('priceLbl')}</div>
          <h2
            className="stit"
            style={{ color: 'var(--lt)' }}
            dangerouslySetInnerHTML={{ __html: t.raw('priceTit') as string }}
          />
          <p className="ssub">{t('priceSub')}</p>
        </div>

        <div className="pg pricing-page-grid">
          {tiers.map((tier, i) => (
            <div key={i} className={`pc pricing-page-card ${tierClass[i]} rev d${i + 1}`}>
              {i === 1 && <div className="popbdg">{t('pop')}</div>}
              <div className="ptier">{tier.name}</div>
              <div className="pamt">
                €<span>{PRICES[i]}</span>
                <span className="psmall">/mj</span>
              </div>
              <div className="pper" style={{ marginBottom: '22px' }}>{tier.clients}</div>
              <div className="pdiv" />
              <ul className="pfeats">
                {tier.feats.map((feat, j) => (
                  <li key={j}>
                    <span className="pchk">✓</span>
                    {feat}
                  </li>
                ))}
                {baseFeats.map((feat, j) => (
                  <li key={`base-${j}`} className="pfeat-muted">
                    <span className="pchk pchk-muted">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              {i === 2 && (
                <p style={{ marginBottom: '12px', fontSize: '.75rem', color: 'var(--lt)', textAlign: 'center', lineHeight: 1.5 }}>
                  {t('scaleNote')}
                </p>
              )}
              <a
                href={`${APP_URL}/register?plan=${PLANS[i]}`}
                className={`btn ${tierBtnClass[i]} btn-fw`}
                style={{ textAlign: 'center' }}
              >
                {tier.btn}
              </a>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '28px',
            color: 'var(--ls)',
            fontSize: '.83rem',
          }}
        >
          {t('priceNote')}
        </p>
      </div>
    </section>
  )
}

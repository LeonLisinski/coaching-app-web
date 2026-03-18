'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

const MONTHLY_PRICES = [29, 59, 99]
const YEARLY_PRICES = [24, 49, 82]

export default function Pricing() {
  const t = useTranslations()
  const tiers = t.raw('tiers') as Array<{
    name: string; price: number; priceY: number; save: string
    clients: string; feats: string[]; btn: string
  }>
  const [yearly, setYearly] = useState(false)
  const ref = useReveal<HTMLElement>()

  const tierClass = ['basic', 'pop', 'elite']
  const tierLink = [
    'https://app.unitlift.com/register',
    'https://app.unitlift.com/register',
    'mailto:support@unitlift.com',
  ]
  const tierBtnClass = ['btn-g', 'btn-p', 'btn-g']

  return (
    <section className="sd sp" id="cijene" ref={ref}>
      <div className="con">
        <div className="tc rev">
          <div className="slbl">{t('priceLbl')}</div>
          <h2
            className="stit"
            style={{ color: '#fff' }}
            dangerouslySetInnerHTML={{ __html: t.raw('priceTit') as string }}
          />
          <p className="ssub">{t('priceSub')}</p>

          <div className="billing-toggle">
            <span className={`toggle-lbl${!yearly ? ' active' : ''}`}>{t('ptM')}</span>
            <div
              className={`toggle-track${yearly ? ' yearly' : ''}`}
              onClick={() => setYearly((y) => !y)}
              role="button"
              aria-label="Toggle billing period"
            >
              <div className="toggle-thumb" />
            </div>
            <span className={`toggle-lbl${yearly ? ' active' : ''}`}>{t('ptY')}</span>
          </div>
        </div>

        <div className="pg">
          {tiers.map((tier, i) => (
            <div key={i} className={`pc ${tierClass[i]} rev d${i + 1}`}>
              {i === 1 && <div className="popbdg">{t('pop')}</div>}
              <div className="ptier">{tier.name}</div>
              <div className="pamt">
                €<span>{yearly ? YEARLY_PRICES[i] : MONTHLY_PRICES[i]}</span>
                <span className="psmall">/mj</span>
              </div>
              <div className="pper">
                {yearly
                  ? `${t('ptY').toLowerCase()} · €${tier.priceY}`
                  : `ili €${tier.priceY}/godišnje`}
              </div>
              <div className="psave">{tier.save}</div>
              <div className="pdiv" />
              <ul className="pfeats">
                {tier.feats.map((feat, j) => (
                  <li key={j}>
                    <span className="pchk">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href={tierLink[i]} className={`btn ${tierBtnClass[i]} btn-fw`}>
                {tier.btn}
              </a>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '28px',
            color: 'rgba(255,255,255,.5)',
            fontSize: '.83rem',
          }}
        >
          {t('priceNote')}
        </p>
      </div>
    </section>
  )
}

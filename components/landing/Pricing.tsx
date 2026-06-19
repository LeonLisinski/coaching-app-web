'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'
import { routing } from '@/i18n/routing'

import { PLANS, PRICES } from '@/lib/pricing-config'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.unitlift.com'

export default function Pricing() {
  const t = useTranslations()
  const locale = useLocale()
  const lp = (path: string) => locale === routing.defaultLocale ? path : `/${locale}${path}`
  const tiers = t.raw('tiers') as Array<{
    name: string
    price: number
    clients: string
    desc: string
    feats: string[]
    btn: string
  }>
  const baseFeats = t.raw('baseFeats') as string[]
  const ref = useReveal<HTMLElement>()

  const tierClass = ['basic', 'pop', 'elite']

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
            <div key={i} className={`pc pricing-page-card ${tierClass[i]} rev d${i + 1}`}
              style={{ paddingTop: i === 1 ? '50px' : undefined, position: 'relative' }}>
              {i === 1 && <div className="popbdg">{t('pop')}</div>}

              <div className="ptier">{tier.name}</div>

              <div className="pamt">
                €<span>{PRICES[PLANS[i]]}</span>
                <span className="psmall">/{t('common.monthSuffix')}</span>
              </div>

              <div className="pper" style={{ marginBottom: '8px' }}>{tier.clients}</div>
              {tier.desc && (
                <p style={{ fontSize: '.8rem', color: 'var(--ls)', marginBottom: '16px', lineHeight: 1.5 }}>{tier.desc}</p>
              )}
              <div className="pdiv" />
              <ul className="pfeats">
                {baseFeats.map((feat, j) => (
                  <li key={j}>
                    <span className="pchk">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href={`${APP_URL}/register?plan=${PLANS[i]}`}
                className="btn btn-p btn-fw"
                style={{ textAlign: 'center' }}
              >
                {tier.btn}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--ls)', fontSize: '.83rem' }}>
          {t('priceNote')}
        </p>
        <p style={{ textAlign: 'center', marginTop: '6px', color: 'var(--ls)', fontSize: '.83rem' }}>
          {t('scaleNote')}
        </p>

        {/* Demo CTA below pricing */}
        <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '28px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
          <a
            href={lp('/prezentacija')}
            className="btn btn-g"
            style={{ color: 'var(--ba)', borderColor: 'var(--ba)' }}
          >
            {t('demo.ctaBtn')}
          </a>
        </div>
      </div>
    </section>
  )
}

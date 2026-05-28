'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

const PRICES = [29, 59, 99]
const PLANS  = ['starter', 'pro', 'scale'] as const
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

function isFoundingPromoActive() {
  const end = process.env.NEXT_PUBLIC_FOUNDING_PROMO_END
  if (!end) return false
  return Date.now() < new Date(end).getTime()
}

function foundingPromoEndDate(locale: string) {
  const end = process.env.NEXT_PUBLIC_FOUNDING_PROMO_END
  if (!end) return null
  try {
    return new Date(end).toLocaleDateString(locale === 'en' ? 'en-GB' : 'hr-HR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch { return end }
}

export default function Pricing() {
  const t = useTranslations()
  const locale = useLocale()
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

  const promoActive  = isFoundingPromoActive()
  const promoEndDate = foundingPromoEndDate(locale)

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

        {/* Founding promo banner */}
        {promoActive && (
          <div style={{
            maxWidth: '560px', margin: '0 auto 32px',
            background: '#fffaf5',
            border: '1px solid rgba(200,100,20,.22)',
            borderRadius: '14px', padding: '16px 20px',
            display: 'flex', alignItems: 'flex-start', gap: '12px',
          }}>
            <span style={{ fontSize: '1.1rem', lineHeight: 1, paddingTop: '3px', flexShrink: 0 }}>🎉</span>
            <div>
              <p style={{ margin: '0 0 5px', fontWeight: 700, fontSize: '.88rem', color: 'var(--lt)', letterSpacing: '-.2px' }}>
                {t('foundingBannerTitle')}
              </p>
              <p style={{ margin: '0 0 10px', fontSize: '.79rem', color: 'var(--ls)', lineHeight: 1.6 }}>
                {t('foundingBannerDesc')}
              </p>
              {promoEndDate && (
                <span style={{
                  display: 'inline-block', fontSize: '.73rem', fontWeight: 600,
                  color: '#b84a00', background: 'rgba(180,80,0,.08)',
                  border: '1px solid rgba(180,80,0,.15)',
                  borderRadius: '5px', padding: '2px 9px',
                }}>
                  {t('foundingBannerEnds', { date: promoEndDate })}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="pg pricing-page-grid">
          {tiers.map((tier, i) => (
            <div key={i} className={`pc pricing-page-card ${tierClass[i]} rev d${i + 1}`}
              style={{ paddingTop: i === 1 ? '50px' : undefined }}>
              {i === 1 && <div className="popbdg">{t('pop')}</div>}
              <div className="ptier">{tier.name}</div>

              {/* Price — founding discount if promo active */}
              {promoActive ? (
                <div style={{ marginBottom: '4px' }}>
                  <div className="pamt" style={{ marginBottom: '2px' }}>
                    €<span>{(PRICES[i] / 2).toFixed(2).replace('.00', '')}</span>
                    <span className="psmall">/mj</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '.76rem', color: '#9ca3af', textDecoration: 'line-through' }}>€{PRICES[i]}</span>
                    <span style={{ fontSize: '.7rem', fontWeight: 700, color: '#e05a00', background: 'rgba(255,107,0,.1)', borderRadius: '5px', padding: '2px 8px' }}>
                      uštedi €{(PRICES[i] / 2 * 12).toFixed(0)}/god
                    </span>
                  </div>
                </div>
              ) : (
                <div className="pamt">
                  €<span>{PRICES[i]}</span>
                  <span className="psmall">/mj</span>
                </div>
              )}

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
              {i === 2 && (
                <div style={{
                  marginBottom: '14px', padding: '9px 12px',
                  background: 'rgba(0,0,0,.03)', borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,.07)',
                }}>
                  <p style={{ margin: 0, fontSize: '.76rem', color: 'var(--ls)', lineHeight: 1.5 }}>
                    {t('scaleNote')}
                  </p>
                </div>
              )}
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
      </div>
    </section>
  )
}

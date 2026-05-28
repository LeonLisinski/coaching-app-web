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
          <div style={{ maxWidth: '560px', margin: '0 auto 32px' }}>
            <div style={{
              background: 'linear-gradient(135deg,#f07020,#f5a020)',
              borderRadius: '14px', padding: '16px 22px',
              boxShadow: '0 4px 18px rgba(220,100,0,.22)',
            }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '.95rem', color: '#fff', letterSpacing: '-.2px' }}>
                🎉 {t('foundingBannerTitle')}
              </p>
            </div>
            <div style={{ paddingTop: '8px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: '.75rem', color: 'var(--ls)', lineHeight: 1.5 }}>
                * {t('foundingBannerDesc')}
              </p>
              {promoEndDate && (
                <p style={{ margin: 0, fontSize: '.73rem', color: 'var(--ls)' }}>
                  ⏳ {t('foundingBannerEnds', { date: promoEndDate })}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="pg pricing-page-grid">
          {tiers.map((tier, i) => (
            <div key={i} className={`pc pricing-page-card ${tierClass[i]} rev d${i + 1}`}
              style={{ paddingTop: i === 1 ? '50px' : undefined, position: 'relative' }}>
              {i === 1 && <div className="popbdg">{t('pop')}</div>}

              {/* PROMO badge — consistent position on all cards (below NAJPOPULARNIJI on Pro) */}
              {promoActive && (
                <div style={{
                  position: 'absolute', top: '40px', right: 0,
                  background: 'linear-gradient(135deg,#f07020,#f5a020)',
                  color: '#fff', fontWeight: 800, fontSize: '.62rem', letterSpacing: '.05em',
                  padding: '4px 11px', borderRadius: '0 0 0 9px',
                }}>
                  {t('foundingLabel')}
                </div>
              )}

              <div className="ptier">{tier.name}</div>

              {/* Price */}
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
      </div>
    </section>
  )
}

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
            maxWidth: '640px', margin: '0 auto 36px',
            background: 'linear-gradient(135deg, #ff6b00 0%, #ff8c00 50%, #ffaa00 100%)',
            borderRadius: '20px', padding: '20px 28px',
            boxShadow: '0 8px 32px rgba(255,107,0,.35)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🎉</span>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '-.3px' }}>
                {t('foundingBannerTitle').replace('🎉 ', '')}
              </p>
            </div>
              <p style={{ margin: 0, fontSize: '.85rem', color: 'rgba(255,255,255,.88)', lineHeight: 1.55 }}>
              {t('foundingBannerDesc')}
            </p>
            {promoEndDate && (
              <div style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,.18)', borderRadius: '8px', padding: '4px 12px' }}>
                <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#fff' }}>
                  ⏳ {t('foundingBannerEnds', { date: promoEndDate })}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="pg pricing-page-grid">
          {tiers.map((tier, i) => (
            <div key={i} className={`pc pricing-page-card ${tierClass[i]} rev d${i + 1}`}
              style={{
                paddingTop: i === 1 ? '50px' : undefined,
                outline: promoActive ? '2px solid rgba(255,107,0,.35)' : undefined,
                position: 'relative',
                overflow: promoActive ? 'visible' : undefined,
              }}>
              {i === 1 && <div className="popbdg">{t('pop')}</div>}

              {/* Promo ribbon on each card */}
              {promoActive && (
                <div style={{
                  position: 'absolute', top: i === 1 ? '46px' : '0', right: '0',
                  background: 'linear-gradient(135deg,#ff6b00,#ffaa00)',
                  color: '#fff', fontWeight: 800, fontSize: '.65rem', letterSpacing: '.06em',
                  padding: '4px 12px', borderRadius: i === 1 ? '0 12px 0 10px' : '0 12px 0 10px',
                }}>
                  {t('foundingLabel')}
                </div>
              )}

              <div className="ptier">{tier.name}</div>

              {/* Price — founding discount if promo active */}
              {promoActive ? (
                <div style={{ marginBottom: '4px' }}>
                  <div className="pamt" style={{ marginBottom: '2px' }}>
                    €<span>{(PRICES[i] / 2).toFixed(2).replace('.00', '')}</span>
                    <span className="psmall">/mj</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>€{PRICES[i]}/mj</span>
                    <span style={{
                      fontSize: '.72rem', fontWeight: 800, color: '#fff',
                      background: 'linear-gradient(135deg,#ff6b00,#ffaa00)',
                      borderRadius: '6px', padding: '2px 8px',
                      boxShadow: '0 2px 8px rgba(255,107,0,.3)',
                    }}>
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
                <p style={{ marginBottom: '12px', fontSize: '.75rem', color: 'var(--lt)', textAlign: 'center', lineHeight: 1.5 }}>
                  {t('scaleNote')}
                </p>
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

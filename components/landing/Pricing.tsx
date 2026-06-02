'use client'

import { useState, useEffect } from 'react'
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

  // Must be client-only — toLocaleDateString differs between Node.js and browser ICU
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const promoActive  = mounted && isFoundingPromoActive()
  const promoEndDate = mounted ? foundingPromoEndDate(locale) : null

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
            maxWidth: '520px', margin: '16px auto 36px',
            background: '#fff0e0',
            border: '1px solid #d97318',
            borderLeft: '4px solid #d97318',
            borderRadius: '8px', padding: '12px 18px',
            boxShadow: '0 2px 8px rgba(180,90,0,.1)',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              flexShrink: 0, background: '#d97318', color: '#fff',
              fontWeight: 800, fontSize: '.7rem', letterSpacing: '.06em',
              padding: '5px 10px', borderRadius: '6px', textTransform: 'uppercase',
              lineHeight: 1.3, textAlign: 'center',
            }}>
              {t('foundingBannerTitle')}
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: '.9rem', color: '#9b3800', lineHeight: 1.2 }}>
                {t('foundingBannerDesc')}
              </p>
              {promoEndDate && (
                <p style={{ margin: 0, fontSize: '.74rem', color: '#b85c20' }}>
                  {t('foundingBannerEnds', { date: promoEndDate })}
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

              {/* Promo badge */}
              {promoActive && (
                <div style={{
                  position: 'absolute', top: '40px', right: 0,
                  background: '#d97318', color: '#fff',
                  fontWeight: 800, fontSize: '.63rem', letterSpacing: '.05em',
                  padding: '3px 10px', borderRadius: '5px 0 0 5px',
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

        {/* Demo CTA below pricing */}
        <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '28px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
          <p style={{ color: 'var(--ls)', fontSize: '.85rem', marginBottom: '12px' }}>
            {t('demo.ctaDesc')}
          </p>
          <a
            href={`/prezentacija`}
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

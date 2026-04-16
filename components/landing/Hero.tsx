'use client'

import { useTranslations, useLocale } from 'next-intl'
import dynamic from 'next/dynamic'

const AppShowcase = dynamic(() => import('./AppShowcase'), { ssr: false })

export default function Hero() {
  const t = useTranslations()
  const locale = useLocale()
  const feats = t.raw('heroFeats') as string[]

  return (
    <section className="hero">
      <div className="hbg" />
      <div className="hgrid" />

      <div className="hbadge">
        <span className="bdot" />
        <span>{t('badge')}</span>
      </div>

      <h1
        dangerouslySetInnerHTML={{
          __html: t.raw('h1') as string,
        }}
      />

      <p className="hsub">{t('sub')}</p>

      <div>
        <div className="hcta">
          <a href={`/${locale}#cijene`} className="btn btn-p btn-xl">
            {t('btn1')}
          </a>
          <a href={`/${locale}/kako-radi`} className="btn btn-g btn-lg">
            {t('btn2')}
          </a>
        </div>
        <p className="hnote">{t('note')}</p>
      </div>

      {/* Desktop: app mockup slideshow */}
      <div className="hero-showcase-desktop">
        <AppShowcase />
      </div>

      {/* Mobile only: compact feature checklist */}
      <div className="hero-feats-wrap">
        <div className="hero-feats">
          {feats.map((f) => (
            <div key={f} className="hero-feat">
              <span className="hfeat-check">✓</span>
              <span className="hfeat-lbl">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

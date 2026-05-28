import { useTranslations, useLocale } from 'next-intl'

export default function CTA() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="ctasec" id="kontakt">
      <h2
        className="ctat"
        dangerouslySetInnerHTML={{ __html: t.raw('ctaT') as string }}
      />
      <p className="ctas">{t('ctaS')}</p>
      <div className="ctabtns">
        <a href={`/${locale}#cijene`} className="btn btn-p btn-xl">
          {t('ctaB1')}
        </a>
        <a href={`/${locale}/prezentacija`} className="btn btn-g btn-lg">
          {t('demo.ctaBtn')}
        </a>
      </div>
      <p style={{ marginTop: '10px', color: 'rgba(255,255,255,.42)', fontSize: '.77rem' }}>
        {t('demo.ctaDesc')}
      </p>
      <p style={{ marginTop: '18px', color: 'rgba(255,255,255,.5)', fontSize: '.8rem' }}>
        {t('ctaN')}
      </p>
    </section>
  )
}

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
      <p style={{ marginTop: '12px', color: 'rgba(255,255,255,.45)', fontSize: '.77rem' }}>
        {t('ctaN')}
      </p>
    </section>
  )
}

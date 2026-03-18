import { useTranslations } from 'next-intl'

export default function CTA() {
  const t = useTranslations()

  return (
    <section className="ctasec" id="kontakt">
      <h2
        className="ctat"
        dangerouslySetInnerHTML={{ __html: t.raw('ctaT') as string }}
      />
      <p className="ctas">{t('ctaS')}</p>
      <div className="ctabtns">
        <a href="https://app.unitlift.com/register" className="btn btn-p btn-xl">
          {t('ctaB1')}
        </a>
        <a href="mailto:support@unitlift.com" className="btn btn-g btn-lg">
          {t('ctaB2')}
        </a>
      </div>
      <p style={{ marginTop: '18px', color: 'rgba(255,255,255,.5)', fontSize: '.8rem' }}>
        {t('ctaN')}
      </p>
    </section>
  )
}

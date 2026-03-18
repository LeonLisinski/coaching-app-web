import { useTranslations } from 'next-intl'
import AppShowcase from './AppShowcase'

export default function Hero() {
  const t = useTranslations()

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
          <a
            href="https://app.unitlift.com/register"
            className="btn btn-p btn-xl"
          >
            {t('btn1')}
          </a>
          <a href="#kako-radi" className="btn btn-g btn-lg">
            {t('btn2')}
          </a>
        </div>
        <p className="hnote">{t('note')}</p>
      </div>

      <AppShowcase />
    </section>
  )
}

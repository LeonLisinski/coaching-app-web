'use client'

import { useTranslations } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

export default function HowItWorks() {
  const t = useTranslations()
  const steps = t.raw('steps') as Array<{ t: string; d: string }>
  const ref = useReveal<HTMLElement>()

  return (
    <section className="sl sp" id="kako-radi" ref={ref}>
      <div className="con">
        <div className="tc rev">
          <div className="slbl">{t('howLbl')}</div>
          <h2
            className="stit"
            dangerouslySetInnerHTML={{ __html: t.raw('howTit') as string }}
          />
          <p className="ssub">{t('howSub')}</p>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <div key={i} className={`step rev d${i + 1}`}>
              <div className="snum">{i + 1}</div>
              <h3 className="stl">{step.t}</h3>
              <p className="sdesc">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

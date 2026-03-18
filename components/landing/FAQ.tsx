'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function FAQ() {
  const t = useTranslations()
  const faqs = t.raw('faqs') as Array<{ q: string; a: string }>
  const [open, setOpen] = useState<number | null>(null)
  const ref = useReveal<HTMLElement>()

  function toggle(i: number) {
    setOpen((prev) => (prev === i ? null : i))
  }

  return (
    <section className="sa sp" id="faq" ref={ref}>
      <div className="con">
        <div className="tc rev">
          <div className="slbl">{t('faqLbl')}</div>
          <h2 className="stit">{t('faqTit')}</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <span className="faqico">
                  <PlusIcon />
                </span>
              </button>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

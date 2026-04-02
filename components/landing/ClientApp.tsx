'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const IMAGES = [
  '/home-portrait.png',
  '/vjezbe-portrait.png',
  '/nutrition-portrait.png',
  '/chat-portrait.png',
  '/checkin-portrait.png',
]

const IMG_W = 320
const IMG_H = Math.round(IMG_W * 844 / 390) // 692

export default function ClientApp() {
  const t = useTranslations()
  const feats = t.raw('cappFeats') as Array<{ badge: string; t: string; d: string; bullets: string[] }>
  const n = feats.length // 4

  // ─── Desktop: IntersectionObserver drives active screenshot ───────────────
  const [activeIdx, setActiveIdx] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const i = blockRefs.current.indexOf(entry.target as HTMLDivElement)
            if (i !== -1) setActiveIdx(i)
          }
        })
      },
      { threshold: 0.5 },
    )
    blockRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ─── Mobile: infinite-loop carousel ───────────────────────────────────────
  // DOM order: [clone_of_last, real_0, real_1, real_2, real_3, clone_of_first]
  const slides = [
    { feat: feats[n - 1], src: IMAGES[n - 1] },
    ...feats.map((feat, i) => ({ feat, src: IMAGES[i] })),
    { feat: feats[0], src: IMAGES[0] },
  ]

  const ITEM_VW = 80          // each slide width in vw
  const SIDE_VW = (100 - ITEM_VW) / 2 // 10vw — centres active slide

  const [vi, setVi] = useState(1)           // visual index (1 = first real)
  const [doAnimate, setDoAnimate] = useState(true)
  const touchStartX = useRef(0)

  // active dot: works for clone indices too
  const dotIdx = ((vi - 1) % n + n) % n

  const goTo = (next: number, animate = true) => {
    setDoAnimate(animate)
    setVi(next)
  }

  const handleTransitionEnd = () => {
    if (vi === 0) {
      // landed on clone of last → jump silently to real last
      setDoAnimate(false)
      setVi(n)
    } else if (vi === slides.length - 1) {
      // landed on clone of first → jump silently to real first
      setDoAnimate(false)
      setVi(1)
    }
  }

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (dx > 40) goTo(vi + 1)
    else if (dx < -40) goTo(vi - 1)
  }

  return (
    <section className="sa" id="funkcije">

      {/* ── Section header (both breakpoints) ── */}
      <div className="con capp-header">
        <div className="slbl">{t('cappLbl')}</div>
        <h2
          className="stit"
          dangerouslySetInnerHTML={{ __html: t.raw('cappTit') as string }}
        />
      </div>

      {/* ── DESKTOP: sticky scroll ── */}
      <div className="capp-sticky-wrap">

        {/* Left: sticky image column */}
        <div className="capp-sticky-left">
          <div className="capp-img-stack">
            {IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={feats[i]?.t ?? ''}
                width={IMG_W}
                height={IMG_H}
                className={`capp-fade-img${activeIdx === i ? ' active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </div>

        {/* Right: scrolling text blocks */}
        <div className="capp-sticky-right">
          {feats.map((feat, i) => (
            <div
              key={i}
              ref={el => { blockRefs.current[i] = el }}
              className="capp-text-block"
            >
              <div className="capp-text-inner">
                <span className="capp-badge">{feat.badge}</span>
                <h3 className="capp-title">{feat.t}</h3>
                <p className="capp-desc">{feat.d}</p>
                {feat.bullets && (
                  <ul className="capp-bullets">
                    {feat.bullets.map((b, j) => (
                      <li key={j} className="capp-bullet">
                        <span className="capp-bullet-check">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
          <div className="capp-right-end" />
        </div>
      </div>

      {/* ── MOBILE: infinite-loop carousel ── */}
      <div
        className="capp-carousel-outer"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="capp-carousel-track"
          style={{
            transform: `translateX(calc(${SIDE_VW}vw - ${vi * ITEM_VW}vw))`,
            transition: doAnimate
              ? 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)'
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map(({ feat, src }, i) => (
            <div key={i} className="capp-car-slide">
              <Image
                src={src}
                alt={feat.t}
                width={390}
                height={844}
                className="capp-car-img"
                priority={i === 1}
              />
              <div className="capp-car-info">
                <h3 className="capp-car-title">{feat.t}</h3>
                <p className="capp-car-desc">{feat.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="capp-dots" role="tablist" aria-label="Carousel indicators">
          {feats.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={dotIdx === i}
              className={`capp-dot${dotIdx === i ? ' active' : ''}`}
              onClick={() => goTo(i + 1)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}

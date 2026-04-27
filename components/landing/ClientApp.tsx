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
  '/profil-portrait.png',
]

const IMG_W = 320
const IMG_H = Math.round(IMG_W * 844 / 390) // 692

export default function ClientApp() {
  const t = useTranslations()
  const feats = t.raw('cappFeats') as Array<{
    badge: string
    t: string
    d: string
    bullets: string[]
    imgAlt: string
  }>
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
  const SIDE_VW = (100 - ITEM_VW) / 2 // 10vw - centres active slide

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
        <p className="ssub" style={{ margin: '0 auto', color: 'var(--ls)' }}>{t('cappSub')}</p>
      </div>

      {/* ── DESKTOP: sticky scroll ── */}
      <div className="capp-sticky-wrap">

        {/* Left: sticky image column */}
        <div className="capp-sticky-left">
          <div className="capp-phone-glow">
            <div className="capp-img-stack">
              {IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={feats[i]?.imgAlt ?? feats[i]?.t ?? ''}
                  width={IMG_W}
                  height={IMG_H}
                  className={`capp-fade-img${activeIdx === i ? ' active' : ''}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  sizes="320px"
                />
              ))}
            </div>
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
            <div key={i} className={`capp-car-slide${i === vi ? ' active' : ''}`}>
              <div className="capp-phone-glow">
                <Image
                  src={src}
                  alt={feat.imgAlt ?? feat.t}
                  width={390}
                  height={844}
                  className="capp-car-img"
                  priority={i >= 1 && i <= 4}
                  sizes="(max-width:768px) min(72vw,270px), 270px"
                />
              </div>
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

        {/* Store buttons - mobile only */}
        <div className="capp-store-row">
          <a
            href="https://apps.apple.com/app/unitlift/id6742650853"
            target="_blank"
            rel="noopener noreferrer"
            className="capp-store-btn"
            aria-label="Download on the App Store"
          >
            {/* Apple logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="capp-store-txt">
              <span>Download on the</span>
              <span>App Store</span>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.unitlift.app"
            target="_blank"
            rel="noopener noreferrer"
            className="capp-store-btn"
            aria-label="Get it on Google Play"
          >
            {/* Google Play logo */}
            <Image src="/google-play-icon.png" alt="" width={22} height={22} style={{ display: 'block' }} />
            <div className="capp-store-txt">
              <span>Get it on</span>
              <span>Google Play</span>
            </div>
          </a>
        </div>
      </div>

    </section>
  )
}

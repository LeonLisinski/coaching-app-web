'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" style={{ flexShrink: 0 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const avatarPalette = [
  'linear-gradient(135deg,#3344ff,#5566ff)',
  'linear-gradient(135deg,#0ea5e9,#38bdf8)',
  'linear-gradient(135deg,#e06010,#f0851a)',
  'linear-gradient(135deg,#8b5cf6,#a78bfa)',
  'linear-gradient(135deg,#1a9e5a,#3dbb78)',
  'linear-gradient(135deg,#ec4899,#f472b6)',
  'linear-gradient(135deg,#14b8a6,#2dd4bf)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)',
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

// Number of clones prepended & appended for seamless loop (>= max visible cards)
const CLONES = 6

export default function Testimonials() {
  const t = useTranslations()
  const items = t.raw('testimonials') as Array<{
    q: string; name: string; role: string; badge: string
  }>
  const N = items.length

  // Build: [tail-clones … real items … head-clones]
  const slides = useMemo(() => [
    ...items.slice(-CLONES),
    ...items,
    ...items.slice(0, CLONES),
  ], [items])

  // rawIdx CLONES = first real item
  const [rawIdx, setRawIdx] = useState(CLONES)
  const [anim,   setAnim]     = useState(true)
  const [perPage, setPerPage] = useState(3)

  const autoRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const sectionRef  = useReveal<HTMLElement>()

  // Responsive perPage (integer used for dots/logic)
  useEffect(() => {
    const update = () => {
      setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1100 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  // After transition finishes, silently jump if we're on clones
  const checkJump = useCallback((raw: number) => {
    setTimeout(() => {
      const real = raw - CLONES
      if (real >= N || real < 0) {
        const clamped = CLONES + ((real % N) + N) % N
        setAnim(false)
        setRawIdx(clamped)
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)))
      }
    }, 460)
  }, [N])

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setRawIdx(r => { const n = r + 1; checkJump(n); return n })
      setAnim(true)
    }, 4800)
  }, [checkJump])

  useEffect(() => {
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [startAuto])

  const go = useCallback((raw: number) => {
    setAnim(true)
    setRawIdx(raw)
    checkJump(raw)
    startAuto()
  }, [checkJump, startAuto])

  const prev = () => go(rawIdx - 1)
  const next = () => go(rawIdx + 1)

  // Active dot = real 0-based index
  const dotActive = ((rawIdx - CLONES) % N + N) % N

  // Visible card count including peek of next card
  // Higher number = narrower cards
  const peekMap: Record<number, number> = { 1: 1.0, 2: 3.2, 3: 4.6 }
  const visibleCount = peekMap[perPage] ?? perPage
  const slideW = 100 / visibleCount   // % per slide relative to track width

  // Touch
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 48) next()
    else if (diff < -48) prev()
  }

  return (
    <section className="sl sp" id="recenzije" ref={sectionRef}>
      <div className="con">
        <div className="tc rev">
          <div className="slbl">{t('testLbl')}</div>
          <h2
            className="stit"
            dangerouslySetInnerHTML={{ __html: t.raw('testTit') as string }}
          />
        </div>
      </div>

      <div className="tcar-wrap">
        <div
          className="tcar-vp"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="tcar-track"
            style={{
              transform: `translateX(-${rawIdx * slideW}%)`,
              transition: anim ? 'transform .46s cubic-bezier(.4,0,.2,1)' : 'none',
            }}
          >
            {slides.map((item, i) => {
              const isClient = item.badge === 'Klijent' || item.badge === 'Client'
              const isClone = i < CLONES || i >= CLONES + N
              return (
                <div
                  key={i}
                  className="tcar-slide"
                  style={{ flex: `0 0 ${slideW}%` }}
                  aria-hidden={isClone ? 'true' : undefined}
                >
                  <div className="tcard">
                    <div className="tbadge-row">
                      <span className={`tbadge${isClient ? ' client' : ' trainer'}`}>
                        {item.badge}
                      </span>
                      <div className="tstars">
                        {[...Array(5)].map((_, s) => <StarIcon key={s} />)}
                      </div>
                    </div>
                    <p className="ttext">&ldquo;{item.q}&rdquo;</p>
                    <div className="tauth">
                      <div
                        className="tav"
                        style={{ background: avatarPalette[i % avatarPalette.length] }}
                      >
                        {getInitials(item.name)}
                      </div>
                      <div>
                        <div className="tname">{item.name}</div>
                        <div className="trole">{item.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="con">
          <div className="tcar-ctrl">
            <button className="tcar-arrow" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="tcar-dots">
              {items.map((_, d) => (
                <button
                  key={d}
                  className={`tcar-dot${dotActive === d ? ' active' : ''}`}
                  onClick={() => go(d + CLONES)}
                  aria-label={`Recenzija ${d + 1}`}
                />
              ))}
            </div>

            <button className="tcar-arrow" onClick={next} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const SHOTS = [
  { src: '/home-portrait.png',      label: 'Pregled' },
  { src: '/vjezbe-portrait.png',    label: 'Treninzi' },
  { src: '/nutrition-portrait.png', label: 'Prehrana' },
  { src: '/chat-portrait.png',      label: 'Chat' },
  { src: '/checkin-portrait.png',   label: 'Check-in' },
]

const LOOP = [...SHOTS, ...SHOTS]

export default function ClientAppStrip() {
  const [lb, setLb] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const touchX = useRef(0)

  useEffect(() => {
    setMounted(true)
    const prefetch = () => {
      SHOTS.forEach(shot => {
        fetch(`/_next/image?url=${encodeURIComponent(shot.src)}&w=1024&q=75`)
          .catch(() => {})
      })
    }
    const t = setTimeout(prefetch, 1200)
    return () => clearTimeout(t)
  }, [])

  const open  = (i: number) => setLb(i % SHOTS.length)
  const close = useCallback(() => setLb(null), [])
  const prev  = useCallback(() => setLb(i => i === null ? null : (i - 1 + SHOTS.length) % SHOTS.length), [])
  const next  = useCallback(() => setLb(i => i === null ? null : (i + 1) % SHOTS.length), [])

  useEffect(() => {
    if (lb === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lb, close, prev, next])

  const lightbox = lb !== null && (
    <div
      className="strip-lb"
      onClick={close}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        const dx = touchX.current - e.changedTouches[0].clientX
        if (dx > 50) next()
        else if (dx < -50) prev()
      }}
      role="dialog"
      aria-modal="true"
    >
      <button className="strip-lb-x" onClick={close} aria-label="Zatvori">✕</button>
      <button className="strip-lb-arr strip-lb-prev" onClick={e => { e.stopPropagation(); prev() }} aria-label="Prethodna">‹</button>

      <div className="strip-lb-inner" onClick={e => e.stopPropagation()}>
        <div className="strip-lb-img-wrap strip-lb-port">
          <Image
            src={SHOTS[lb].src}
            alt={`UnitLift klijentska aplikacija - ${SHOTS[lb].label}`}
            fill
            sizes="(max-width:768px) 70vw, 320px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className="strip-lb-footer">
          <span className="strip-lb-lbl">{SHOTS[lb].label}</span>
          <span className="strip-lb-count">{lb + 1} / {SHOTS.length}</span>
        </div>
      </div>

      <button className="strip-lb-arr strip-lb-next" onClick={e => { e.stopPropagation(); next() }} aria-label="Sljedeća">›</button>
    </div>
  )

  return (
    <>
      <div className="castrip-outer">
        <div className="dstrip-head">
          <span className="dstrip-badge">Klijentska mobilna aplikacija</span>
          <p className="dstrip-sub">Što klijent vidi u aplikaciji — besplatno za iOS i Android</p>
        </div>
        <div className="dstrip-mask">
          <div className="castrip-track">
            {LOOP.map((shot, i) => (
              <div
                key={i}
                className="castrip-card"
                onClick={() => open(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && open(i)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={shot.src}
                  alt={`UnitLift klijentska aplikacija - ${shot.label}`}
                  width={390}
                  height={844}
                  className="castrip-img"
                  sizes="130px"
                  loading="lazy"
                />
                <span className="dstrip-lbl">{shot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render lightbox via portal — bypasses overflow:hidden on parent elements */}
      {mounted && lightbox && createPortal(lightbox, document.body)}
    </>
  )
}

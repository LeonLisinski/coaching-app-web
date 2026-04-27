'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const SHOTS = [
  { src: '/screenshot-dashboard.png', label: 'Dashboard' },
  { src: '/screenshot-klijenti.png', label: 'Klijenti' },
  { src: '/screenshot-treninzi.png', label: 'Treninzi' },
  { src: '/screenshot-prehrana.png', label: 'Prehrana' },
  { src: '/screenshot-checkin.png', label: 'Check-in' },
  { src: '/screenshot-financije.png', label: 'Financije' },
  { src: '/screenshot-chat.png', label: 'Chat' },
]

const LOOP = [...SHOTS, ...SHOTS]

export default function DashboardStrip() {
  const [lb, setLb] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const touchX = useRef(0)

  useEffect(() => {
    setMounted(true)
    // Warm up Next.js server image cache for lightbox sizes.
    // /_next/image caches the resized result so the first lightbox open is instant.
    const prefetch = () => {
      SHOTS.forEach(shot => {
        fetch(`/_next/image?url=${encodeURIComponent(shot.src)}&w=1024&q=75`)
          .catch(() => {})
      })
    }
    const t = setTimeout(prefetch, 3000)
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
        <div className="strip-lb-img-wrap strip-lb-land">
          <Image
            src={SHOTS[lb].src}
            alt={`UnitLift ${SHOTS[lb].label}`}
            fill
            sizes="(max-width:768px) 88vw, 82vw"
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
      <div className="dstrip-outer">
        <div className="dstrip-head">
          <span className="dstrip-badge">Web dashboard za trenere</span>
          <p className="dstrip-sub">Sve što vodiš kao trener — na jednom ekranu</p>
        </div>
        <div className="dstrip-mask">
          <div className="dstrip-track">
            {LOOP.map((shot, i) => (
              <div
                key={i}
                className="dstrip-card"
                onClick={() => open(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && open(i)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={shot.src}
                  alt={`UnitLift ${shot.label} - web dashboard za online trenere`}
                  width={320}
                  height={200}
                  className="dstrip-img"
                  sizes="220px"
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

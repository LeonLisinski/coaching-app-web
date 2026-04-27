'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Slides that use real screenshots (index → public path)
const SCREENSHOTS: Record<number, string> = {
  0: '/screenshot-dashboard.png',
  1: '/screenshot-klijenti.png',
  2: '/screenshot-treninzi.png',
  3: '/screenshot-prehrana.png',
  4: '/screenshot-checkin.png',
  5: '/screenshot-financije.png',
  7: '/screenshot-profil.png',
}

const TOTAL_SLIDES = 8

function SidebarNav({ active, items, activeMap }: { active: number; items: { label: string; icon: React.ReactNode }[]; activeMap: number[] }) {
  return (
    <div className="msb">
      <div className="mlr">
        <div className="mlb">UL</div>
        <span className="mln">UnitLift</span>
      </div>
      {items.map((item, i) => {
        const isAct = activeMap[i] === active
        return (
          <div key={i} className={`mnv${isAct ? ' act' : ''}`}>
            {item.icon} {item.label}
          </div>
        )
      })}
    </div>
  )
}

export default function AppShowcase() {
  const t = useTranslations('showcase')
  const [cur, setCur] = useState(0)
  const apRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = t.raw('slides') as string[]
  const screenshotAlts = t.raw('screenshotAlts') as string[]
  const sidebarItems = (t.raw('sidebarItems') as string[]).map((label, i) => ({
    label,
    icon: [
      <svg key={0} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
      <svg key={1} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>,
      <svg key={2} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4M8 12h8"/></svg>,
      <svg key={3} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>,
      <svg key={4} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
      <svg key={5} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      <svg key={6} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    ][i],
  }))

  // Maps sidebar item index → slide index that activates it
  const sidebarActiveMap = [0, 1, 2, 3, 4, 5, 6]

  const SlideChat = () => (
    <div className="mcnt">
      <div className="mh">{t('chatTitle')}</div>
      <div className="msh">{t('chatSub')}</div>
      <div className="mchat">
        <div className="mmsgs">
          <div className="mmsg r">{t('chatMsg1')}<div className="mmsg-t">10:32</div></div>
          <div className="mmsg s">{t('chatMsg2')}<div className="mmsg-t">10:45</div></div>
          <div className="mmsg r">{t('chatMsg3')}<div className="mmsg-t">10:47</div></div>
          <div className="mmsg s">{t('chatMsg4')}<div className="mmsg-t">10:50</div></div>
        </div>
      </div>
    </div>
  )

  const SlideProfil = () => (
    <div className="mcnt">
      <div className="mh">{t('profileTitle')}</div>
      <div className="msh">{t('profileSub')}</div>
      <div className="mcli" style={{ marginBottom: 10, padding: '12px 11px' }}>
        <div className="mav" style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#0066FF,#4488ff)', fontSize: '.75rem' }}>MJ</div>
        <div style={{ flex: 1 }}>
          <div className="mcln">Marko Jurić</div>
          <div className="mclp">Personal Trainer · Zagreb</div>
        </div>
        <span className="mbdg bb2">{t('profileBadge')}</span>
      </div>
      <div className="mfcs" style={{ marginBottom: 8 }}>
        <div className="mfc">
          <div className="mfcn">12</div>
          <div className="mcl">{t('profileClients')}</div>
        </div>
        <div className="mfc">
          <div className="mfcn" style={{ color: '#1a9e5a' }}>87%</div>
          <div className="mcl">{t('profileConsistency')}</div>
        </div>
      </div>
      <div className="mwrk">
        {([t('profileSetting1'), t('profileSetting2'), t('profileSetting3')] as string[]).map((s, i) => (
          <div key={i} className="mday" style={{ padding: '8px 11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mdn">{s}</span>
            <span style={{ color: '#c0c4d8' }}>›</span>
          </div>
        ))}
      </div>
    </div>
  )

  const cssMockSlides: Record<number, React.FC> = { 6: SlideChat, 7: SlideProfil }

  function resetAp() {
    if (apRef.current) clearInterval(apRef.current)
    apRef.current = setInterval(() => setCur((c) => (c + 1) % TOTAL_SLIDES), 4800)
  }

  function gotoSlide(n: number) {
    setCur(n)
    resetAp()
  }

  function prevSlide() { gotoSlide((cur - 1 + TOTAL_SLIDES) % TOTAL_SLIDES) }
  function nextSlide() { gotoSlide((cur + 1) % TOTAL_SLIDES) }

  useEffect(() => {
    resetAp()
    return () => { if (apRef.current) clearInterval(apRef.current) }
  }, [])

  return (
    <div className="showcase">
      <div className="sf">
        <div className="si">
          <div className="sbar">
            <div className="sdots">
              <div className="sdot" style={{ background: '#ff5f56' }} />
              <div className="sdot" style={{ background: '#ffbd2e' }} />
              <div className="sdot" style={{ background: '#27c93f' }} />
            </div>
            <div className="surl">app.unitlift.com</div>
          </div>

          <div className="ss">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => {
              const screenshotSrc = SCREENSHOTS[i]
              const CSSSlide = cssMockSlides[i]
              return (
                <div key={i} className={`slide${i === cur ? ' active' : ''}`}>
                  {screenshotSrc ? (
                    <div style={{ position: 'relative', width: '92%', height: '88%', borderRadius: 8, overflow: 'hidden' }}>
                      <Image
                        src={screenshotSrc}
                        alt={screenshotAlts[i] ?? slides[i] ?? ''}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 800px"
                        style={{ objectFit: 'cover', objectPosition: 'top left' }}
                        priority={i === 0}
                      />
                    </div>
                  ) : CSSSlide ? (
                    <div className="mui">
                      <SidebarNav active={i} items={sidebarItems} activeMap={sidebarActiveMap} />
                      <CSSSlide />
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="sc">
            <div className="stabs">
              {slides.map((label, i) => (
                <button
                  key={i}
                  className={`stab${i === cur ? ' active' : ''}`}
                  onClick={() => gotoSlide(i)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="sarrows">
              <button className="sarr" onClick={prevSlide}>←</button>
              <button className="sarr" onClick={nextSlide}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

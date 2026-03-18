'use client'

import { useTranslations } from 'next-intl'
import { useReveal } from '@/hooks/useReveal'

const featIcons = [
  { bg: 'rgba(34,51,238,.1)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2233ee" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  { bg: 'rgba(26,158,90,.1)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a9e5a" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { bg: 'rgba(224,96,16,.1)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e06010" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
]

export default function MobileApp() {
  const t = useTranslations()
  const feats = t.raw('mobFeats') as Array<{ t: string; d: string }>
  const ref = useReveal<HTMLElement>()

  return (
    <section className="mob-sec" id="funkcije" ref={ref}>
      <div className="con">
        <div className="tc rev">
          <div className="slbl" style={{ color: 'var(--ba)' }}>{t('mobLbl')}</div>
          <h2
            className="stit"
            style={{ color: 'var(--lt)' }}
            dangerouslySetInnerHTML={{ __html: t.raw('mobTit') as string }}
          />
          <p className="ssub" style={{ color: 'var(--ls)' }}>{t('mobSub')}</p>
        </div>

        <div className="mob-grid">
          <div className="mob-phones rev">
            {/* Trainer phone */}
            <div className="mob-phone trainer">
              <div className="mob-status"><span>9:41</span><span>●●● 🔋</span></div>
              <div className="mob-header"><span className="mob-header-title">UnitLift — Trener</span></div>
              <div className="mob-body" style={{ padding: '8px' }}>
                <div className="mob-label">Pregled klijenata</div>
                <div className="mob-card"><div className="mob-card-title">Ana Marković</div><div className="mob-card-sub">Check-in tjedan 12 · Predano ✓</div></div>
                <div className="mob-card"><div className="mob-card-title">Ivan Horvat</div><div className="mob-card-sub" style={{ color: '#1a9e5a' }}>Check-in danas ●</div></div>
                <div className="mob-card"><div className="mob-card-title">Petra Kovač</div><div className="mob-card-sub" style={{ color: '#e06010' }}>Kasni check-in ⚠</div></div>
                <div style={{ marginTop: '8px', padding: '8px', background: '#fff', borderRadius: '7px', border: '1px solid #dde2f5' }}>
                  <div style={{ fontSize: '.58rem', fontWeight: 700, color: '#0a0a20', marginBottom: '4px' }}>Prihod ovaj mj.</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2233ee' }}>1.840€</div>
                  <div style={{ fontSize: '.54rem', color: '#1a9e5a', marginTop: '2px' }}>12/12 klijenata platilo</div>
                </div>
              </div>
              <div className="mob-nav">
                <div className="mob-nav-item active"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Pregled</span></div>
                <div className="mob-nav-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/></svg><span>Check-in</span></div>
                <div className="mob-nav-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span>Financije</span></div>
                <div className="mob-nav-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Chat</span></div>
              </div>
            </div>

            {/* Client phone */}
            <div className="mob-phone client">
              <div className="mob-status"><span>9:41</span><span>●●● 🔋</span></div>
              <div className="mob-header"><span className="mob-header-title">Moji planovi</span></div>
              <div className="mob-body" style={{ padding: '8px' }}>
                <div className="mob-label">Klijentska app</div>
                <div className="mob-card" style={{ marginBottom: '5px' }}><div className="mob-card-title">Plan treninga</div><div className="mob-card-sub">Push/Pull/Legs · Tjedan 3</div></div>
                <div className="mob-card" style={{ marginBottom: '5px' }}><div className="mob-card-title">Plan prehrane</div><div className="mob-card-sub">3200 kcal · Bulk program</div></div>
                <div style={{ marginTop: '6px', padding: '8px', background: '#fff', borderRadius: '7px', border: '1px solid #dde2f5' }}>
                  <div style={{ fontSize: '.58rem', fontWeight: 700, color: '#0a0a20', marginBottom: '6px' }}>Tjedni check-in</div>
                  <div style={{ background: '#2233ee', borderRadius: '6px', padding: '5px 10px', textAlign: 'center', fontSize: '.6rem', fontWeight: 700, color: '#fff' }}>Predaj check-in →</div>
                </div>
              </div>
              <div className="mob-nav mob-nav3">
                <div className="mob-nav-item active"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4v16M18 4v16"/></svg><span>Planovi</span></div>
                <div className="mob-nav-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/></svg><span>Check-in</span></div>
                <div className="mob-nav-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Chat</span></div>
              </div>
            </div>
          </div>

          <div>
            <div className="mob-features">
              {feats.map((feat, i) => (
                <div key={i} className={`mob-feat rev d${i + 1}`}>
                  <div className="mob-feat-ico" style={{ background: featIcons[i].bg }}>
                    {featIcons[i].icon}
                  </div>
                  <div className="mob-feat-txt">
                    <h4>{feat.t}</h4>
                    <p>{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mob-store-row">
              <a href="#" className="mob-store-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2c-1.5 0-4 1.5-6.5 5.5C3 12 3 16 3 18s1 4 3 4c1 0 2-.5 3-1 1 .5 2 1 3 1s2-.5 3-1c1 .5 2 1 3 1 2 0 3-2 3-4s0-6-2.5-10.5C15.5 3.5 13.5 2 12 2z"/><path d="M12 2v8"/></svg>
                <div className="mob-store-txt"><span>Preuzmi na</span><span>App Store</span></div>
              </a>
              <a href="#" className="mob-store-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <div className="mob-store-txt"><span>Preuzmi na</span><span>Google Play</span></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

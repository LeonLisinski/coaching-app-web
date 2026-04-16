'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

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
  const activeMap = [0, 1, 2, 3, -1, 4, 5]

  const SlideDashboard = () => (
    <div className="mcnt">
      <div className="mh">{t('dashGreeting')}</div>
      <div className="msh">{t('dashDate')}</div>
      <div className="mcards">
        <div className="mcard"><div className="mcn">12</div><div className="mcl">{t('dashActiveClients')}</div></div>
        <div className="mcard"><div className="mcn" style={{color:'#1a9e5a'}}>8</div><div className="mcl">{t('dashWeekCheckins')}</div></div>
        <div className="mcard"><div className="mcn" style={{color:'#e06010'}}>2</div><div className="mcl">{t('dashLateCheckins')}</div></div>
        <div className="mcard"><div className="mcn">87%</div><div className="mcl">{t('dashAvgConsistency')}</div></div>
      </div>
      <div className="mchart">
        {[38,55,42,78,52,92,68].map((h, i) => (
          <div key={i} className="mbar" style={{height:`${h}%`}} />
        ))}
      </div>
    </div>
  )

  const SlideKlijenti = () => {
    const clients = [
      { init:'AM', bg:'linear-gradient(135deg,#0066FF,#4488ff)', name:'Ana Marković', sub: t('client1sub'), bdg:'bg2', lbl: t('client1badge') },
      { init:'IH', bg:'linear-gradient(135deg,#1a9e5a,#3dbb78)', name:'Ivan Horvat',  sub: t('client2sub'), bdg:'bb2', lbl: t('client2badge') },
      { init:'PK', bg:'linear-gradient(135deg,#e06010,#f0851a)', name:'Petra Kovač',  sub: t('client3sub'), bdg:'bo2', lbl: t('client3badge') },
      { init:'MN', bg:'linear-gradient(135deg,#8833cc,#aa55ee)', name:'Maja Novak',   sub: t('client4sub'), bdg:'bg2', lbl: t('client4badge') },
    ]
    return (
      <div className="mcnt">
        <div className="mh">{t('clientsTitle')}</div>
        <div className="msh">{t('clientsSub')}</div>
        <div className="mlist">
          {clients.map((c, i) => (
            <div key={i} className="mcli">
              <div className="mav" style={{background:c.bg}}>{c.init}</div>
              <div><div className="mcln">{c.name}</div><div className="mclp">{c.sub}</div></div>
              <span className={`mbdg ${c.bdg}`}>{c.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const SlideTreninzi = () => (
    <div className="mcnt">
      <div className="mh">{t('workoutsTitle')}</div>
      <div className="msh">{t('workoutsSub')}</div>
      <div className="mwrk">
        <div className="mday">
          <div className="mdh"><span className="mdn">{t('workoutMonday')}</span><span className="mbdg bb2">4 {t('workoutExercises')}</span></div>
          <div className="mexs">
            <div className="mex"><span className="mexd" />Bench Press — 4×8 @ 60kg</div>
            <div className="mex"><span className="mexd" />Overhead Press — 3×10 @ 40kg</div>
            <div className="mex"><span className="mexd" />Tricep Dips — 3×12</div>
          </div>
        </div>
        <div className="mday">
          <div className="mdh"><span className="mdn">{t('workoutWednesday')}</span><span className="mbdg bb2">4 {t('workoutExercises')}</span></div>
          <div className="mexs">
            <div className="mex"><span className="mexd" />Deadlift — 3×5 @ 80kg</div>
            <div className="mex"><span className="mexd" />Bent-over Row — 4×8 @ 55kg</div>
          </div>
        </div>
      </div>
    </div>
  )

  const SlidePrehrana = () => (
    <div className="mcnt">
      <div className="mh">{t('nutritionTitle')}</div>
      <div className="msh">{t('nutritionSub')}</div>
      <div className="mmacs">
        <div className="mmac"><div className="mmacv" style={{color:'#0066FF'}}>3200</div><div className="mmacl">{t('calories')}</div></div>
        <div className="mmac"><div className="mmacv" style={{color:'#1a9e5a'}}>200g</div><div className="mmacl">{t('protein')}</div></div>
        <div className="mmac"><div className="mmacv" style={{color:'#e06010'}}>380g</div><div className="mmacl">{t('carbs')}</div></div>
        <div className="mmac"><div className="mmacv" style={{color:'#8833cc'}}>90g</div><div className="mmacl">{t('fat')}</div></div>
      </div>
      <div className="mmrow"><div><div className="mmn">{t('breakfast')}</div><div className="mmc">{t('breakfastMeal')}</div></div><span className="mbdg bb2">720 kcal</span></div>
      <div className="mmrow"><div><div className="mmn">{t('lunch')}</div><div className="mmc">{t('lunchMeal')}</div></div><span className="mbdg bb2">980 kcal</span></div>
      <div className="mmrow"><div><div className="mmn">{t('dinner')}</div><div className="mmc">{t('dinnerMeal')}</div></div><span className="mbdg bb2">850 kcal</span></div>
    </div>
  )

  const SlideFinancije = () => (
    <div className="mcnt">
      <div className="mh">{t('financeTitle')}</div>
      <div className="msh">{t('financeSub')}</div>
      <div className="mfin">
        <div className="mfcs">
          <div className="mfc"><div className="mfcn">1.840€</div><div className="mfcl">{t('financeRevenue')}</div></div>
          <div className="mfc"><div className="mfcn" style={{color:'#1a9e5a'}}>12/12</div><div className="mfcl">{t('financePaid')}</div></div>
        </div>
        <div className="mclf"><div><div className="mfn">Ana Marković</div><div className="mfp">Premium · 150€/mj</div></div><span className="mbdg bg2">{t('paidBadge')}</span></div>
        <div className="mclf"><div><div className="mfn">Ivan Horvat</div><div className="mfp">Standard · 100€/mj</div></div><span className="mbdg bg2">{t('paidBadge')}</span></div>
        <div className="mclf"><div><div className="mfn">Petra Kovač</div><div className="mfp">Basic · 80€/mj</div></div><span className="mbdg bo2">{t('pendingBadge')}</span></div>
      </div>
    </div>
  )

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

  const slideContents = [SlideDashboard, SlideKlijenti, SlideTreninzi, SlidePrehrana, SlideFinancije, SlideChat]

  function resetAp() {
    if (apRef.current) clearInterval(apRef.current)
    apRef.current = setInterval(() => setCur((c) => (c + 1) % 6), 4800)
  }

  function gotoSlide(n: number) {
    setCur(n)
    resetAp()
  }

  function prevSlide() { gotoSlide((cur - 1 + 6) % 6) }
  function nextSlide() { gotoSlide((cur + 1) % 6) }

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
            {slideContents.map((SlideComp, i) => (
              <div key={i} className={`slide${i === cur ? ' active' : ''}`}>
                <div className="mui">
                  <SidebarNav active={i} items={sidebarItems} activeMap={activeMap} />
                  <SlideComp />
                </div>
              </div>
            ))}
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

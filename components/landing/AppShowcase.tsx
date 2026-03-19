'use client'

import { useEffect, useRef, useState } from 'react'

const SLIDES = ['Dashboard', 'Klijenti', 'Treninzi', 'Prehrana', 'Financije', 'Chat']

function SidebarNav({ active }: { active: number }) {
  const items = [
    { label: 'Dashboard', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { label: 'Klijenti', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg> },
    { label: 'Treninzi', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4M8 12h8"/></svg> },
    { label: 'Prehrana', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg> },
    { label: 'Check-ini', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
    { label: 'Financije', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { label: 'Chat', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  ]
  const activeMap = [0, 1, 2, 3, -1, 4, 5]
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

function SlideDashboard() {
  return (
    <div className="mcnt">
      <div className="mh">Dobro jutro, Marko 👋</div>
      <div className="msh">Srijeda, 18. ožujka 2026.</div>
      <div className="mcards">
        <div className="mcard"><div className="mcn">12</div><div className="mcl">Aktivni klijenti</div></div>
        <div className="mcard"><div className="mcn" style={{color:'#1a9e5a'}}>8</div><div className="mcl">Check-in tjedan</div></div>
        <div className="mcard"><div className="mcn" style={{color:'#e06010'}}>2</div><div className="mcl">Kasni check-in</div></div>
        <div className="mcard"><div className="mcn">87%</div><div className="mcl">Prosj. redovitost</div></div>
      </div>
      <div className="mchart">
        {[38,55,42,78,52,92,68].map((h, i) => (
          <div key={i} className="mbar" style={{height:`${h}%`}} />
        ))}
      </div>
    </div>
  )
}

function SlideKlijenti() {
  const clients = [
    { init:'AM', bg:'linear-gradient(135deg,#0066FF,#4488ff)', name:'Ana Marković', sub:'Gubitak težine · 3mj', bdg:'bg2', lbl:'Aktivan' },
    { init:'IH', bg:'linear-gradient(135deg,#1a9e5a,#3dbb78)', name:'Ivan Horvat', sub:'Mišićna masa · 6mj', bdg:'bb2', lbl:'Check-in danas' },
    { init:'PK', bg:'linear-gradient(135deg,#e06010,#f0851a)', name:'Petra Kovač', sub:'Rekomp · 2mj', bdg:'bo2', lbl:'Kasni check-in' },
    { init:'MN', bg:'linear-gradient(135deg,#8833cc,#aa55ee)', name:'Maja Novak', sub:'Snaga · 1mj', bdg:'bg2', lbl:'Aktivan' },
  ]
  return (
    <div className="mcnt">
      <div className="mh">Klijenti</div><div className="msh">12 aktivnih klijenata</div>
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

function SlideTreninzi() {
  return (
    <div className="mcnt">
      <div className="mh">Plan treninga · Ana M.</div><div className="msh">Push/Pull/Legs · Tjedan 3</div>
      <div className="mwrk">
        <div className="mday">
          <div className="mdh"><span className="mdn">Ponedjeljak – Push</span><span className="mbdg bb2">4 vježbe</span></div>
          <div className="mexs">
            <div className="mex"><span className="mexd" />Bench Press — 4×8 @ 60kg</div>
            <div className="mex"><span className="mexd" />Overhead Press — 3×10 @ 40kg</div>
            <div className="mex"><span className="mexd" />Tricep Dips — 3×12</div>
          </div>
        </div>
        <div className="mday">
          <div className="mdh"><span className="mdn">Srijeda – Pull</span><span className="mbdg bb2">4 vježbe</span></div>
          <div className="mexs">
            <div className="mex"><span className="mexd" />Deadlift — 3×5 @ 80kg</div>
            <div className="mex"><span className="mexd" />Bent-over Row — 4×8 @ 55kg</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlidePrehrana() {
  return (
    <div className="mcnt">
      <div className="mh">Plan prehrane · Ivan H.</div><div className="msh">Bulk · 3200 kcal target</div>
      <div className="mmacs">
        <div className="mmac"><div className="mmacv" style={{color:'#0066FF'}}>3200</div><div className="mmacl">Kalorije</div></div>
        <div className="mmac"><div className="mmacv" style={{color:'#1a9e5a'}}>200g</div><div className="mmacl">Proteini</div></div>
        <div className="mmac"><div className="mmacv" style={{color:'#e06010'}}>380g</div><div className="mmacl">Ugljikohidrati</div></div>
        <div className="mmac"><div className="mmacv" style={{color:'#8833cc'}}>90g</div><div className="mmacl">Masti</div></div>
      </div>
      <div className="mmrow"><div><div className="mmn">Doručak</div><div className="mmc">Zobene pahuljice, jaja, banan</div></div><span className="mbdg bb2">720 kcal</span></div>
      <div className="mmrow"><div><div className="mmn">Ručak</div><div className="mmc">Piletina, riža, povrće</div></div><span className="mbdg bb2">980 kcal</span></div>
      <div className="mmrow"><div><div className="mmn">Večera</div><div className="mmc">Losos, krumpir, salata</div></div><span className="mbdg bb2">850 kcal</span></div>
    </div>
  )
}

function SlideFinancije() {
  return (
    <div className="mcnt">
      <div className="mh">Financije</div><div className="msh">Travanj 2026.</div>
      <div className="mfin">
        <div className="mfcs">
          <div className="mfc"><div className="mfcn">1.840€</div><div className="mfcl">Prihod ovaj mj.</div></div>
          <div className="mfc"><div className="mfcn" style={{color:'#1a9e5a'}}>12/12</div><div className="mfcl">Plaćeno klijenata</div></div>
        </div>
        <div className="mclf"><div><div className="mfn">Ana Marković</div><div className="mfp">Premium · 150€/mj</div></div><span className="mbdg bg2">Plaćeno</span></div>
        <div className="mclf"><div><div className="mfn">Ivan Horvat</div><div className="mfp">Standard · 100€/mj</div></div><span className="mbdg bg2">Plaćeno</span></div>
        <div className="mclf"><div><div className="mfn">Petra Kovač</div><div className="mfp">Basic · 80€/mj</div></div><span className="mbdg bo2">Čeka</span></div>
      </div>
    </div>
  )
}

function SlideChat() {
  return (
    <div className="mcnt">
      <div className="mh">Chat · Petra Kovač</div><div className="msh">Posljednja poruka: 2h</div>
      <div className="mchat">
        <div className="mmsgs">
          <div className="mmsg r">Trener, završila sam trening! 4×8 @ 50kg ✅<div className="mmsg-t">10:32</div></div>
          <div className="mmsg s">Odlično Petra! Forma bila dobra?<div className="mmsg-t">10:45</div></div>
          <div className="mmsg r">Posljednje 2 ripe bile teške ali završila! 💪<div className="mmsg-t">10:47</div></div>
          <div className="mmsg s">Savršeno! Povećavamo +2.5kg idući tjedan 🎯<div className="mmsg-t">10:50</div></div>
        </div>
      </div>
    </div>
  )
}

const slideContents = [
  SlideDashboard,
  SlideKlijenti,
  SlideTreninzi,
  SlidePrehrana,
  SlideFinancije,
  SlideChat,
]

export default function AppShowcase() {
  const [cur, setCur] = useState(0)
  const apRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
    <div className="showcase" style={{ marginTop: '52px' }}>
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

          <div className="ss" style={{ minWidth: 560, overflowX: 'auto' }}>
            {slideContents.map((SlideComp, i) => (
              <div key={i} className={`slide${i === cur ? ' active' : ''}`}>
                <div className="mui">
                  <SidebarNav active={i} />
                  <SlideComp />
                </div>
              </div>
            ))}
          </div>

          <div className="sc">
            <div className="stabs">
              {SLIDES.map((label, i) => (
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

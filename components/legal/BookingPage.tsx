'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

// ─── Calendar helpers ────────────────────────────────────────────────────────
function padDate(n: number) { return String(n).padStart(2, '0') }
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${padDate(m + 1)}-${padDate(d)}`
}
function todayInZagreb() {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zagreb' }))
  return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate(), h: d.getHours(), min: d.getMinutes() }
}

export default function BookingPage() {
  const locale     = useLocale()
  const t          = useTranslations()
  const router     = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  // Nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLabels = t.raw('nav') as string[]
  const navLinks = [
    [t('common.navBack'), `/${locale}`],
    [navLabels[0], `/${locale}/kako-radi`],
    [navLabels[1], `/${locale}#funkcije`],
    [navLabels[2], `/${locale}/cijene`],
    [navLabels[3], `/${locale}/treneri`],
    ['FAQ', `/${locale}/faq`],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/prezentacija`)
  }

  // ─── Calendar state ────────────────────────────────────────────────────────
  const tz     = todayInZagreb()
  const [viewYear,  setViewYear]  = useState(tz.y)
  const [viewMonth, setViewMonth] = useState(tz.m)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // ─── Slots state ──────────────────────────────────────────────────────────
  const [slots,        setSlots]       = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // ─── Form state ───────────────────────────────────────────────────────────
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [numClients,  setNumClients]  = useState('')
  const [currentTool, setCurrentTool] = useState('')
  const [message,     setMessage]     = useState('')

  // ─── Submission ───────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  const toolOptions = t.raw('demo.formToolOptions') as string[]

  const isHr = locale !== 'en'
  const DAY_NAMES = isHr
    ? ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
    : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  useEffect(() => {
    if (!selectedDate) return
    setSlots([])
    setSelectedTime(null)
    setLoadingSlots(true)
    fetch(`/api/booking?date=${selectedDate}`)
      .then(r => r.json())
      .then(d => setSlots(d.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate])

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function isPast(y: number, m: number, d: number) {
    if (y > tz.y) return false
    if (y < tz.y) return true
    if (m > tz.m) return false
    if (m < tz.m) return true
    return d < tz.d
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, bookingDate: selectedDate, bookingTime: selectedTime,
          numClients: numClients ? parseInt(numClients) : null,
          currentTool: currentTool || null,
          message: message || null,
          locale,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error === 'double_booking' ? t('demo.errorDouble') : t('demo.errorGeneral'))
        return
      }
      setSuccess(true)
    } catch {
      setError(t('demo.errorGeneral'))
    } finally {
      setSubmitting(false)
    }
  }

  // Calendar computation
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay() // 0=Sun
  const daysInMonth    = new Date(viewYear, viewMonth + 1, 0).getDate()
  const monthLabel     = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    isHr ? 'hr-HR' : 'en-GB', { month: 'long', year: 'numeric' }
  )

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="legal-root">

      {/* ── Navbar ── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={28} />
          <span className="nw">UnitLift</span>
        </Link>
        <ul className="navlinks">
          {navLinks.map(([label, href], i) => (
            <li key={label}><a href={href} className={i === 0 ? 'nav-home-link' : ''}>{label}</a></li>
          ))}
        </ul>
        <div className="navact">
          <button className="langbtn navlang" onClick={switchLang}>{locale.toUpperCase()}</button>
          <a href={`${APP_URL}/login`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('login')}
          </a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('common.tryFree')}
          </a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label={t('common.menuAria')}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <button className="langbtn mobc" onClick={() => { switchLang(); setMenuOpen(false) }}>
          {t('common.langSwitchLabel')} {otherLocale.toUpperCase()}
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          <div className="legal-badge">
            <span className="bdot" />
            {isHr ? 'BESPLATNA PREZENTACIJA' : 'FREE DEMO'}
          </div>
          <h1 className="legal-title">{t('demo.pageTitle')}</h1>
          <p className="legal-date">{t('demo.pageDesc')}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="legal-body" style={{ flex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 80px' }}>

          {success ? (
            /* Success state */
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{
                width: '60px', height: '60px', background: '#22c55e', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', color: '#fff', margin: '0 auto 20px',
              }}>✓</div>
              <h2 style={{ color: '#0a0a20', marginBottom: '10px' }}>{t('demo.successTitle')}</h2>
              <p style={{ color: '#525280', lineHeight: 1.7 }}>{t('demo.successDesc')}</p>
              <a href={`/${locale}`} className="btn btn-p" style={{ marginTop: '28px', display: 'inline-flex' }}>
                {t('common.navBack')}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Note */}
              <p style={{ color: '#525280', fontSize: '.85rem', marginBottom: '32px', textAlign: 'center' }}>
                {t('demo.pageNote')}
              </p>

              {/* 2-column layout → single column on mobile */}
              <div className="bk-grid">

                {/* ── LEFT: Calendar + time slots ── */}
                <div>
                  <p style={{ fontWeight: 700, fontSize: '.82rem', color: '#0a0a20', marginBottom: '10px', letterSpacing: '.03em', textTransform: 'uppercase' }}>
                    {t('demo.formDate')}
                  </p>

                  {/* Calendar */}
                  <div style={{ background: '#f8faff', border: '1px solid #e5e9f8', borderRadius: '12px', padding: '16px', userSelect: 'none' }}>
                    {/* Month nav */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <button type="button" onClick={prevMonth}
                        style={{ background: 'none', border: '1px solid #e5e9f8', borderRadius: '6px', width: '30px', height: '30px', cursor: 'pointer', fontSize: '1rem', color: '#0a0a20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ‹
                      </button>
                      <span style={{ fontWeight: 700, fontSize: '.88rem', color: '#0a0a20', textTransform: 'capitalize' }}>{monthLabel}</span>
                      <button type="button" onClick={nextMonth}
                        style={{ background: 'none', border: '1px solid #e5e9f8', borderRadius: '6px', width: '30px', height: '30px', cursor: 'pointer', fontSize: '1rem', color: '#0a0a20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ›
                      </button>
                    </div>

                    {/* Day headers + day cells — one CSS grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
                      {/* Day name headers */}
                      {DAY_NAMES.map(d => (
                        <div key={d} style={{ textAlign: 'center', fontSize: '.6rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', padding: '4px 0' }}>
                          {d}
                        </div>
                      ))}
                      {/* Blank cells before first day */}
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`b${i}`} />
                      ))}
                      {/* Day cells */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day     = i + 1
                        const dateStr = toDateStr(viewYear, viewMonth, day)
                        const past    = isPast(viewYear, viewMonth, day)
                        const sel     = dateStr === selectedDate
                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={past}
                            onClick={() => setSelectedDate(dateStr)}
                            style={{
                              background: sel ? '#2a8cff' : 'transparent',
                              color: sel ? '#fff' : past ? '#c0c0d0' : '#0a0a20',
                              border: sel ? '1px solid #2a8cff' : '1px solid transparent',
                              borderRadius: '7px',
                              padding: '6px 0',
                              fontSize: '.82rem',
                              fontWeight: sel ? 700 : 400,
                              cursor: past ? 'default' : 'pointer',
                              textAlign: 'center',
                              transition: 'all .12s',
                            }}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <p style={{ color: '#9ca3af', fontSize: '.72rem', marginTop: '10px', textAlign: 'center' }}>
                    {t('demo.timezone')}
                  </p>

                  {/* Time slots */}
                  <div style={{ marginTop: '24px' }}>
                    <p style={{ fontWeight: 700, fontSize: '.82rem', color: '#0a0a20', marginBottom: '10px', letterSpacing: '.03em', textTransform: 'uppercase' }}>
                      {t('demo.formTime')}
                    </p>
                    {!selectedDate ? (
                      <p style={{ color: '#9ca3af', fontSize: '.82rem' }}>{t('demo.selectDate')}</p>
                    ) : loadingSlots ? (
                      <p style={{ color: '#9ca3af', fontSize: '.82rem' }}>...</p>
                    ) : slots.length === 0 ? (
                      <p style={{ color: '#9ca3af', fontSize: '.82rem' }}>{t('demo.noSlotsDate')}</p>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {slots.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedTime(s)}
                            style={{
                              background: selectedTime === s ? '#2a8cff' : '#f8faff',
                              color: selectedTime === s ? '#fff' : '#0a0a20',
                              border: `1px solid ${selectedTime === s ? '#2a8cff' : '#e5e9f8'}`,
                              borderRadius: '7px',
                              padding: '8px 4px',
                              fontSize: '.82rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all .12s',
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── RIGHT: Personal info ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  <div className="cf-field">
                    <label className="cf-label" htmlFor="bk-name">{t('demo.formName')}</label>
                    <input id="bk-name" className="cf-input" type="text" required maxLength={120}
                      value={name} onChange={e => setName(e.target.value)} />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label" htmlFor="bk-email">{t('demo.formEmail')}</label>
                    <input id="bk-email" className="cf-input" type="email" required maxLength={200}
                      value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label" htmlFor="bk-clients">{t('demo.formClients')}</label>
                    <input id="bk-clients" className="cf-input" type="number" min="0" max="9999"
                      value={numClients} onChange={e => setNumClients(e.target.value)} />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label" htmlFor="bk-tool">{t('demo.formTool')}</label>
                    <select id="bk-tool" className="cf-input"
                      value={currentTool} onChange={e => setCurrentTool(e.target.value)}>
                      <option value="">—</option>
                      {toolOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="cf-field">
                    <label className="cf-label" htmlFor="bk-msg">{t('demo.formMessage')}</label>
                    <textarea id="bk-msg" className="cf-input cf-textarea" rows={4} maxLength={1000}
                      value={message} onChange={e => setMessage(e.target.value)} />
                  </div>

                  {error && (
                    <p style={{ color: '#dc2626', fontSize: '.83rem', margin: 0 }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-p btn-fw"
                    disabled={submitting || !selectedDate || !selectedTime || !name || !email}
                    style={{ marginTop: '4px', opacity: (submitting || !selectedDate || !selectedTime || !name || !email) ? 0.6 : 1, width: '100%' }}
                  >
                    {submitting ? t('demo.formSubmitting') : t('demo.formSubmit')}
                  </button>
                </div>

              </div>
            </form>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="legal-footer-bar">
        <div className="con">
          <div className="legal-footer-row">
            <a href={`/${locale}`} className="fl-logo">
              <LogoSvg height={20} />
              <span>UnitLift</span>
            </a>
            <div className="legal-footer-links">
              <Link href={`/${locale}/faq`}>FAQ</Link>
              <Link href={`/${locale}/kontakt`}>{t('common.contact')}</Link>
              <Link href={`/${locale}/uvjeti`}>{t('common.termsShort')}</Link>
              <Link href={`/${locale}/privatnost`}>{t('common.privacy')}</Link>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

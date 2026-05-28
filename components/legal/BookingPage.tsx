'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'

const DAYS = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']
const DAYS_EN = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function getCalendarDays(year: number, month: number) {
  const first   = new Date(year, month, 1).getDay()
  const total   = new Date(year, month + 1, 0).getDate()
  const blanks  = first // 0=Sun; if your locale is Mon-first, adjust
  return { first, total, blanks }
}

function padDate(n: number) { return String(n).padStart(2, '0') }
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${padDate(m + 1)}-${padDate(d)}`
}

export default function BookingPage() {
  const t      = useTranslations('demo')
  const locale = useLocale()

  // Calendar state
  const today     = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zagreb' }))
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Slots state
  const [slots,    setSlots]    = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Form state
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [numClients,  setNumClients]  = useState('')
  const [currentTool, setCurrentTool] = useState('')
  const [message,     setMessage]     = useState('')

  // Submission state
  const [submitting, setSubmitting] = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  const toolOptions = t.raw('formToolOptions') as string[]

  // Load slots whenever selected date changes
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
    const ds = toDateStr(y, m, d)
    const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())
    return ds < todayStr
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
        if (data.error === 'double_booking') setError(t('errorDouble'))
        else setError(t('errorGeneral'))
        return
      }
      setSuccess(true)
    } catch {
      setError(t('errorGeneral'))
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="booking-success">
        <div className="booking-success-icon">✓</div>
        <h2>{t('successTitle')}</h2>
        <p>{t('successDesc')}</p>
      </div>
    )
  }

  const { total, blanks } = getCalendarDays(viewYear, viewMonth)
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    locale === 'en' ? 'en-GB' : 'hr-HR', { month: 'long', year: 'numeric' }
  )
  const dayNames = locale === 'en' ? DAYS_EN : DAYS

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="slbl">{locale === 'en' ? 'FREE DEMO' : 'BESPLATNA PREZENTACIJA'}</div>
        <h1 className="stit" style={{ color: 'var(--lt)', fontSize: '2rem', marginBottom: '12px' }}>
          {t('pageTitle')}
        </h1>
        <p style={{ color: 'var(--ls)', maxWidth: '520px', margin: '0 auto 8px', lineHeight: 1.6 }}>
          {t('pageDesc')}
        </p>
        <p style={{ color: 'var(--ls)', fontSize: '.83rem', marginTop: '6px' }}>
          {t('pageNote')}
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        {/* ─── Left col: calendar ─── */}
        <div className="booking-col booking-col-left">
          <label className="cf-label">{t('formDate')}</label>

          <div className="cal-wrapper">
            <div className="cal-header">
              <button type="button" className="cal-nav" onClick={prevMonth} aria-label="prev">‹</button>
              <span className="cal-month">{monthLabel}</span>
              <button type="button" className="cal-nav" onClick={nextMonth} aria-label="next">›</button>
            </div>
            <div className="cal-grid">
              {dayNames.map(d => (
                <div key={d} className="cal-dayname">{d}</div>
              ))}
              {Array.from({ length: blanks }).map((_, i) => (
                <div key={`b${i}`} />
              ))}
              {Array.from({ length: total }).map((_, i) => {
                const day     = i + 1
                const dateStr = toDateStr(viewYear, viewMonth, day)
                const past    = isPast(viewYear, viewMonth, day)
                const sel     = dateStr === selectedDate
                return (
                  <button
                    key={day} type="button"
                    className={`cal-day${sel ? ' cal-day-sel' : ''}${past ? ' cal-day-past' : ''}`}
                    disabled={past}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          <p className="booking-timezone">{t('timezone')}</p>
        </div>

        {/* ─── Right col: time + personal info ─── */}
        <div className="booking-col booking-col-right">
          {/* Time slots */}
          <label className="cf-label">{t('formTime')}</label>
          {!selectedDate ? (
            <p className="booking-hint">{t('selectDate')}</p>
          ) : loadingSlots ? (
            <p className="booking-hint">...</p>
          ) : slots.length === 0 ? (
            <p className="booking-hint">{t('noSlotsDate')}</p>
          ) : (
            <div className="slot-grid">
              {slots.map(s => (
                <button
                  key={s} type="button"
                  className={`slot-btn${selectedTime === s ? ' slot-btn-sel' : ''}`}
                  onClick={() => setSelectedTime(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="cf-row" style={{ marginTop: '24px' }}>
            <label className="cf-label" htmlFor="bk-name">{t('formName')}</label>
            <input
              id="bk-name" className="cf-input" type="text" required
              value={name} onChange={e => setName(e.target.value)} maxLength={120}
            />
          </div>

          <div className="cf-row">
            <label className="cf-label" htmlFor="bk-email">{t('formEmail')}</label>
            <input
              id="bk-email" className="cf-input" type="email" required
              value={email} onChange={e => setEmail(e.target.value)} maxLength={200}
            />
          </div>

          <div className="cf-row">
            <label className="cf-label" htmlFor="bk-clients">{t('formClients')}</label>
            <input
              id="bk-clients" className="cf-input" type="number" min="0" max="9999"
              value={numClients} onChange={e => setNumClients(e.target.value)}
            />
          </div>

          <div className="cf-row">
            <label className="cf-label" htmlFor="bk-tool">{t('formTool')}</label>
            <select
              id="bk-tool" className="cf-input"
              value={currentTool} onChange={e => setCurrentTool(e.target.value)}
            >
              <option value="">—</option>
              {toolOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="cf-row">
            <label className="cf-label" htmlFor="bk-msg">{t('formMessage')}</label>
            <textarea
              id="bk-msg" className="cf-input" rows={3} maxLength={1000}
              value={message} onChange={e => setMessage(e.target.value)}
            />
          </div>

          {error && <p className="cf-error">{error}</p>}

          <button
            type="submit"
            className="btn btn-p btn-fw"
            disabled={submitting || !selectedDate || !selectedTime || !name || !email}
            style={{ marginTop: '8px' }}
          >
            {submitting ? t('formSubmitting') : t('formSubmit')}
          </button>
        </div>
      </form>
    </div>
  )
}

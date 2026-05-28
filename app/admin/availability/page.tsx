'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const DAY_NAMES = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
type AvailRow = { id?: string; day_of_week: number; start_time: string; end_time: string; slot_duration_min: number; is_active: boolean }

const DEFAULT_ROWS: AvailRow[] = [0,1,2,3,4,5,6].map(d => ({
  day_of_week: d, start_time: '18:00', end_time: '21:00', slot_duration_min: 15, is_active: d >= 1 && d <= 5,
}))

export default function AdminAvailabilityPage() {
  const router = useRouter()
  const [rows,    setRows]    = useState<AvailRow[]>(DEFAULT_ROWS)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)

  useEffect(() => {
    fetch('/api/admin/availability')
      .then(r => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then(d => {
        if (!d) return
        if (d.availability?.length) {
          // Merge fetched rows into 7-day grid
          const merged = DEFAULT_ROWS.map(def => {
            const found = d.availability.find((r: AvailRow) => r.day_of_week === def.day_of_week)
            return found ? { ...found } : def
          })
          setRows(merged)
        }
      })
      .finally(() => setLoading(false))
  }, [router])

  function update(idx: number, field: keyof AvailRow, value: string | number | boolean) {
    setRows(rows => rows.map((r, i) => i === idx ? { ...r, [field]: value } : r))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows: rows.filter(r => r.is_active) }),
    })
    setSaving(false)
    if (res.ok) setSaved(true)
  }

  if (loading) return <p style={{ padding: '32px' }}>Učitavanje...</p>

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>Tjedna dostupnost</h1>
        <button onClick={() => router.push('/admin/bookings')} style={btn('#f5f7ff', '#525280')}>← Zahtjevi</button>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
        {rows.map((r, i) => (
          <div key={r.day_of_week} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: i < 6 ? '1px solid #f0f0f8' : undefined, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '130px', fontWeight: 600, fontSize: '.88rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={r.is_active} onChange={e => update(i, 'is_active', e.target.checked)} />
              {DAY_NAMES[r.day_of_week]}
            </label>
            {r.is_active ? (
              <>
                <input type="time" value={r.start_time} onChange={e => update(i, 'start_time', e.target.value)} style={timeInput} />
                <span style={{ color: '#525280', fontSize: '.85rem' }}>–</span>
                <input type="time" value={r.end_time} onChange={e => update(i, 'end_time', e.target.value)} style={timeInput} />
                <select value={r.slot_duration_min} onChange={e => update(i, 'slot_duration_min', Number(e.target.value))} style={{ ...timeInput, width: '90px' }}>
                  {[15, 20, 30, 45, 60].map(v => <option key={v} value={v}>{v} min</option>)}
                </select>
              </>
            ) : (
              <span style={{ color: '#9ca3af', fontSize: '.83rem' }}>Nedostupno</span>
            )}
          </div>
        ))}
      </div>

      {saved && <p style={{ color: '#22c55e', fontWeight: 600, marginTop: '14px' }}>✓ Promjene spremljene.</p>}

      <button onClick={save} disabled={saving} style={{ ...btn('#2a8cff', '#fff'), marginTop: '18px', padding: '11px 28px', fontSize: '.93rem' }}>
        {saving ? 'Spremanje...' : 'Spremi promjene'}
      </button>
    </div>
  )
}

function btn(bg: string, color: string): React.CSSProperties {
  return { background: bg, color, border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: 600, fontSize: '.83rem', cursor: 'pointer' }
}

const timeInput: React.CSSProperties = {
  padding: '6px 10px', border: '1px solid #dde2f5', borderRadius: '7px', fontSize: '.85rem', width: '100px',
}

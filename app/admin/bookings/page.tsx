'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Booking = {
  id: string
  booking_date: string
  booking_time: string
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled'
  name: string
  email: string
  num_clients: number | null
  current_tool: string | null
  message: string | null
  locale: string
  admin_note: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  pending:   '#f59e0b',
  confirmed: '#22c55e',
  rejected:  '#ef4444',
  cancelled: '#9ca3af',
}
const STATUS_LABELS: Record<string, string> = {
  pending:   'Na čekanju',
  confirmed: 'Potvrđeno',
  rejected:  'Odbijeno',
  cancelled: 'Otkazano',
}

function fmtDT(date: string, time: string) {
  try {
    const t = time.slice(0, 5) // "18:00:00" → "18:00"
    return new Date(`${date}T${t}:00`).toLocaleString('hr-HR', {
      timeZone: 'Europe/Zagreb', day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch { return `${date} ${time}` }
}

export default function AdminBookingsPage() {
  const router  = useRouter()
  const [bookings, setBookings]   = useState<Booking[]>([])
  const [loading,  setLoading]    = useState(true)
  const [filter,   setFilter]     = useState<string>('all')
  const [acting,   setActing]     = useState<string | null>(null)
  const [note,     setNote]       = useState('')
  const [activeNote, setActiveNote] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings-list')
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setBookings(data.bookings ?? [])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { load() }, [load])

  async function act(id: string, action: 'confirm' | 'reject') {
    setActing(id)
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, adminNote: note }),
      })
      if (res.status === 401) { router.push('/admin/login'); return }
      if (res.ok) { setNote(''); setActiveNote(null); load() }
    } finally {
      setActing(null)
    }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>Zahtjevi za prezentacije</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => router.push('/admin/availability')} style={btnStyle('#f5f7ff', '#525280')}>Dostupnost</button>
          <button onClick={logout} style={btnStyle('#fee2e2', '#dc2626')}>Odjava</button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ ...btnStyle(filter === f ? '#2a8cff' : '#fff', filter === f ? '#fff' : '#525280'), border: '1px solid #dde2f5' }}>
            {f === 'all' ? 'Sve' : STATUS_LABELS[f]} {filter === f && `(${filtered.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#525280' }}>Učitavanje...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: '#525280' }}>Nema zahtjeva.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(b => (
            <div key={b.id} style={{ background: '#fff', borderRadius: '12px', padding: '18px 20px', boxShadow: '0 1px 6px rgba(0,0,0,.06)', borderLeft: `4px solid ${STATUS_COLORS[b.status]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{b.name}</span>
                  <span style={{ color: '#525280', fontSize: '.85rem', marginLeft: '10px' }}>{b.email}</span>
                </div>
                <span style={{ background: STATUS_COLORS[b.status] + '22', color: STATUS_COLORS[b.status], fontWeight: 700, fontSize: '.75rem', padding: '3px 10px', borderRadius: '20px' }}>
                  {STATUS_LABELS[b.status]}
                </span>
              </div>
              <p style={{ margin: '0 0 6px', color: '#0a0a20', fontWeight: 600 }}>🗓 {fmtDT(b.booking_date, b.booking_time)}</p>
              {b.num_clients != null && <p style={{ margin: '0 0 4px', color: '#525280', fontSize: '.85rem' }}>Klijenata: {b.num_clients}</p>}
              {b.current_tool  && <p style={{ margin: '0 0 4px', color: '#525280', fontSize: '.85rem' }}>Alat: {b.current_tool}</p>}
              {b.message       && <p style={{ margin: '0 0 4px', color: '#525280', fontSize: '.85rem', fontStyle: 'italic' }}>&quot;{b.message}&quot;</p>}
              {b.admin_note    && <p style={{ margin: '0 0 4px', color: '#7c3aed', fontSize: '.8rem' }}>Napomena: {b.admin_note}</p>}
              <p style={{ margin: '8px 0 0', color: '#9ca3af', fontSize: '.75rem' }}>
                {new Date(b.created_at).toLocaleDateString('hr-HR')} · {b.locale.toUpperCase()} · {b.id.slice(0, 8)}
              </p>
              {b.status === 'pending' && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  {activeNote === b.id && (
                    <input
                      placeholder="Interna napomena (opcionalno)" value={note}
                      onChange={e => setNote(e.target.value)}
                      style={{ flex: 1, minWidth: '180px', padding: '7px 12px', border: '1px solid #dde2f5', borderRadius: '7px', fontSize: '.85rem' }}
                    />
                  )}
                  <button onClick={() => { setActiveNote(b.id === activeNote ? null : b.id); setNote('') }}
                    style={btnStyle('#f5f7ff', '#525280')}>
                    {activeNote === b.id ? 'Odustani' : '+ Napomena'}
                  </button>
                  <button onClick={() => act(b.id, 'confirm')} disabled={!!acting}
                    style={btnStyle('#22c55e', '#fff')}>
                    {acting === b.id ? '...' : '✓ Potvrdi'}
                  </button>
                  <button onClick={() => act(b.id, 'reject')} disabled={!!acting}
                    style={btnStyle('#fecaca', '#dc2626')}>
                    {acting === b.id ? '...' : '✗ Odbij'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function btnStyle(bg: string, color: string): React.CSSProperties {
  return { background: bg, color, border: 'none', borderRadius: '7px', padding: '7px 14px', fontWeight: 600, fontSize: '.83rem', cursor: 'pointer' }
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router   = useRouter()
  const [pw, setPw]     = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (res.ok) {
        router.push('/admin/bookings')
      } else {
        setError('Pogrešna lozinka.')
      }
    } catch {
      setError('Greška. Pokušaj ponovo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ background: '#fff', borderRadius: '14px', padding: '36px', width: '100%', maxWidth: '360px', boxShadow: '0 4px 24px rgba(0,0,0,.1)' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: '1.3rem', fontWeight: 700 }}>UnitLift Admin</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password" placeholder="Lozinka" value={pw} onChange={e => setPw(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #dde2f5', borderRadius: '8px', fontSize: '1rem', marginBottom: '12px', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#e00', fontSize: '.85rem', margin: '0 0 12px' }}>{error}</p>}
          <button
            type="submit" disabled={loading || !pw}
            style={{ width: '100%', padding: '11px', background: '#2a8cff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? '...' : 'Prijava'}
          </button>
        </form>
      </div>
    </div>
  )
}

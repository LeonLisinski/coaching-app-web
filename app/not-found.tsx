import Link from 'next/link'

export default function RootNotFound() {
  return (
    <html lang="hr">
      <body style={{ margin: 0, background: '#0A1024', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: '#0066FF', lineHeight: 1, marginBottom: 16 }}>404</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Stranica nije pronađena</h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 400, lineHeight: 1.6, margin: '0 0 36px' }}>
            Vrati se na početnu stranicu.
          </p>
          <Link href="/hr" style={{
            background: '#0066FF', color: '#fff', fontWeight: 700,
            fontSize: '0.95rem', padding: '13px 28px', borderRadius: 12, textDecoration: 'none',
          }}>
            ← Početna
          </Link>
        </div>
      </body>
    </html>
  )
}

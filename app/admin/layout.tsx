import type { ReactNode } from 'react'

export const metadata = { title: 'Admin — UnitLift' }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr">
      <body style={{ margin: 0, fontFamily: 'system-ui,sans-serif', background: '#f5f7ff', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}

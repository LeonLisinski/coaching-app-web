import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase'

function isAdminAuthed(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const cookie = req.cookies.get('admin_token')?.value
  const header = req.headers.get('x-admin-token')
  return cookie === secret || header === secret
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const db = adminSupabase()
  const { data, error } = await db
    .from('demo_bookings')
    .select('*')
    .order('booking_date', { ascending: false })
    .order('booking_time', { ascending: false })
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ bookings: data })
}

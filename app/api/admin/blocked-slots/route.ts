import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase'

function isAdminAuthed(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const cookie = req.cookies.get('admin_token')?.value
  const header = req.headers.get('x-admin-token')
  return cookie === secret || header === secret
}

// GET?date=YYYY-MM-DD — list blocked slots for a date (or all if no date)
export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const date = req.nextUrl.searchParams.get('date')
  const db = adminSupabase()
  let query = db.from('demo_blocked_slots').select('*').order('blocked_date').order('blocked_time')
  if (date) query = query.eq('blocked_date', date)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ blockedSlots: data })
}

// POST — block a slot  body: { blocked_date, blocked_time, reason? }
export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { blocked_date, blocked_time, reason } = await req.json()
  if (!blocked_date || !blocked_time) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const db = adminSupabase()
  const { error } = await db.from('demo_blocked_slots').insert({ blocked_date, blocked_time, reason: reason ?? null })
  if (error) {
    if (error.code === '23505') return NextResponse.json({ error: 'Already blocked' }, { status: 409 })
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

// DELETE?id=uuid — unblock a slot
export async function DELETE(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const db = adminSupabase()
  const { error } = await db.from('demo_blocked_slots').delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ success: true })
}

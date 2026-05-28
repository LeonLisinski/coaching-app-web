import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase'

function isAdminAuthed(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const cookie = req.cookies.get('admin_token')?.value
  const header = req.headers.get('x-admin-token')
  return cookie === secret || header === secret
}

// GET — fetch all weekly availability rows
export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const db = adminSupabase()
  const { data, error } = await db
    .from('demo_availability')
    .select('*')
    .order('day_of_week')
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ availability: data })
}

// POST — upsert availability rows
// body: { rows: Array<{ day_of_week, start_time, end_time, slot_duration_min, is_active }> }
export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { rows } = await req.json()
  if (!Array.isArray(rows)) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const db = adminSupabase()

  // Delete all and re-insert for simplicity
  await db.from('demo_availability').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error } = await db.from('demo_availability').insert(
    rows.map((r: { day_of_week: number; start_time: string; end_time: string; slot_duration_min: number; is_active: boolean }) => ({
      day_of_week:      r.day_of_week,
      start_time:       r.start_time,
      end_time:         r.end_time,
      slot_duration_min: r.slot_duration_min,
      is_active:        r.is_active,
    }))
  )
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ success: true })
}

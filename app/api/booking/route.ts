import { NextRequest, NextResponse } from 'next/server'
import { supabase, adminSupabase } from '@/lib/supabase'
import {
  sendBookingReceivedEmail,
  sendAdminNewBookingEmail,
} from '@/lib/demo-emails'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL.replace('app.', 'www.')
  : 'https://www.unitlift.com'

// Simple in-memory rate limit: max 5 booking attempts per IP per minute
const rateLimit = new Map<string, { count: number; resetAt: number }>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  entry.count++
  return entry.count <= 5
}

// ─── GET /api/booking?date=YYYY-MM-DD ────────────────────────────────────────
// Returns available time slots for a given date.
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }

  const dayOfWeek = new Date(date + 'T12:00:00').getDay() // 0=Sun

  // 1. Fetch weekly availability for this day
  const { data: avail, error: availErr } = await supabase
    .from('demo_availability')
    .select('start_time, end_time, slot_duration_min')
    .eq('day_of_week', dayOfWeek)
    .eq('is_active', true)
    .single()

  if (availErr || !avail) {
    return NextResponse.json({ slots: [] })
  }

  // 2. Generate all slots
  const allSlots = generateSlots(avail.start_time, avail.end_time, avail.slot_duration_min)

  // 3. Fetch booked/blocked slots for this date
  const [bookedRes, blockedRes] = await Promise.all([
    supabase
      .from('demo_bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed']),
    supabase
      .from('demo_blocked_slots')
      .select('blocked_time')
      .eq('blocked_date', date),
  ])

  const unavailable = new Set([
    ...(bookedRes.data ?? []).map((r) => r.booking_time.slice(0, 5)),
    ...(blockedRes.data ?? []).map((r) => r.blocked_time.slice(0, 5)),
  ])

  // 4. Filter out past slots (compare in Europe/Zagreb)
  const nowInZagreb = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/Zagreb' })
  )
  const todayStr = [
    nowInZagreb.getFullYear(),
    String(nowInZagreb.getMonth() + 1).padStart(2, '0'),
    String(nowInZagreb.getDate()).padStart(2, '0'),
  ].join('-')

  const slots = allSlots
    .filter((t) => !unavailable.has(t))
    .filter((t) => {
      if (date > todayStr) return true
      if (date < todayStr) return false
      // Same day — compare time
      const [h, m] = t.split(':').map(Number)
      const slotMinutes = h * 60 + m
      const nowMinutes  = nowInZagreb.getHours() * 60 + nowInZagreb.getMinutes()
      return slotMinutes > nowMinutes + 30 // 30 min buffer
    })

  return NextResponse.json({ slots })
}

// ─── POST /api/booking ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { name, email, bookingDate, bookingTime, numClients, currentTool, message, locale } = body

    if (!name || !email || !bookingDate || !bookingTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof name !== 'string' || name.length > 120) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (typeof email !== 'string' || email.length > 200 || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate) || !/^\d{2}:\d{2}$/.test(bookingTime)) {
      return NextResponse.json({ error: 'Invalid date/time' }, { status: 400 })
    }

    const db = adminSupabase()

    const { data, error } = await db
      .from('demo_bookings')
      .insert({
        booking_date: bookingDate,
        booking_time: bookingTime,
        name:         name.trim(),
        email:        email.trim().toLowerCase(),
        num_clients:  typeof numClients === 'number' ? numClients : null,
        current_tool: typeof currentTool === 'string' && currentTool ? currentTool : null,
        message:      typeof message === 'string' && message ? message.slice(0, 1000) : null,
        locale:       locale === 'en' ? 'en' : 'hr',
        status:       'pending',
      })
      .select('id')
      .single()

    if (error) {
      // Unique constraint = double booking
      if (error.code === '23505') {
        return NextResponse.json({ error: 'double_booking' }, { status: 409 })
      }
      console.error('Booking insert error:', error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    const bookingId = data.id
    const adminUrl  = 'https://admin.unitlift.com/prezentacije'

    // Send emails (non-fatal)
    await Promise.allSettled([
      sendBookingReceivedEmail({ name, email, bookingDate, bookingTime, locale: locale ?? 'hr', bookingId }),
      sendAdminNewBookingEmail({ name, email, bookingDate, bookingTime, numClients, currentTool, message, bookingId, locale: locale ?? 'hr', adminUrl }),
    ])

    return NextResponse.json({ success: true, bookingId })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─── Helper: generate time slots ─────────────────────────────────────────────
function generateSlots(start: string, end: string, durationMin: number): string[] {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const startMin = sh * 60 + sm
  const endMin   = eh * 60 + em
  const slots: string[] = []
  for (let t = startMin; t + durationMin <= endMin; t += durationMin) {
    slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`)
  }
  return slots
}

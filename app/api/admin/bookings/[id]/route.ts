import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase'
import { sendBookingConfirmedEmail, sendBookingRejectedEmail } from '@/lib/demo-emails'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL.replace('app.', 'www.')
  : 'https://www.unitlift.com'

function isAdminAuthed(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const cookie = req.cookies.get('admin_token')?.value
  const header = req.headers.get('x-admin-token')
  return cookie === secret || header === secret
}

// PATCH /api/admin/bookings/[id]  body: { action: 'confirm' | 'reject', adminNote?: string }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { action, adminNote } = await req.json()

  if (!['confirm', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const db = adminSupabase()
  const newStatus = action === 'confirm' ? 'confirmed' : 'rejected'

  const { data: booking, error: fetchErr } = await db
    .from('demo_bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !booking) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { error: updateErr } = await db
    .from('demo_bookings')
    .update({ status: newStatus, admin_note: adminNote ?? null })
    .eq('id', id)

  if (updateErr) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  // Send email notification to user
  const bookingUrl = booking.locale === 'en'
    ? `${SITE_URL}/en/prezentacija`
    : `${SITE_URL}/prezentacija`

  if (action === 'confirm') {
    await sendBookingConfirmedEmail({
      name: booking.name,
      email: booking.email,
      bookingDate: booking.booking_date,
      bookingTime: booking.booking_time,
      locale: booking.locale,
    }).catch(console.error)
  } else {
    await sendBookingRejectedEmail({
      name: booking.name,
      email: booking.email,
      bookingDate: booking.booking_date,
      bookingTime: booking.booking_time,
      locale: booking.locale,
      bookingUrl,
    }).catch(console.error)
  }

  return NextResponse.json({ success: true, status: newStatus })
}

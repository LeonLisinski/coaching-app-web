import { Resend } from 'resend'

const resend   = new Resend(process.env.RESEND_API_KEY)
const FROM     = 'UnitLift <onboarding@resend.dev>'
const ADMIN_TO = process.env.ADMIN_EMAIL ?? 'leon@unitlift.com'

function esc(s: string | null | undefined): string {
  if (!s) return ''
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatDateTime(date: string, time: string, locale: string): string {
  try {
    const d = new Date(`${date}T${time}:00`)
    return d.toLocaleString(locale === 'en' ? 'en-GB' : 'hr-HR', {
      timeZone: 'Europe/Zagreb',
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return `${date} ${time}`
  }
}

const header = `
  <div style="background:#080818;padding:18px 24px;border-radius:12px;margin-bottom:24px;display:flex;align-items:center">
    <span style="font-family:system-ui,sans-serif;font-size:1.15rem;font-weight:800;color:#fff;letter-spacing:-.5px">Unit<span style="color:#2a8cff">Lift</span></span>
  </div>`

// ─── 1. User: request received ───────────────────────────────────────────────
export async function sendBookingReceivedEmail(params: {
  name: string; email: string; bookingDate: string; bookingTime: string
  locale: string; bookingId: string
}) {
  const { name, email, bookingDate, bookingTime, locale, bookingId } = params
  const dt   = formatDateTime(bookingDate, bookingTime, locale)
  const isHr = locale !== 'en'

  const subject = isHr
    ? 'Zahtjev za prezentaciju UnitLifta je zaprimljen'
    : 'Your UnitLift demo request has been received'

  const html = isHr ? `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">Pozdrav, ${esc(name)}!</h2>
      <p style="color:#525280;margin:0 0 20px;font-size:15px;line-height:1.7">
        Tvoj zahtjev za besplatnu prezentaciju UnitLifta je zaprimljen. Termin koji si odabrao/la:
      </p>
      <div style="background:#f5f7ff;border-radius:10px;padding:18px;margin-bottom:20px;border-left:4px solid #2a8cff">
        <p style="font-size:16px;font-weight:700;color:#0a0a20;margin:0">🗓 ${esc(dt)}</p>
        <p style="font-size:13px;color:#525280;margin:6px 0 0">Vremenska zona: Europe/Zagreb (CET/CEST)</p>
      </div>
      <p style="color:#525280;font-size:14px;line-height:1.7;margin:0 0 20px">
        Termin još nije konačno potvrđen. Javit ćemo ti se e-poštom s potvrdom čim pregledamo dostupnost.
      </p>
      <p style="color:#888;font-size:12px">Referentni broj zahtjeva: ${bookingId}</p>
    </div>` : `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">Hi ${esc(name)}!</h2>
      <p style="color:#525280;margin:0 0 20px;font-size:15px;line-height:1.7">
        Your request for a free UnitLift demo has been received. Your selected time slot:
      </p>
      <div style="background:#f5f7ff;border-radius:10px;padding:18px;margin-bottom:20px;border-left:4px solid #2a8cff">
        <p style="font-size:16px;font-weight:700;color:#0a0a20;margin:0">🗓 ${esc(dt)}</p>
        <p style="font-size:13px;color:#525280;margin:6px 0 0">Timezone: Europe/Zagreb (CET/CEST)</p>
      </div>
      <p style="color:#525280;font-size:14px;line-height:1.7;margin:0 0 20px">
        Your appointment is not yet confirmed. We will follow up by email with a confirmation once we review availability.
      </p>
      <p style="color:#888;font-size:12px">Reference: ${bookingId}</p>
    </div>`

  return resend.emails.send({ from: FROM, to: email, subject, html })
}

// ─── 2. Admin: new booking notification ──────────────────────────────────────
export async function sendAdminNewBookingEmail(params: {
  name: string; email: string; bookingDate: string; bookingTime: string
  numClients?: number | null; currentTool?: string | null; message?: string | null
  bookingId: string; locale: string; adminUrl: string
}) {
  const { name, email, bookingDate, bookingTime, numClients, currentTool, message, bookingId, adminUrl } = params
  const dt = formatDateTime(bookingDate, bookingTime, 'hr')

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">📅 Novi zahtjev za prezentaciju</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        ${row('Ime', esc(name))}
        ${row('Email', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
        ${row('Termin', esc(dt))}
        ${numClients != null ? row('Br. klijenata', String(numClients)) : ''}
        ${currentTool ? row('Trenutni alat', esc(currentTool)) : ''}
      </table>
      ${message ? `<div style="background:#f5f7ff;border-radius:10px;padding:16px;margin-bottom:20px">
        <p style="color:#525280;font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:.06em;font-weight:700">Napomena</p>
        <p style="color:#0a0a20;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap">${esc(message)}</p>
      </div>` : ''}
      <div style="display:flex;gap:12px;margin-top:20px">
        <a href="${adminUrl}/confirm/${bookingId}" style="background:#2a8cff;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">✓ Potvrdi termin</a>
        <a href="${adminUrl}/reject/${bookingId}" style="background:#f5f7ff;color:#444;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #dde2f5">✗ Odbij zahtjev</a>
      </div>
      <p style="color:#888;font-size:12px;margin-top:20px">ID: ${bookingId}</p>
    </div>`

  return resend.emails.send({
    from: FROM, to: ADMIN_TO, subject: `[UnitLift Demo] ${esc(name)} — ${esc(dt)}`, html,
  })
}

// ─── 3. User: booking confirmed ───────────────────────────────────────────────
export async function sendBookingConfirmedEmail(params: {
  name: string; email: string; bookingDate: string; bookingTime: string; locale: string
}) {
  const { name, email, bookingDate, bookingTime, locale } = params
  const dt   = formatDateTime(bookingDate, bookingTime, locale)
  const isHr = locale !== 'en'

  const subject = isHr ? 'Termin je potvrđen — UnitLift prezentacija' : 'Your UnitLift demo is confirmed'

  const html = isHr ? `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">Termin je potvrđen! 🎉</h2>
      <p style="color:#525280;margin:0 0 16px;font-size:15px">Pozdrav ${esc(name)},</p>
      <p style="color:#525280;margin:0 0 20px;font-size:15px;line-height:1.7">
        Tvoja besplatna prezentacija UnitLifta je potvrđena:
      </p>
      <div style="background:#f0f9f0;border-radius:10px;padding:18px;margin-bottom:20px;border-left:4px solid #22c55e">
        <p style="font-size:16px;font-weight:700;color:#0a0a20;margin:0">🗓 ${esc(dt)}</p>
        <p style="font-size:13px;color:#525280;margin:6px 0 0">Vremenska zona: Europe/Zagreb (CET/CEST)</p>
      </div>
      <p style="color:#525280;font-size:14px;line-height:1.7">
        Kontaktirat ćemo te nekoliko minuta prije prezentacije s linkom ili uputama za spajanje.
      </p>
    </div>` : `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">Your demo is confirmed! 🎉</h2>
      <p style="color:#525280;margin:0 0 16px;font-size:15px">Hi ${esc(name)},</p>
      <p style="color:#525280;margin:0 0 20px;font-size:15px;line-height:1.7">
        Your free UnitLift demo is confirmed:
      </p>
      <div style="background:#f0f9f0;border-radius:10px;padding:18px;margin-bottom:20px;border-left:4px solid #22c55e">
        <p style="font-size:16px;font-weight:700;color:#0a0a20;margin:0">🗓 ${esc(dt)}</p>
        <p style="font-size:13px;color:#525280;margin:6px 0 0">Timezone: Europe/Zagreb (CET/CEST)</p>
      </div>
      <p style="color:#525280;font-size:14px;line-height:1.7">
        We will reach out a few minutes before the demo with a link or connection details.
      </p>
    </div>`

  return resend.emails.send({ from: FROM, to: email, subject, html })
}

// ─── 4. User: booking rejected ────────────────────────────────────────────────
export async function sendBookingRejectedEmail(params: {
  name: string; email: string; bookingDate: string; bookingTime: string
  locale: string; bookingUrl: string
}) {
  const { name, email, bookingDate, bookingTime, locale, bookingUrl } = params
  const dt   = formatDateTime(bookingDate, bookingTime, locale)
  const isHr = locale !== 'en'

  const subject = isHr
    ? 'Odabrani termin nije dostupan — rezerviraj novi'
    : 'Selected slot unavailable — please choose another time'

  const html = isHr ? `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">Termin nije dostupan</h2>
      <p style="color:#525280;margin:0 0 16px;font-size:15px">Pozdrav ${esc(name)},</p>
      <p style="color:#525280;margin:0 0 20px;font-size:15px;line-height:1.7">
        Nažalost, odabrani termin (${esc(dt)}) nije dostupan. Ispričavamo se zbog neugodnosti.
      </p>
      <a href="${bookingUrl}" style="display:inline-block;background:#2a8cff;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
        Odaberi drugi termin
      </a>
    </div>` : `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      ${header}
      <h2 style="color:#0a0a20;margin:0 0 8px">Slot unavailable</h2>
      <p style="color:#525280;margin:0 0 16px;font-size:15px">Hi ${esc(name)},</p>
      <p style="color:#525280;margin:0 0 20px;font-size:15px;line-height:1.7">
        Unfortunately, the selected slot (${esc(dt)}) is no longer available. We apologise for the inconvenience.
      </p>
      <a href="${bookingUrl}" style="display:inline-block;background:#2a8cff;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
        Choose another time
      </a>
    </div>`

  return resend.emails.send({ from: FROM, to: email, subject, html })
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#525280;font-size:14px;width:140px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#0a0a20;font-size:14px;font-weight:600">${value}</td>
  </tr>`
}

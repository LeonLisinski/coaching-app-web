import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, topic, message } = await req.json()

    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (
      typeof name !== 'string' || name.length > 100 ||
      typeof email !== 'string' || email.length > 200 ||
      typeof topic !== 'string' || topic.length > 200 ||
      typeof message !== 'string' || message.length > 2000
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const safeName    = escapeHtml(name)
    const safeEmail   = escapeHtml(email)
    const safeTopic   = escapeHtml(topic)
    const safeMessage = escapeHtml(message)
    const rawEmail    = email.trim() // use raw email for headers, not HTML-escaped

    const { error } = await resend.emails.send({
      from: 'UnitLift Kontakt <onboarding@resend.dev>',
      to: 'leon@unitlift.com',
      replyTo: rawEmail,
      subject: `[${safeTopic}] Poruka od ${safeName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <div style="background:#080818;padding:20px 24px;border-radius:12px;margin-bottom:24px">
            <img src="https://unitlift.com/logo.png" alt="UnitLift" height="28" style="height:28px" />
          </div>
          <h2 style="color:#0a0a20;margin:0 0 8px">Nova poruka s kontakt forme</h2>
          <p style="color:#525280;margin:0 0 24px;font-size:14px">Primljeno putem unitlift.com/kontakt</p>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#525280;font-size:14px;width:120px">Ime</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#0a0a20;font-size:14px;font-weight:600">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#525280;font-size:14px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;font-size:14px"><a href="mailto:${safeEmail}" style="color:#2233ee">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#525280;font-size:14px">Tema</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#0a0a20;font-size:14px">${safeTopic}</td>
            </tr>
          </table>

          <div style="background:#f5f7ff;border-radius:10px;padding:18px;margin:20px 0">
            <p style="color:#525280;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:.06em;font-weight:700">Poruka</p>
            <p style="color:#0a0a20;font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap">${safeMessage}</p>
          </div>

          <p style="color:#525280;font-size:12px;margin:24px 0 0">
            Za odgovor, reply direktno na ovaj email — Reply-To je postavljen na ${rawEmail}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

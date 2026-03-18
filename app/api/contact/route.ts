import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, topic, message } = await req.json()

    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'UnitLift Kontakt <onboarding@resend.dev>',
      to: 'leon@unitlift.com',
      replyTo: email,
      subject: `[${topic}] Poruka od ${name}`,
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
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#0a0a20;font-size:14px;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#525280;font-size:14px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;font-size:14px"><a href="mailto:${email}" style="color:#2233ee">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#525280;font-size:14px">Tema</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde2f5;color:#0a0a20;font-size:14px">${topic}</td>
            </tr>
          </table>

          <div style="background:#f5f7ff;border-radius:10px;padding:18px;margin:20px 0">
            <p style="color:#525280;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:.06em;font-weight:700">Poruka</p>
            <p style="color:#0a0a20;font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
          </div>

          <p style="color:#525280;font-size:12px;margin:24px 0 0">
            Za odgovor, reply direktno na ovaj email — Reply-To je postavljen na ${email}
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

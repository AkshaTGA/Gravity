import { NextResponse } from "next/server"
import { getSubscribers } from "@/lib/subscribers"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const { event } = await request.json().catch(() => ({ event: null }))
  if (!event || !event.title || !event.date) {
    return NextResponse.json({ ok: false, error: "Missing event payload" }, { status: 400 })
  }

  const emails = await getSubscribers()
  if (!emails.length) {
    return NextResponse.json({ ok: false, error: "No subscribers" }, { status: 400 })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.FROM_EMAIL || user

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      { ok: false, error: "SMTP configuration missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL" },
      { status: 500 },
    )
  }

  // Gmail requirements:
  // - If using port 465 -> secure true (implicit TLS)
  // - If using port 587 -> secure false + STARTTLS upgrade
  // - Password MUST be a 16‑char Gmail App Password (NOT the normal account password)
  const secure = port === 465 || process.env.SMTP_SECURE === "true"
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Helpful diagnostics while debugging failed auth / TLS
    logger: true,
    debug: true,
    requireTLS: !secure, // force STARTTLS on 587
    authMethod: "LOGIN",
  })

  const subject = `New Event: ${event.title}`
  const dateStr = new Date(event.date).toLocaleDateString()
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">${event.title}</h2>
      <p style="margin:0 0 8px;color:#555">Date: ${dateStr}</p>
      ${event.wing ? `<p style=\"margin:0 0 8px;color:#555\">Wing: ${event.wing}</p>` : ""}
      <p style="white-space:pre-line">${(event.description || "").toString()}</p>
      <p style="margin-top:16px;color:#666">— Gravity</p>
    </div>
  `

  try {
    // Verify connection & credentials first to catch auth errors distinctly
    await transporter.verify()
  } catch (err: any) {
    console.error("SMTP verify failed", err)
    return NextResponse.json(
      {
        ok: false,
        error:
          (err?.message || "SMTP verify failed") +
          " | Ensure Gmail App Password (16 chars) and 2FA enabled.",
      },
      { status: 500 },
    )
  }

  try {
    // Use BCC to avoid exposing subscriber addresses; 'to' is just the sender label
    await transporter.sendMail({ from, to: from, bcc: emails, subject, html })
    return NextResponse.json({ ok: true, sent: emails.length })
  } catch (err: any) {
    console.error("Email send failed", err)
    return NextResponse.json(
      {
        ok: false,
        error:
          (err?.message || "Failed to send") +
          " | If 535 error persists regenerate App Password.",
        code: err?.code,
      },
      { status: 500 },
    )
  }
}

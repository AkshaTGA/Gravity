import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const { name, email, message } = await request.json().catch(() => ({ name: "", email: "", message: "" }))

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing name, email or message" }, { status: 400 })
  }

  const host = process.env.CONTACT_SMTP_HOST || process.env.SMTP_HOST || "smtp.gmail.com"
  const port = Number(process.env.CONTACT_SMTP_PORT || process.env.SMTP_PORT || 587)
  const user = process.env.CONTACT_SMTP_USER || process.env.SMTP_USER
  const pass = process.env.CONTACT_SMTP_PASS || process.env.SMTP_PASS
  const to = process.env.CONTACT_TO || "raghavvohra375@gmail.com"
  const from = process.env.CONTACT_FROM || `Gravity Contact <${user}>`
  const secure = (process.env.CONTACT_SMTP_SECURE || process.env.SMTP_SECURE) === "true" || port === 465

  if (!user || !pass) {
    return NextResponse.json({ ok: false, error: "SMTP user/pass not configured" }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    logger: true,
    debug: true,
    requireTLS: !secure,
    authMethod: "LOGIN",
  })

  try {
    await transporter.verify()
  } catch (err: any) {
    console.error("Contact SMTP verify failed", err)
    return NextResponse.json({ ok: false, error: err?.message || "SMTP verify failed" }, { status: 500 })
  }

  const subject = `New Contact Form Submission from ${name}`
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">Contact Form</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-line">${escapeHtml(message)}</div>
      <p style="margin-top:16px;color:#666">— Gravity Website</p>
    </div>
  `

  try {
    const info = await transporter.sendMail({ from, to, subject, html, replyTo: email })
    console.log("Contact email accepted by SMTP:", { messageId: info.messageId, response: info.response })
    return NextResponse.json({ ok: true, id: info.messageId })
  } catch (err: any) {
    console.error("Contact email send failed", err)
    return NextResponse.json({ ok: false, error: err?.message || "Failed to send" }, { status: 500 })
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

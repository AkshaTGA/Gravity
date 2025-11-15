import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "FROM_EMAIL",
    "CONTACT_SMTP_HOST",
    "CONTACT_SMTP_PORT",
    "CONTACT_SMTP_USER",
    "CONTACT_SMTP_PASS",
    "CONTACT_TO",
  ]
  const missing = required.filter((k) => !process.env[k])
  return NextResponse.json({ ok: true, env: { missing, count: required.length } })
}

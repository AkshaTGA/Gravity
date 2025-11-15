import { NextResponse } from "next/server"
import { getSubscribers, saveSubscribers } from "@/lib/subscribers"

export const runtime = "nodejs"

export async function GET() {
  const list = await getSubscribers()
  return NextResponse.json({ emails: list })
}

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: "" }))
  const isValid = typeof email === "string" && /^(?:[a-zA-Z0-9_.'+\-]+)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(email)
  if (!isValid) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
  }
  const list = await getSubscribers()
  if (!list.includes(email)) {
    list.push(email)
    await saveSubscribers(list)
  }
  return NextResponse.json({ ok: true })
}

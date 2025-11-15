import { promises as fs } from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "subscribers.json")

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_KV_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_KV_REST_TOKEN
const KV_NAMESPACE = process.env.KV_NAMESPACE || "gravity"
const KV_KEY = `${KV_NAMESPACE}:subscribers`

async function kvFetch<T>(method: "GET" | "SET", value?: any): Promise<T> {
  if (!KV_URL || !KV_TOKEN) throw new Error("KV not configured")
  if (method === "GET") {
    const res = await fetch(`${KV_URL}/get/${encodeURIComponent(KV_KEY)}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`KV GET failed: ${res.status}`)
    const data = (await res.json()) as { result: string | null }
    return (data.result ? JSON.parse(data.result) : []) as T
  } else {
    const payload = typeof value === "string" ? value : JSON.stringify(value)
    const res = await fetch(`${KV_URL}/set/${encodeURIComponent(KV_KEY)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ value: payload }),
    })
    if (!res.ok) throw new Error(`KV SET failed: ${res.status}`)
    return (true as unknown) as T
  }
}

export async function getSubscribers(): Promise<string[]> {
  if (KV_URL && KV_TOKEN) {
    try {
      return await kvFetch<string[]>("GET")
    } catch (e) {
      console.error("KV getSubscribers failed, falling back to file", e)
    }
  }
  try {
    const raw = await fs.readFile(filePath, "utf8")
    return JSON.parse(raw)
  } catch (e: any) {
    if (e.code === "ENOENT") return []
    throw e
  }
}

export async function saveSubscribers(list: string[]) {
  if (KV_URL && KV_TOKEN) {
    try {
      await kvFetch("SET", list)
      return
    } catch (e) {
      console.error("KV saveSubscribers failed, writing file as fallback", e)
    }
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf8")
}

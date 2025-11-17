export type BlogStatus = "pending" | "approved" | "rejected"

export interface BlogSubmission {
  id: string
  name: string
  rollNumber: string
  mediumUrl: string
  status: BlogStatus
  createdAt: number
}

const STORAGE_KEY = "gravity.blogs"

function safeParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback
  try { return JSON.parse(json) as T } catch { return fallback }
}

function readAll(): BlogSubmission[] {
  if (typeof window === "undefined") return []
  return safeParse<BlogSubmission[]>(localStorage.getItem(STORAGE_KEY), [])
}

function writeAll(items: BlogSubmission[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function submitBlog(input: { name: string; rollNumber: string; mediumUrl: string }): BlogSubmission {
  const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const item: BlogSubmission = {
    id,
    name: input.name.trim(),
    rollNumber: input.rollNumber.trim(),
    mediumUrl: input.mediumUrl.trim(),
    status: "pending",
    createdAt: Date.now(),
  }
  const all = readAll()
  all.unshift(item)
  writeAll(all)
  return item
}

export function getPendingBlogs(): BlogSubmission[] {
  return readAll().filter(b => b.status === "pending").sort((a,b)=> b.createdAt - a.createdAt)
}

export function getApprovedBlogs(): BlogSubmission[] {
  return readAll().filter(b => b.status === "approved").sort((a,b)=> b.createdAt - a.createdAt)
}

export function approveBlog(id: string) {
  const all = readAll()
  const idx = all.findIndex(b => b.id === id)
  if (idx >= 0) {
    all[idx] = { ...all[idx], status: "approved" }
    writeAll(all)
  }
}

export function rejectBlog(id: string) {
  const all = readAll()
  const idx = all.findIndex(b => b.id === id)
  if (idx >= 0) {
    all[idx] = { ...all[idx], status: "rejected" }
    writeAll(all)
  }
}

export function removeBlog(id: string) {
  const all = readAll()
  const filtered = all.filter(b => b.id !== id)
  writeAll(filtered)
}

"use client"

import { useEffect, useState } from "react"
import type { Member } from "@/lib/types"

// Use relative path and let Next.js rewrites proxy to backend

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    let cancelled = false

    const loadMembers = async () => {
      try {
        const res = await fetch(`/api/public/members`, {
          // Public view does not send auth; backend can expose a non-auth route if needed
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) return
        const data = (await res.json()) as any[]
        const normalized: Member[] = data.map((m) => ({
          id: m.id || m._id || String(m.id ?? m._id ?? ""),
          name: m.name,
          role: m.role,
          wing: m.wing,
          bio: m.bio ?? "",
          image: m.image,
          isOverallCoordinator: m.isOverallCoordinator ?? false,
          socials: m.socials ?? {},
          createdAt: typeof m.createdAt === "string" ? Date.parse(m.createdAt) : m.createdAt ?? undefined,
        }))
        if (!cancelled) setMembers(normalized)
      } catch (e) {
        console.error("Failed to load members", e)
      }
    }

    void loadMembers()

    return () => {
      cancelled = true
    }
  }, [])

  return members
}

"use client"

import { useEffect, useState } from "react"
import type { Event } from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    let cancelled = false

    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/public/events`, {
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) return
        const data = (await res.json()) as any[]
        const normalized: Event[] = data.map((e) => ({
          id: e.id || e._id || String(e.id ?? e._id ?? ""),
          title: e.title,
          date: e.date,
          description: e.description,
          wing: e.wing,
          image: e.image,
          createdAt: typeof e.createdAt === "string" ? Date.parse(e.createdAt) : e.createdAt ?? undefined,
        }))
        if (!cancelled) setEvents(normalized)
      } catch (e) {
        console.error("Failed to load events", e)
      }
    }

    void loadEvents()

    return () => {
      cancelled = true
    }
  }, [])

  return events
}

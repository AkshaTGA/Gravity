"use client"

import { useEffect, useState, useCallback } from "react"
import { defaultMembers } from "@/lib/data"
import type { Member } from "@/lib/types"

const STORAGE_KEY = "gravity_members"

export function useMembers() {
  const [members, setMembers] = useState<Member[]>(defaultMembers)

  const loadMembers = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: Member[] = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setMembers(parsed)
        }
      }
    } catch (e) {
      // Ignore parse errors; keep default
    }
  }, [])

  useEffect(() => {
    loadMembers()
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadMembers()
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [loadMembers])

  return members
}

"use client"

import { useState, useEffect, useCallback } from "react"
import type { Member, Event } from "@/lib/types"
import { defaultMembers, defaultEvents } from "@/lib/data"

const ADMIN_PASSWORD = "gravity2024" // Hardcoded admin credentials
const ADMIN_USER = "admin"
const MEMBERS_STORAGE_KEY = "gravity_members"
const EVENTS_STORAGE_KEY = "gravity_events"

export function useAdminStore() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Initial load: members + auth token
    const storedMembers = localStorage.getItem(MEMBERS_STORAGE_KEY)
    if (storedMembers) {
      const parsed: Member[] = JSON.parse(storedMembers)
      // Backfill missing timestamps for older entries
      const withTimestamps = parsed.map(m => ({ ...m, createdAt: m.createdAt ?? Date.now() }))
      setMembers(withTimestamps)
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(withTimestamps))
    } else {
      const seeded = defaultMembers.map(m => ({ ...m, createdAt: Date.now() }))
      setMembers(seeded)
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(seeded))
    }
    const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY)
    if (storedEvents) {
      const parsed: Event[] = JSON.parse(storedEvents)
      const withTimestamps = parsed.map(e => ({ ...e, createdAt: e.createdAt ?? Date.now() }))
      setEvents(withTimestamps)
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(withTimestamps))
    } else {
      const seeded = defaultEvents.map(e => ({ ...e, createdAt: Date.now() }))
      setEvents(seeded)
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(seeded))
    }
    const token = localStorage.getItem("gravity_admin_token")
    setIsLoggedIn(!!token)
    setAuthChecked(true)
    setIsLoading(false)
  }, [])

  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem("gravity_admin_token", "true")
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    localStorage.removeItem("gravity_admin_token")
  }, [])

  const saveMember = useCallback((member: Member) => {
    setMembers((prev) => {
      const updated = prev.map((m) => (m.id === member.id ? member : m))
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const addMember = useCallback((member: Omit<Member, "id" | "createdAt">) => {
    const newMember: Member = { ...member, id: Date.now().toString(), createdAt: Date.now() }
    setMembers((prev) => {
      const updated = [...prev, newMember]
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    return newMember
  }, [])

  const deleteMember = useCallback((id: string) => {
    setMembers((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  // Events CRUD
  const addEvent = useCallback((event: Omit<Event, "id" | "createdAt">) => {
    const newEvent: Event = { ...event, id: Date.now().toString(), createdAt: Date.now() }
    setEvents((prev) => {
      const updated = [...prev, newEvent]
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    return newEvent
  }, [])

  const saveEvent = useCallback((event: Event) => {
    setEvents((prev) => {
      const updated = prev.map((e) => (e.id === event.id ? event : e))
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id)
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  // Deprecated external auth check; state is established once on mount.
  const checkAuth = useCallback(() => {
    // No-op kept for backward compatibility with existing components.
    // Could trigger a re-validation if needed later.
    const token = localStorage.getItem("gravity_admin_token")
    setIsLoggedIn(!!token)
    setAuthChecked(true)
  }, [])

  return {
    members,
    events,
    isLoggedIn,
    isLoading,
    login,
    logout,
    saveMember,
    addMember,
    deleteMember,
    addEvent,
    saveEvent,
    deleteEvent,
    checkAuth,
    authChecked,
  }
}

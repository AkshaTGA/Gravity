"use client"

import { useEffect, useState, useRef } from "react"
import { useAdminStore } from "@/hooks/use-admin-store"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MemberForm } from "@/components/member-form"
import { EventForm } from "@/components/event-form"
import type { Member, Event } from "@/lib/types"
import { Edit2, Trash2, Plus, LogOut, Users, Calendar, Image as ImageIcon, Type } from "lucide-react"
import { useMemo, useState as useReactState } from "react"
import { useAdminStore as useStore } from "@/hooks/use-admin-store"

export default function AdminDashboard() {
  const {
    members,
    events,
    isLoggedIn,
    logout,
    saveMember,
    addMember,
    deleteMember,
    addEvent,
    saveEvent,
    deleteEvent,
    authChecked,
  } = useAdminStore()
  const router = useRouter()
  const redirectedRef = useRef(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [showMembersOnly, setShowMembersOnly] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [showAllMembers, setShowAllMembers] = useState(false)
  const [showAllEvents, setShowAllEvents] = useState(false)

  // Run auth check once on mount.
  // Redirect unauthenticated users only after auth has been checked.
  useEffect(() => {
    if (authChecked && !isLoggedIn && !redirectedRef.current) {
      redirectedRef.current = true
      router.replace("/admin")
    }
  }, [authChecked, isLoggedIn, router])

  const handleSave = (member: Member) => {
    if (editingMember) {
      saveMember(member)
      setEditingMember(null)
    } else {
      addMember(member)
      setIsAddingNew(false)
    }
  }

  const handleSaveEvent = (evt: Event) => {
    if (editingEvent) {
      saveEvent(evt)
      setEditingEvent(null)
    } else {
      addEvent(evt)
      setIsAddingEvent(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/60">Loading dashboard…</p>
      </main>
    )
  }

  if (!isLoggedIn) return null

  // Sort by creation timestamp descending (fallback to date for events if missing)
  const sortedMembers = [...members].sort((a,b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  const sortedEvents = [...events].sort((a,b) => {
    const ctDiff = (b.createdAt ?? 0) - (a.createdAt ?? 0)
    if (ctDiff !== 0) return ctDiff
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  const displayMembers = showAllMembers ? sortedMembers : sortedMembers.slice(0,2)
  const displayEvents = showAllEvents ? sortedEvents : sortedEvents.slice(0,2)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-foreground/60 mt-1">Manage Gravity members and coordinators</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="card-glow p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">
                  {editingMember ? "Edit Member" : isAddingNew ? "Add New Member" : "Add Member"}
                </h2>
                {(editingMember || isAddingNew) && (
                  <MemberForm
                    member={editingMember || undefined}
                    onSubmit={handleSave}
                    onCancel={() => {
                      setEditingMember(null)
                      setIsAddingNew(false)
                    }}
                  />
                )}
                {!editingMember && !isAddingNew && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <Plus size={20} />
                    Add New Member
                  </button>
                )}
              </div>

              {/* Events Form Section (sticky similar to Add Member) */}
              <div className="card-glow p-6 mt-6 sticky top-[340px]">
                <h2 className="text-xl font-bold mb-6">
                  {editingEvent ? "Edit Event" : isAddingEvent ? "Add New Event" : "Add Event"}
                </h2>
                {(editingEvent || isAddingEvent) && (
                  <EventForm
                    event={editingEvent || undefined}
                    onSubmit={handleSaveEvent}
                    onCancel={() => {
                      setEditingEvent(null)
                      setIsAddingEvent(false)
                    }}
                  />
                )}
                {!editingEvent && !isAddingEvent && (
                  <button
                    onClick={() => setIsAddingEvent(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <Plus size={20} />
                    Add New Event
                  </button>
                )}
              </div>
            </div>

            {/* Members List */}
            <div className="lg:col-span-2">
              {/* Toggle placed directly above the list */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setShowMembersOnly(prev => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80 transition-all"
                >
                  <Users size={20} />
                  {showMembersOnly ? "Show All" : "See All Members"}
                </button>
                {showMembersOnly && (
                  <span className="text-sm text-foreground/60">Showing only role = member</span>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><Users size={20}/> Members</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAllMembers(s => !s)}
                    className="px-3 py-2 rounded-lg bg-card border border-border hover:bg-card/80 text-sm"
                  >{showAllMembers ? "Hide" : "Show All"}</button>
                </div>
              </div>
              <div className="space-y-4">
                {displayMembers.map((member) => (
                  <div key={member.id} className="card-glow p-6 flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={member.image || "/placeholder.svg?key=default"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-sm text-foreground/60">
                        {member.isOverallCoordinator
                          ? "👑 Overall Coordinator"
                          : member.isFacultyCoordinator
                          ? "🎓 Faculty Coordinator"
                          : member.role === "coordinator"
                          ? "🎖️ Coordinator"
                          : "👤 Member"}
                        {member.wing ? ` • ${member.wing}` : ""}
                      </p>
                      <p className="text-sm text-foreground/70 mt-1">{member.bio}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-2 rounded-lg hover:bg-card transition-all text-primary"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="p-2 rounded-lg hover:bg-card transition-all text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Events Management */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Calendar size={18}/> Events</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAllEvents(s => !s)}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:bg-card/80 text-sm"
                    >{showAllEvents ? "Hide" : "Show All"}</button>
                    <button
                      onClick={() => setIsAddingEvent(true)}
                      className="px-3 py-2 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium"
                    >Add Event</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {displayEvents.map((e) => (
                    <div key={e.id} className="card-glow p-4 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-card border border-border">
                        <img src={e.image || "/placeholder.svg?key=event"} alt={e.title} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{e.title}</div>
                        <div className="text-xs text-foreground/60">{e.wing} • {new Date(e.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingEvent(e)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }}
                          className="p-2 rounded-lg hover:bg-card transition-all text-primary"
                        >
                          <Edit2 size={18}/>
                        </button>
                        <button
                          onClick={async () => {
                            if (!window.confirm(`Are you sure you want to email subscribers about "${e.title}"?`)) return
                            try {
                              const res = await fetch('/api/notify-event', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ event: e }),
                              })
                              const data = await res.json()
                              if (res.ok && data?.ok) {
                                alert(`Email sent to ${data.sent} subscriber(s).`)
                              } else {
                                alert(`Failed to send: ${data?.error || 'Unknown error'}`)
                              }
                            } catch (err) {
                              alert('Network error while sending email')
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-card transition-all text-green-500"
                          title="Notify Subscribers"
                        >
                          <Calendar size={18}/>
                        </button>
                        <button
                          onClick={() => deleteEvent(e.id)}
                          className="p-2 rounded-lg hover:bg-card transition-all text-red-500"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

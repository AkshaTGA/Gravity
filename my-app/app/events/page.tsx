"use client"

import { useEffect, useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, X } from "lucide-react"
import { useAdminStore } from "@/hooks/use-admin-store"
import type { Event } from "@/lib/types"

export default function EventsPage() {
  const { events } = useAdminStore()
  const [selected, setSelected] = useState<Event | null>(null)
  const [email, setEmail] = useState("")
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")
  const [subMessage, setSubMessage] = useState("")

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  const [showAll, setShowAll] = useState(false)
  const VISIBLE_LIMIT = 6
  const sorted = useMemo(() => {
    // Sort by numeric id (new additions get higher Date.now id) fallback to date
    return [...events].sort((a,b) => {
      const idDiff = Number(b.id) - Number(a.id)
      if (!isNaN(idDiff) && idDiff !== 0) return idDiff
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [events])

  const visibleEvents = showAll ? sorted : sorted.slice(0, VISIBLE_LIMIT)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">Events & Activities</h1>
            <p className="text-xl text-foreground/70">Join our exciting events and competitions</p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleEvents.map((event, index) => (
              <div
                key={event.id}
                className="card-glow overflow-hidden group slide-in-up h-[520px] flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg?key=event"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Event Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-medium text-purple-300 mb-3">
                    {event.wing}
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all line-clamp-2">{event.title}</h3>

                  <div className="space-y-2 pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Calendar size={16} />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <MapPin size={16} />
                      <span>Campus</span>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => setSelected(event)}
                        className="text-sm font-medium text-primary hover:opacity-80 transition inline-flex items-center gap-1"
                        aria-label={`More about ${event.title}`}
                      >
                        More
                        <span aria-hidden>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Toggle show all */}
          <div className="mt-8 flex justify-center">
            {sorted.length > VISIBLE_LIMIT && (
              <button
                onClick={() => setShowAll(s => !s)}
                className="px-6 py-2 rounded-lg bg-card border border-border hover:bg-card/80 transition text-sm font-medium"
              >
                {showAll ? "Show Less" : `Show All (${sorted.length})`}
              </button>
            )}
          </div>

          {/* Modal Overlay for selected event */}
          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
            >
              <div
                className="relative w-[600px] h-[400px] card-glow bg-card border border-border p-4 sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-10 rounded-md p-1.5 bg-black/40 hover:bg-black/60 text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                {/* Description only with fixed-size rectangle and auto overflow */}
                <div className="h-full overflow-auto pr-2 text-foreground/80 leading-relaxed whitespace-pre-line">
                  {selected.description}
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-foreground/70 mb-6">Subscribe to get notifications about upcoming events</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={async () => {
                  const valid = /^(?:[a-zA-Z0-9_.'+\-]+)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(email)
                  if (!valid) {
                    setSubStatus("error")
                    setSubMessage("Enter a valid email")
                    return
                  }
                  try {
                    setSubStatus("loading")
                    const res = await fetch("/api/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    })
                    const data = await res.json()
                    if (res.ok && data.ok) {
                      setSubStatus("ok")
                      setSubMessage("You're subscribed!")
                      setEmail("")
                    } else {
                      setSubStatus("error")
                      setSubMessage(data?.error || "Something went wrong")
                    }
                  } catch (e) {
                    setSubStatus("error")
                    setSubMessage("Network error")
                  }
                }}
                disabled={subStatus === "loading"}
                className="px-6 py-2 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all disabled:opacity-60"
              >
                {subStatus === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
            {subStatus !== "idle" && (
              <p className={`mt-3 text-sm ${subStatus === "ok" ? "text-green-400" : "text-red-400"}`}>{subMessage}</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

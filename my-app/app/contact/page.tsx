"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Mail, MapPin, MessageSquare } from "lucide-react"
import MagicButton from "@/components/magic-button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message")
      }
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err: any) {
      setError(err?.message || "Network error")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">Get In Touch</h1>
            <p className="text-xl text-foreground/70">We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 slide-in-up">
              <div className="card-glow p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--brand-from)] to-[var(--brand-to)] flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-foreground/70">contact@gravitysociety.com</p>
                  </div>
                </div>
              </div>

              <div className="card-glow p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--brand-from)] to-[var(--brand-to)] flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p className="text-foreground/70">Your Campus, City</p>
                  </div>
                </div>
              </div>

              <div className="card-glow p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--brand-from)] to-[var(--brand-to)] flex items-center justify-center shrink-0">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Discord</h3>
                    <p className="text-foreground/70">Join our community server</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-glow p-8 slide-in-up" style={{ animationDelay: "0.1s" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    required
                  />
                </div>

                <MagicButton type="submit" className="w-full" heightClass="h-12">
                  {sending ? "Sending…" : submitted ? "✓ Message Sent!" : "Send Message"}
                </MagicButton>

                {error && (
                  <div className="mt-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                    {error}
                  </div>
                )}
              </form>

              {submitted && (
                <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 slide-in-up">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How can I join Gravity?",
                  a: "Fill out the contact form above and mention your interest in joining. Our team will reach out with more details!",
                },
                {
                  q: "Is there a membership fee?",
                  a: "Gravity is open to all students. There is no membership fee, just a passion for technology!",
                },
                {
                  q: "Can I join multiple wings?",
                  a: "We encourage members to explore different wings and expand their skills.",
                },
                {
                  q: "When do you host events?",
                  a: "Events are hosted regularly throughout the year. Check our Events page for the schedule!",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="card-glow p-6 hover:shadow-lg transition-all"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-foreground/70 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

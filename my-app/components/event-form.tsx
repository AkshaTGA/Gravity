"use client"

import type React from "react"

import { useState } from "react"
import type { Event } from "@/lib/types"
import { wings } from "@/lib/data"
import MagicButton from "@/components/magic-button"

interface EventFormProps {
  event?: Event
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<{
    title: string
    date: string
    wing: string
    description: string
    image: string
  }>({
    title: event?.title || "",
    date: event?.date || new Date().toISOString().slice(0, 10),
    wing: event?.wing || "",
    description: event?.description || "",
    image: event?.image || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const MAX_DIM = 768 // events can use a slightly larger banner
        let { width, height } = img
        if (width > MAX_DIM || height > MAX_DIM) {
          const scale = Math.min(MAX_DIM / width, MAX_DIM / height)
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const isPng = file.type === "image/png"
          const dataUrl = canvas.toDataURL(isPng ? "image/png" : "image/jpeg", 0.85)
          setFormData((prev) => ({ ...prev, image: dataUrl }))
        }
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...event, ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Wing</label>
        <select
          name="wing"
          value={formData.wing}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select a wing</option>
          {wings.map((wing) => (
            <option key={wing.id} value={wing.name}>
              {wing.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Describe the event"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground file:bg-primary file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 cursor-pointer"
        />
        {formData.image && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative w-28 h-16">
              <img src={formData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="text-xs text-foreground/50 max-w-40 truncate">Image ready</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <MagicButton type="submit" className="flex-1" heightClass="h-11">
          {event ? "Update" : "Add"} Event
        </MagicButton>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground font-medium hover:bg-card/80 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

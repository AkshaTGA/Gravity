"use client"

import type React from "react"

import { useState } from "react"
import type { Member } from "@/lib/types"
import { wings } from "@/lib/data"
import { uploadToCloudinary } from "@/lib/cloudinary"
import MagicButton from "@/components/magic-button"

interface MemberFormProps {
  member?: Member
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState<{
    name: string
    role: Member["role"]
    wing: string
    bio: string
    image: string
    isOverallCoordinator: boolean
    isFacultyCoordinator: boolean
  }>({
    name: member?.name || "",
    role: member?.role || "member",
    wing: member?.wing || "",
    bio: member?.bio || "",
    image: member?.image || "",
    isOverallCoordinator: member?.isOverallCoordinator || false,
    isFacultyCoordinator: member?.isFacultyCoordinator || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [uploading, setUploading] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = async () => {
      const img = new Image()
      img.onload = async () => {
        // Downscale large images to max 512px (width or height)
        const MAX_DIM = 512
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
          try {
            // If Cloudinary envs exist, upload and store URL; otherwise keep data URL
            if (
              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
            ) {
              setUploading(true)
              const blob = await (await fetch(dataUrl)).blob()
              const outFile = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" })
              const url = await uploadToCloudinary(outFile)
              setFormData((prev) => ({ ...prev, image: url }))
            } else {
              setFormData((prev) => ({ ...prev, image: dataUrl }))
            }
          } catch (err) {
            console.error(err)
            setFormData((prev) => ({ ...prev, image: dataUrl }))
          } finally {
            setUploading(false)
          }
        }
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...member, ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="member">Member</option>
            <option value="coordinator">Coordinator</option>
          </select>
        </div>
      </div>

      {!(formData.role === "coordinator" && (formData.isOverallCoordinator || formData.isFacultyCoordinator)) && (
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
          {/* Quick toggle to make this person a coordinator of the selected wing */}
          {formData.wing && formData.role !== "coordinator" && (
            <label className="mt-3 inline-flex items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={false}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.checked ? "coordinator" : "member" }))
                }
                className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm font-medium">Coordinator for this wing</span>
            </label>
          )}
        </div>
      )}

      {formData.role === "coordinator" && (
        <div className="flex items-center gap-2">
          <input
            id="overallCoordinator"
            type="checkbox"
            checked={formData.isOverallCoordinator}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isOverallCoordinator: e.target.checked }))
            }
            className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="overallCoordinator" className="text-sm font-medium">
            Overall Coordinator
          </label>
        </div>
      )}

      {formData.role === "coordinator" && (
        <div className="flex items-center gap-2">
          <input
            id="facultyCoordinator"
            type="checkbox"
            checked={formData.isFacultyCoordinator}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isFacultyCoordinator: e.target.checked }))
            }
            className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="facultyCoordinator" className="text-sm font-medium">
            Faculty Coordinator
          </label>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Enter member bio"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground file:bg-primary file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 cursor-pointer"
        />
        {uploading && <p className="mt-2 text-sm text-foreground/60">Uploading image...</p>}
        {formData.image && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative w-20 h-20">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-xs text-foreground/50 max-w-40 truncate">Image ready</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <MagicButton type="submit" className="flex-1" heightClass="h-11" disabled={uploading}>
          {member ? "Update" : "Add"} Member
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

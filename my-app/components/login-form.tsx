"use client"

import type React from "react"

import { useState } from "react"
import { useAdminStore } from "@/hooks/use-admin-store"
import { useRouter } from "next/navigation"
import MagicButton from "@/components/magic-button"

export function AdminLoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAdminStore()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      router.push("/admin/dashboard")
    } else {
      setError('Invalid credentials. Hint: username is "admin"')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter password"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <MagicButton type="submit" className="w-full" heightClass="h-11">
          Login
        </MagicButton>
      </form>
    </div>
  )
}

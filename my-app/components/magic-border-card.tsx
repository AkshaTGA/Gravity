"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MagicBorderCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}

export default function MagicBorderCard({ children, className, innerClassName }: MagicBorderCardProps) {
  return (
    <div className={cn("relative rounded-2xl p-[1px] overflow-hidden", className)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] blur-sm opacity-95",
          "bg-[conic-gradient(from_0deg,var(--brand-from),var(--brand-to),var(--brand-from))]",
          "animate-[spin_12s_linear_infinite]"
        )}
        style={{ transformOrigin: "50% 50%" }}
      />
      <div className={cn("relative z-10 rounded-2xl bg-card", innerClassName)}>
        {children}
      </div>
    </div>
  )
}

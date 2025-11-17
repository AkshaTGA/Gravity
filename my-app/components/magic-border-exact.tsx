"use client"

import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}

export default function MagicBorderExact({ children, className, innerClassName }: Props) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden p-[1px]", className)}>
      <span
        aria-hidden
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />
      <div className={cn("relative z-10 rounded-lg bg-card", innerClassName)}>
        {children}
      </div>
    </div>
  )
}

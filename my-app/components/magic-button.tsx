"use client"

import Link from "next/link"
import React from "react"

type MagicButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  heightClass?: string // allow overriding height if needed
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export default function MagicButton({ children, href, onClick, className = "", heightClass = "h-12", type = "button", disabled = false }: MagicButtonProps) {
  const Root: any = href ? Link : "button"
  const rootProps: any = href ? { href } : { type, onClick, disabled }

  return (
    <Root
      {...rootProps}
      className={[
        "relative inline-flex overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2",
        "focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-background",
        heightClass,
        disabled ? "opacity-60 pointer-events-none" : "",
        className,
      ].join(" ")}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-background px-4 py-1 text-sm font-semibold text-foreground backdrop-blur-3xl">
        {children}
      </span>
    </Root>
  )
}

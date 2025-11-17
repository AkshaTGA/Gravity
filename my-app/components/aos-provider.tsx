"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import AOS from "aos"

/**
 * AOSProvider initializes Animate On Scroll (AOS) once on the client.
 * Place this near the root (e.g. inside `app/layout.tsx` body) so data-aos attributes work anywhere.
 */
export function AOSProvider() {
  const pathname = usePathname()

  // Init AOS (repeatable animations)
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-quart",
      once: false,
      offset: 40, // smaller offset so elements trigger sooner
      mirror: false,
      anchorPlacement: "top-bottom",
    })

    // Force a refresh after hydration to ensure initial positions are computed
    const t1 = setTimeout(() => AOS.refreshHard(), 50)
    const onLoad = () => AOS.refreshHard()
    window.addEventListener("load", onLoad)
    return () => {
      clearTimeout(t1)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  useEffect(() => {
    const id = setTimeout(() => AOS.refreshHard(), 0)
    return () => clearTimeout(id)
  }, [pathname])

  useEffect(() => {
    const onFocus = () => AOS.refreshHard()
    const onVisibility = () => {
      if (document.visibilityState === "visible") AOS.refreshHard()
    }
    window.addEventListener("focus", onFocus)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      window.removeEventListener("focus", onFocus)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return null
}

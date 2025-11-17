"use client"

import Link from "next/link"
import { wings } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import MagicBorderCard from "@/components/magic-border-card"

export function WingsSection() {
  return (
    <section id="wings" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text select-none">Our Seven Wings</h2>
        <p className="text-foreground/60 mb-16 text-lg">Each wing specializes in different areas of technology</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wings.map((wing) => (
            <MagicBorderCard key={wing.id} innerClassName="card-glow p-8 group rounded-2xl">
              <div className="text-5xl mb-4">{wing.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{wing.name}</h3>
              <p className="text-foreground/60 mb-6">{wing.description}</p>

              <Link
                href={`/wings/${wing.id}`}
                className="inline-flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors group/link"
              >
                View Members & Coordinators
                <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </MagicBorderCard>
          ))}
        </div>
      </div>
    </section>
  )
}

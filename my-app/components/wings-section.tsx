"use client"

import Link from "next/link"
import { wings } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export function WingsSection() {
  return (
    <section id="wings" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Seven Wings</h2>
        <p className="text-foreground/60 mb-16 text-lg">Each wing specializes in different areas of technology</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wings.map((wing) => (
            <div
              key={wing.id}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="relative z-10">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

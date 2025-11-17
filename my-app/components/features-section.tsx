"use client"

import { wings } from "@/lib/data"
import Link from "next/link"
import MagicBorderCard from "@/components/magic-border-card"

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Seven Wings</h2>
          <p className="text-foreground/60 text-lg">Diverse paths to technological excellence</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wings.map((wing, index) => (
            <Link href="/wings" key={wing.id}>
              <MagicBorderCard innerClassName="card-glow p-8 h-full cursor-pointer group rounded-2xl" >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{wing.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">{wing.name}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{wing.description}</p>
              </MagicBorderCard>
            </Link>
          ))}
        </div>

        {/* Special 7th wing card */}
        <div className="mt-6">
          <Link href="/wings">
            <MagicBorderCard innerClassName="card-glow p-8 cursor-pointer group text-center rounded-2xl">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-bold mb-3">Learn More</h3>
              <p className="text-foreground/70 text-sm">Explore detailed information about each wing</p>
            </MagicBorderCard>
          </Link>
        </div>
      </div>
    </section>
  )
}

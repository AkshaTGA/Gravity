"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { wings } from "@/lib/data"
import Link from "next/link"
import MagicBorderCard from "@/components/magic-border-card"
import MagicBorderExact from "@/components/magic-border-exact"

export default function WingsPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 ">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 select-none">Our Seven Wings</h1>
            <p className="text-xl text-foreground/70">Excellence across all domains of technology</p>
          </div>

          {/* Wings Grid */}
          <div className="space-y-12">
            {wings.map((wing, index) => (
              <div
                key={wing.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div
                  className={`${index % 2 === 1 ? "md:order-2" : ""} `}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
                    <MagicBorderExact className="h-full rounded-lg" innerClassName="h-full flex items-center justify-center rounded-lg">
                      <span className="text-9xl">{wing.icon}</span>
                    </MagicBorderExact>
                  </div>
                </div>

                <div
                  className={`${index % 2 === 1 ? "md:order-1" : ""} `}
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                  data-aos-anchor-placement="top-bottom"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="text-5xl mb-4">{wing.icon}</div>
                  <h2 className="text-4xl font-bold mb-4">{wing.name}</h2>
                  <p className="text-lg text-foreground/70 leading-relaxed mb-6">{wing.description}</p>

                  {/* Wing-specific content */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                      <p className="text-foreground/70">Regular competitions and contests</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                      <p className="text-foreground/70">Workshops and skill development</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                      <p className="text-foreground/70">Collaborative projects and mentorship</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                      <p className="text-foreground/70">Network with industry professionals</p>
                    </div>
                    {/* More link to members page for this wing */}
                    <div className="pt-2">
                      <Link
                        href={{ pathname: "/members", query: { wing: wing.name } }}
                        className="inline-flex items-center gap-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 hover:opacity-90 transition-opacity"
                      >
                        More...
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import LiquidEther from './LiquidEther';

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-8 md:pt-12">
      {/* Liquid Ether background covering the whole hero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

  {/* Content overlay centered */}
  <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-sm font-medium text-purple-300">
          Welcome to the Future of Tech
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Gravity</span>
          <br />
          Technical Society
        </h1>

        {/* Subheading */}
  <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Seven wings of innovation: Competitive Coding, Web Development, Design, FOSS, Private AI, Blockchain, and
          Metaverse
        </p>

        {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="#wings"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg btn-gradient text-white font-bold hover:shadow-lg hover:shadow-purple-400/40 transition-all transform hover:scale-105"
          >
            Explore Wings
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-card border border-border text-foreground font-bold hover:bg-card/80 transition-all"
          >
            Get in Touch
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-border/30">
          <div className="slide-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl md:text-4xl font-bold gradient-text">7</div>
            <div className="text-sm text-foreground/60 mt-1">Wings</div>
          </div>
          <div className="slide-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl md:text-4xl font-bold gradient-text">100+</div>
            <div className="text-sm text-foreground/60 mt-1">Members</div>
          </div>
          <div className="slide-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl md:text-4xl font-bold gradient-text">50+</div>
            <div className="text-sm text-foreground/60 mt-1">Projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}

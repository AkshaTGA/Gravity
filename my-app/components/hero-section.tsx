"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import LiquidEther from './LiquidEther';
import { useState } from "react";
import MagicButton from "@/components/magic-button";

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
         <div className="pt-8 flex justify-center">
          {(() => {
            const [isSpinning, setIsSpinning] = useState(false);
            return (
              <div
                className={("inline-flex items-center justify-center " + (isSpinning ? "logo-spin-once" : "")).trim()}
                onClick={() => setIsSpinning(true)}
                onAnimationEnd={() => setIsSpinning(false)}
                role="img"
                aria-label="Gravity Logo"
              >
                <img
                  src="/gravity-logo.ico"
                  alt="Gravity Logo"
                  className="w-25 h-25 object-contain drop-shadow-[0_0_12px_rgba(124,92,255,0.35)] float-animation transition-all duration-300 ease-out hover:scale-105 hover:-rotate-2 hover:drop-shadow-[0_0_18px_rgba(124,92,255,0.6)] cursor-pointer"
                />
              </div>
            );
          })()}
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 select-none leading-tight">
          <span className="gradient-text ">Gravity</span>
          <br />
          Technical Society
        </h1>

        {/* Subheading */}
  <p className="text-xl md:text-2xl selection:bg-[#65555563] selection:text-white  text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Seven wings of innovation: Competitive Coding, Web Development, Design, FOSS, Private AI, Blockchain, and
          Metaverse
        </p>

        {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <MagicButton href="#wings" className="font-bold">
            <span>Explore Wings</span>
            <ArrowRight size={20} />
          </MagicButton>
          <MagicButton href="/contact" className="font-bold" heightClass="h-12">
            Get in Touch
          </MagicButton>
        </div>

        {/* Gravity Logo Display (replaces stats) */}
       
      </div>
    </section>
  )
}

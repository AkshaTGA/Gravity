"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import WingsPage from "./wings/page"
import { OverallCoordinatorsSection } from "@/components/overall-coordinators-section"
import { FacultyCoordinatorsSection } from "@/components/faculty-coordinators-section"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-background">
        <HeroSection />
  
        <WingsPage />
        <FacultyCoordinatorsSection />
        <OverallCoordinatorsSection />
      </main>
      <Footer />
    </>
  )
}

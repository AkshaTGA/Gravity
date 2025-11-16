"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import WingsPage from "./wings/page";
import { OverallCoordinatorsSection } from "@/components/overall-coordinators-section";
import { FacultyCoordinatorsSection } from "@/components/faculty-coordinators-section";
import IntroVideo from "@/components/intro-video";
import { useState, useEffect, JSX } from "react";

const STORAGE_KEY = "introVideoSeenAt";
const EXPIRY_MS = 24 * 60 * 60 * 1000;

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    // decide whether to show intro based on localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const ts = raw ? Number(raw) : 0;
      const now = Date.now();
      if (!ts || Number.isNaN(ts) || now - ts > EXPIRY_MS) {
        setShowIntro(true);
        setShowContent(false);
      } else {
        setShowIntro(false);
        setShowContent(true);
      }
    } catch (e) {
      // if localStorage isn't available, show intro
      setShowIntro(true);
    }
  }, []);

  function handleIntroFinish() {
    setShowIntro(false);
    setShowContent(true);
  }

  if (showIntro) {
    return <IntroVideo onFinish={handleIntroFinish} />;
  }

  if (!showContent) {
    // while deciding, render nothing to avoid showing base site before intro
    return null;
  }

  return (
    <>
      <Navigation />
      <main className="bg-background">
        <HeroSection />
        <AboutSection />
        <WingsPage />
        <FacultyCoordinatorsSection />
        <OverallCoordinatorsSection />
      </main>
      <Footer />
    </>
  );
}

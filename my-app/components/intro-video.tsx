"use client";

import { useEffect, useRef, useState } from "react";
import "./intro-video.css";

const STORAGE_KEY = "introVideoSeenAt";
const EXPIRY_MS = 24 * 60 * 60 * 1000;

export default function IntroVideo({ onFinish }: { onFinish?: () => void }) {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const ts = raw ? Number(raw) : 0;
      const now = Date.now();
      if (!ts || Number.isNaN(ts) || now - ts > EXPIRY_MS) {
        setShouldShow(true);
      }
    } catch (e) {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (shouldShow && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldShow]);

  function handleEnded() {
    setAnimating(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (e) {}

    const ANIM_MS = 900;
    setTimeout(() => {
      setShouldShow(false);
      setAnimating(false);
      try {
        onFinish?.();
      } catch (e) {
        // ignore
      }
    }, ANIM_MS);
  }

  if (!shouldShow) return null;

  return (
    <div className="intro-overlay" aria-hidden={!shouldShow}>
      <video
        ref={videoRef}
        className={`intro-video ${animating ? "intro-video-hidden" : ""}`}
        src="/introvideo.mp4"
        playsInline
        autoPlay
        muted
        onEnded={handleEnded}
      />

      {animating && <div className="intro-bubble" />}
    </div>
  );
}

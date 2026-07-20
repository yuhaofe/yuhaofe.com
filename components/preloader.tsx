"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/smooth-scroll";

declare global {
  interface Window {
    __appReady?: boolean;
  }
}

const BARS = 28;

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);
  const seedsRef = useRef<number[]>(
    // integer-hash pseudo randomness: identical on server and client (hydration-safe)
    Array.from({ length: BARS }, (_, i) => 0.25 + (((i * 37 + 11) % 13) / 13) * 0.75)
  );

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();

    // wall-clock driven so background-tab timer throttling can't stall it
    const start = Date.now();
    const DURATION = 1400; // ms to reach 100%
    const id = setInterval(() => {
      const value = Math.min(100, ((Date.now() - start) / DURATION) * 100);
      setPct(Math.floor(value));
      if (value >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setLifting(true);
          window.__appReady = true;
          window.dispatchEvent(new Event("app:ready"));
          lenis?.start();
          setTimeout(() => setGone(true), 1100);
        }, 300);
      }
    }, 60);

    return () => {
      clearInterval(id);
      lenis?.start();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030b18] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        lifting ? "-translate-y-full" : ""
      }`}
      aria-hidden={lifting}
    >
      {/* waveform bars */}
      <div className="flex h-16 items-center gap-[5px]" aria-hidden>
        {seedsRef.current.map((s, i) => (
          <span
            key={i}
            className="preloader-bar w-[4px] rounded-full bg-gradient-to-t from-blue-500 to-cyan-300"
            style={{
              height: `${18 + s * 82}%`,
              animationDelay: `${i * 55}ms`,
            }}
          />
        ))}
      </div>

      <div className="font-mono-hud mt-10 flex w-72 flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4 text-xs tracking-[0.3em] text-[#7d93b2]">
          <span className="whitespace-nowrap">CALIBRATING SIGNAL</span>
          <span className="text-glow shrink-0 text-2xl text-cyan-300">{pct}%</span>
        </div>
        <div className="h-px w-full bg-cyan-400/15">
          <div
            className="h-px bg-gradient-to-r from-cyan-300 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-[width] duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <p className="font-mono-hud absolute bottom-8 whitespace-nowrap text-[10px] tracking-[0.3em] text-[#47586e] sm:tracking-[0.5em]">
        YUHAOFE — THE WAVES NEVER REST
      </p>
    </div>
  );
}

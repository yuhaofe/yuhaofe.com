"use client";

import { useEffect, useRef } from "react";

/** Fixed left-edge scroll progress rail with a mono percentage readout. */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const pct = Math.round(p * 100);
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p})`;
      }
      if (labelRef.current && pct !== last) {
        last = pct;
        labelRef.current.textContent = String(pct).padStart(3, "0");
      }
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="font-mono-hud pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      <span className="text-[9px] tracking-[0.3em] text-cyan-200/70 [writing-mode:vertical-lr]">
        SCROLL
      </span>
      <div className="h-32 w-[2px] overflow-hidden bg-cyan-300/25">
        <div
          ref={fillRef}
          className="h-full w-full origin-top bg-gradient-to-b from-cyan-300 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,1)]"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
      <span ref={labelRef} className="text-glow text-[11px] font-semibold text-cyan-200">
        000
      </span>
    </div>
  );
}

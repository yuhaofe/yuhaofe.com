"use client";

import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

/** Create (once) and return the global Lenis smooth-scroll instance. */
export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroyLenis() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

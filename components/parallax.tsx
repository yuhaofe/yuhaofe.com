"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** fraction of viewport-center offset applied; negative = slower (background), positive = faster (foreground) */
  speed?: number;
  className?: string;
}

/** Scroll parallax wrapper: translates content vertically relative to its
 *  distance from the viewport center, every frame. */
export default function Parallax({ children, speed = 0.15, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(1)}px, 0)`;
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: precise dot + lagging ring. The ring expands over
 * interactive elements. Desktop (fine pointer) only.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest("a, button, [data-cursor]");
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
        hovering ? 2.1 : 1
      })`;
      ring.style.borderColor = hovering
        ? "rgba(34, 211, 238, 0.9)"
        : "rgba(34, 211, 238, 0.45)";
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[119] h-9 w-9 rounded-full border transition-[border-color] duration-200"
      />
    </>
  );
}

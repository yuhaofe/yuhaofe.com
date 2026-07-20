"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initLenis, destroyLenis, getLenis } from "@/lib/smooth-scroll";

/**
 * Lenis smooth scrolling only runs on the homepage, where the immersive
 * feel is wanted. Subpages keep native scrolling so reading never lags.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    initLenis();
    return () => destroyLenis();
  }, [isHome]);

  // Lenis keeps its own scroll state, so Next's default scroll restoration
  // is not enough — force both back to the top on every route change.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

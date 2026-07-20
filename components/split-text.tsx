"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  /** per-char stagger in ms */
  stagger?: number;
  /** base delay in ms */
  delay?: number;
  /** 'ready' waits for the preloader, 'inview' triggers on scroll into view */
  trigger?: "ready" | "inview";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Kinetic typography: splits text into chars inside overflow-hidden masks,
 * sliding each char up with a stagger. Words are kept unbreakable.
 */
export default function SplitText({
  text,
  className = "",
  stagger = 28,
  delay = 0,
  trigger = "inview",
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (trigger === "ready") {
      if (window.__appReady) {
        setOn(true);
        return;
      }
      const handler = () => setOn(true);
      window.addEventListener("app:ready", handler, { once: true });
      // poll in case the event fired between render and effect,
      // plus a hard fallback so the text can never stay hidden
      const poll = setInterval(() => {
        if (window.__appReady) {
          setOn(true);
          clearInterval(poll);
        }
      }, 150);
      const fallback = setTimeout(() => setOn(true), 4500);
      return () => {
        window.removeEventListener("app:ready", handler);
        clearInterval(poll);
        clearTimeout(fallback);
      };
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setOn(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  let charIndex = 0;
  const words = text.split(" ").map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      {word.split("").map((ch, ci) => {
        const i = charIndex++;
        return (
          <span key={ci} className="inline-block overflow-hidden align-bottom">
            <span
              className={`split-char inline-block will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                on ? "translate-y-0" : "translate-y-[115%]"
              }`}
              style={{ transitionDelay: `${delay + i * stagger}ms` } as CSSProperties}
            >
              {ch}
            </span>
          </span>
        );
      })}
      {wi < text.split(" ").length - 1 ? "\u00A0" : ""}
    </span>
  ));

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} aria-label={text}>
      {words as ReactNode}
    </Tag>
  );
}

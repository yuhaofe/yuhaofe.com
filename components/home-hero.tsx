'use client'

import { useEffect, useState } from 'react'
import Parallax from '@/components/parallax'
import SplitText from '@/components/split-text'
import { scrollToId } from '@/lib/smooth-scroll'

function useTicker(base: number, spread: number, decimals: number, interval = 900) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * spread)
    }, interval)
    return () => clearInterval(id)
  }, [base, spread, interval])
  return value.toFixed(decimals)
}

function HudReadout({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="hud-panel px-4 py-3">
      <div className="text-[10px] tracking-[0.25em] text-[#7d93b2]">{label}</div>
      <div className="text-glow mt-1 text-lg text-cyan-300">
        {value}
        <span className="ml-1 text-xs text-[#7d93b2]">{unit}</span>
      </div>
    </div>
  )
}

export default function HomeHero({
  kicker,
  line1a,
  line1b,
  line2,
  outline,
  specs,
  scrollCue,
  gradientFirst = false,
}: {
  kicker: string
  line1a: string
  line1b: string
  line2: string
  outline: string
  specs: string[]
  scrollCue: string
  /** when true the gradient chars come first (zh-CN: 浪|涌不息) */
  gradientFirst?: boolean
}) {
  const freq = useTicker(432.0, 6, 2)
  const amp = useTicker(0.86, 0.1, 3)
  const db = useTicker(-6.2, 1.5, 1)

  const partA = (
    <SplitText
      text={line1a}
      trigger="ready"
      stagger={55}
      delay={150}
      className={gradientFirst ? 'text-gradient-chars' : 'text-glow'}
    />
  )
  const partB = (
    <SplitText
      text={line1b}
      trigger="ready"
      stagger={55}
      delay={320}
      className={gradientFirst ? 'text-glow' : 'text-gradient-chars'}
    />
  )

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* background layer: huge outline word, slowest parallax */}
      <Parallax speed={0.35} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-outline select-none whitespace-nowrap text-[22vw] font-bold leading-none opacity-40">
          {outline}
        </span>
      </Parallax>

      {/* mid layer: HUD corners */}
      <Parallax speed={0.12} className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="font-mono-hud absolute left-8 top-28 text-[10px] leading-5 tracking-[0.25em] text-[#47586e]">
          LAT 31.23°N<br />LON 121.47°E<br />DEPTH −42m
        </div>
        <div className="font-mono-hud absolute right-8 top-28 text-right text-[10px] leading-5 tracking-[0.25em] text-[#47586e]">
          CH 01—05<br />GAIN +12dB<br />SYNC LOCKED
        </div>
        <div className="font-mono-hud absolute bottom-24 left-8 text-[10px] tracking-[0.25em] text-[#47586e]">
          SIGNAL :: STABLE ▮▮▮▮▯
        </div>
        <div className="font-mono-hud absolute bottom-24 right-8 text-[10px] tracking-[0.25em] text-[#47586e]">
          sig // cp1919 · radio waves
        </div>
      </Parallax>

      {/* foreground layer: headline content */}
      <Parallax speed={-0.08} className="relative flex flex-col items-center">
        <p className="font-mono-hud mb-8 flex items-center gap-2 text-[11px] tracking-[0.5em] text-cyan-400/80">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
          {kicker}
        </p>

        <h1 className="text-center text-[13.5vw] font-bold lowercase leading-[1.05] tracking-tight sm:text-[8vw]">
          <span className="block">
            {partA}
            {line1a && line1b ? ' ' : ''}
            {partB}
          </span>
          {line2 && (
            <span className="block">
              <SplitText
                text={line2}
                trigger="ready"
                stagger={55}
                delay={610}
                className="text-glow"
              />
            </span>
          )}
        </h1>

        {/* spec readout bar */}
        <div className="font-mono-hud mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-widest text-[#7d93b2]">
          {specs.map(spec => (
            <span key={spec} className="flex items-center gap-2">
              <span className="text-cyan-400" aria-hidden>+</span>
              {spec}
            </span>
          ))}
        </div>

        <div className="font-mono-hud mt-14 grid grid-cols-3 gap-3 sm:gap-6">
          <HudReadout label="FREQ" value={freq} unit="Hz" />
          <HudReadout label="AMP" value={amp} unit="V" />
          <HudReadout label="LEVEL" value={db} unit="dB" />
        </div>
      </Parallax>

      <button
        onClick={() => scrollToId('#projects')}
        className="font-mono-hud absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-[#47586e] transition-colors hover:text-cyan-300"
      >
        {scrollCue}
        <span className="animate-bounce text-cyan-400">▼</span>
      </button>
    </section>
  )
}

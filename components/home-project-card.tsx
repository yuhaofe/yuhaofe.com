'use client'

import Link from 'next/link'
import { useEffect, useRef, type MouseEvent } from 'react'
import type { ProjectInfo } from '@/lib/types'

const BARS = '▁▂▃▄▅▆▇█'

/** Deterministic text waveform: the same index always draws the same bars. */
function textWave(seed: number, length: number) {
  return Array.from({ length }, (_, i) => {
    const v = Math.abs(Math.sin(i * 1.7 + seed * 2.3) * 0.7 + Math.sin(i * 0.6 + seed) * 0.3)
    return BARS[Math.min(BARS.length - 1, Math.floor(v * BARS.length))]
  }).join('')
}

export default function HomeProjectCard({
  info,
  index,
}: {
  info: ProjectInfo
  index: number
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const target = useRef({ rx: 0, ry: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const inner = innerRef.current
      if (!inner) return
      const cur = inner.dataset
      const crx = parseFloat(cur.rx || '0')
      const cry = parseFloat(cur.ry || '0')
      const nrx = crx + (target.current.rx - crx) * 0.12
      const nry = cry + (target.current.ry - cry) * 0.12
      cur.rx = String(nrx)
      cur.ry = String(nry)
      inner.style.transform = `rotateX(${nrx}deg) rotateY(${nry}deg)`
    }
    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMove = (e: MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    target.current = { rx: -py * 8, ry: px * 10 }
  }

  const onLeave = () => {
    target.current = { rx: 0, ry: 0 }
  }

  const ch = String(index + 1).padStart(2, '0')

  return (
    <Link
      ref={cardRef}
      href={`/${info.path}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group block w-[78vw] shrink-0 [perspective:1200px] sm:w-[46vw] lg:w-[34vw]"
      data-cursor
    >
      <div
        ref={innerRef}
        className="hud-panel scanline relative flex aspect-[8/5] flex-col overflow-hidden p-6 transition-shadow duration-300 will-change-transform [transform-style:preserve-3d] group-hover:shadow-[0_24px_80px_rgba(34,211,238,0.18)] sm:p-8"
      >
        {/* giant ghost channel number */}
        <span
          className="text-outline pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] font-bold leading-none opacity-30 transition-opacity duration-300 group-hover:opacity-60"
          aria-hidden
        >
          {ch}
        </span>

        <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-cyan-400/80">
          {info.type}
          <span className="mx-2 text-[#47586e]" aria-hidden>·</span>
          <span className="text-[#7d93b2]">CH.{ch}</span>
        </p>

        <h3 className="text-glow mt-4 max-w-[85%] text-xl font-semibold leading-snug text-cyan-100 transition-colors group-hover:text-cyan-300 sm:text-2xl">
          {info.title}
        </h3>
        <p className="mt-3 line-clamp-3 max-w-[92%] text-sm leading-relaxed text-[#9db4d0]">
          {info.description}
        </p>

        {/* text waveform footer */}
        <div className="font-mono-hud mt-auto border-t border-cyan-400/10 pt-3 text-[10px] tracking-wider">
          <span className="whitespace-nowrap text-cyan-400/40 transition-colors duration-300 group-hover:text-cyan-300/90" aria-hidden>
            {textWave(index + 1, 28)}
          </span>
          <span className="ml-3 text-[#47586e] transition-colors duration-300 group-hover:text-cyan-400/70">
            SIG.{ch} ▮ OPEN →
          </span>
        </div>
      </div>
    </Link>
  )
}

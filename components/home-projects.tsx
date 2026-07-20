'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import HomeProjectCard from '@/components/home-project-card'
import SplitText from '@/components/split-text'
import type { ProjectInfo } from '@/lib/types'

/**
 * Pinned horizontal gallery: the section is 340vh tall, the viewport-height
 * stage is sticky, and scroll progress scrubs the track's translateX.
 */
export default function HomeProjects({
  label,
  title,
  projects,
  moreLabel,
}: {
  label: string
  title: string
  projects: ProjectInfo[]
  moreLabel: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)))
      const maxX = Math.max(0, track.scrollWidth - window.innerWidth)
      track.style.transform = `translate3d(${(-p * maxX).toFixed(1)}px, 0, 0)`
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`
      }
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="font-mono-hud text-xs uppercase tracking-[0.4em] text-cyan-400/80">
            {label}
          </p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <SplitText
              as="h2"
              text={title}
              stagger={18}
              className="text-4xl font-bold tracking-tight sm:text-6xl"
            />
            <span className="font-mono-hud hidden pb-2 text-[10px] tracking-[0.3em] text-[#47586e] sm:block">
              DRAG THE TIMELINE ▸ SCROLL
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex gap-8 pl-6 will-change-transform sm:pl-[8vw]"
        >
          {projects.map((info, i) => (
            <HomeProjectCard key={info.path} info={info} index={i} />
          ))}
          {/* end card */}
          <div className="flex w-[40vw] shrink-0 items-center justify-center sm:w-[24vw]">
            <Link
              href="/projects"
              className="font-mono-hud text-outline text-3xl font-bold tracking-wide transition-colors hover:text-cyan-300 sm:text-5xl"
            >
              {moreLabel}
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-7xl px-6">
          <div className="h-px w-full bg-cyan-400/15">
            <div
              ref={barRef}
              className="h-px origin-left bg-gradient-to-r from-cyan-300 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

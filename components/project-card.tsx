'use client'

import Link from 'next/link'
import { useRef } from 'react'
import type { ProjectInfo } from '@/lib/types'

// Card with a cursor spotlight and HUD corner brackets on hover.
export default function ProjectCard({ info }: { info: ProjectInfo }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      href={`/${info.path}`}
      className="spotlight group relative block h-full rounded-sm border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 dark:border-cyan-400/15 dark:bg-ink-soft/80 dark:hover:border-cyan-400/45 dark:hover:shadow-[0_24px_80px_rgba(34,211,238,0.15)]"
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />

      <span className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-brand dark:text-accent">
        {info.type}
      </span>
      <h3 className="font-display mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand dark:text-slate-100 dark:group-hover:text-accent">
        {info.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {info.description}
      </p>
      <span
        className="font-mono mt-4 inline-block text-xs text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand dark:group-hover:text-accent"
        aria-hidden
      >
        -&gt;
      </span>
    </Link>
  )
}

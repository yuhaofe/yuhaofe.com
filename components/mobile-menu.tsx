'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type NavItem = { href: string; label: string }

// Collapsible navigation for small screens. The button's two strokes morph
// into an X; the panel drops below the header with numbered HUD-style rows.
export default function MobileMenu({
  items,
  label,
}: {
  items: NavItem[]
  label: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={label}
        aria-expanded={open}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-md text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-brand dark:text-slate-400 dark:hover:bg-slate-100/10 dark:hover:text-accent"
      >
        <span
          className={`h-px w-4 bg-current transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          aria-hidden
        />
        <span
          className={`h-px w-4 bg-current transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="animate-menu-drop absolute inset-x-0 top-full border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-ink/95">
          <nav className="container-site flex flex-col py-2">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-slate-200/70 py-3.5 text-sm text-slate-600 transition-colors last:border-0 hover:text-brand dark:border-slate-800 dark:text-slate-300 dark:hover:text-accent"
              >
                <span className="font-mono text-[0.65rem] text-slate-400 dark:text-slate-600">
                  0{i + 1}
                </span>
                {item.label}
                <span className="font-mono ml-auto text-xs text-slate-300 dark:text-slate-700" aria-hidden>
                  -&gt;
                </span>
              </Link>
            ))}
            <span className="font-mono flex gap-2 border-t border-slate-200/70 py-3.5 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <a href="/" className="transition-colors hover:text-brand dark:hover:text-accent">
                EN
              </a>
              <span>/</span>
              <a href="/zh-CN" className="transition-colors hover:text-brand dark:hover:text-accent">
                中
              </a>
            </span>
          </nav>
        </div>
      )}
    </div>
  )
}

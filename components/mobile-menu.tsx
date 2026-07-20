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
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-md text-[#7d93b2] transition-colors hover:bg-cyan-400/10 hover:text-cyan-300"
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
        <div className="animate-menu-drop absolute inset-x-0 top-full border-b border-cyan-400/15 bg-[#04101f]/95 backdrop-blur-md">
          <nav className="container-site flex flex-col py-2">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-cyan-400/10 py-3.5 text-sm text-[#9db4d0] transition-colors last:border-0 hover:text-cyan-300"
              >
                <span className="font-mono text-[0.65rem] text-cyan-500/60">
                  0{i + 1}
                </span>
                {item.label}
                <span className="font-mono ml-auto text-xs text-[#47586e]" aria-hidden>
                  -&gt;
                </span>
              </Link>
            ))}
            <span className="font-mono flex gap-2 border-t border-cyan-400/10 py-3.5 text-xs text-[#47586e]">
              <a href="/" className="transition-colors hover:text-cyan-300">
                EN
              </a>
              <span>/</span>
              <a href="/zh-CN" className="transition-colors hover:text-cyan-300">
                中
              </a>
            </span>
          </nav>
        </div>
      )}
    </div>
  )
}

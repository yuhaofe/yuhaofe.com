'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import MobileMenu from '@/components/mobile-menu'

type NavItem = { href: string; label: string }

// Fixed top navigation in the signal-lab style: transparent over the hero,
// blurring into a panel once the page scrolls.
export default function HeaderNav({
  items,
  menuLabel,
}: {
  items: NavItem[]
  menuLabel: string
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-cyan-400/15 bg-[#04101f]/60 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
      data-nosnippet
    >
      <nav className="font-mono-hud mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-xs tracking-widest">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
          <span className="text-gradient font-sans text-base font-bold tracking-tight">
            yuhaofe
          </span>
        </Link>
        <div className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 text-[#7d93b2] sm:flex">
            {items.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-cyan-300"
                >
                  <span className="mr-1 text-cyan-500/60">0{i + 1}/</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="hidden text-[#47586e] sm:inline">
            <a href="/" className="transition-colors hover:text-cyan-300">
              EN
            </a>
            <span className="mx-1">/</span>
            <a href="/zh-CN" className="transition-colors hover:text-cyan-300">
              中
            </a>
          </span>
          <MobileMenu items={items} label={menuLabel} />
        </div>
      </nav>
    </header>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import WaveCanvas from '@/components/wave-canvas'

/**
 * The immersive wave scene only backs the homepage. Subpages fall back to
 * the plain CSS gradient on <body> so long-form reading stays clean.
 */
export default function AmbientBackground() {
  const pathname = usePathname()
  if (pathname !== '/') {
    return null
  }
  return (
    <>
      <WaveCanvas />
      {/* readability scrim: dims the scene behind content, stronger top/bottom */}
      <div className="pointer-events-none fixed inset-0 z-[5] bg-gradient-to-b from-[#030b18]/85 via-[#030b18]/25 to-[#030b18]/85" />
      {/* atmosphere overlays */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[60]" />
      <div className="scanlines-overlay pointer-events-none fixed inset-0 z-[59]" />
    </>
  )
}

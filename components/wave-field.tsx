'use client'

import { useEffect, useRef } from 'react'

// A ridgeline wave field: stacked polylines whose peaks drift like the
// pulses of CP1919 — the pulsar whose radio waves became the Joy Division
// "Unknown Pleasures" cover. The homepage hero runs it full-bleed and
// interactive; subpage headers reuse it lighter (fewer lines, no pointer).
const DEFAULT_LINES = 44
const POINTS = 120

type RGB = [number, number, number]
type Palette = { bg: string; from: RGB; to: RGB }

const LIGHT: Palette = { bg: '#ffffff', from: [21, 96, 189], to: [12, 197, 201] }
const DARK: Palette = { bg: '#0a101c', from: [47, 128, 224], to: [34, 211, 238] }

export default function WaveField({
  className = '',
  lines = DEFAULT_LINES,
  interactive = true,
  strokeOnly = false,
  amplitude = 1,
  palette,
}: {
  className?: string
  lines?: number
  /** pointer swell on hover; disable for decorative headers */
  interactive?: boolean
  /** skip the silhouette fill so a colored background shows through */
  strokeOnly?: boolean
  /** wave height multiplier; >1 for short bands with few lines */
  amplitude?: number
  /** override the theme palettes (implies strokeOnly usage) */
  palette?: Palette
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const resolvePalette = () =>
      palette ?? (document.documentElement.classList.contains('dark') ? DARK : LIGHT)
    let pal = resolvePalette()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // eased pointer state: position in 0..1, amp fades in on hover
    const target = { x: 0.5, y: 0.5, amp: 0 }
    const pointer = { x: 0.5, y: 0.5, amp: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced) draw(0)
    }

    const stroke = (depth: number) => {
      const [r1, g1, b1] = pal.from
      const [r2, g2, b2] = pal.to
      const mix = (a: number, b: number) => Math.round(a + (b - a) * depth)
      return `rgba(${mix(r1, r2)},${mix(g1, g2)},${mix(b1, b2)},${0.22 + 0.68 * depth})`
    }

    const ridgePoint = (i: number, x: number, yBase: number, t: number, px: number, py: number) => {
      const depth = i / (lines - 1)
      const ampScale = (h / 480) * (0.35 + 0.65 * depth) * amplitude
      // two peaks per line drifting on independent phases, like pulses
      const p1 = w * (0.5 + 0.42 * Math.sin(t * 0.11 + i * 1.7))
      const p2 = w * (0.5 + 0.42 * Math.sin(t * 0.07 - i * 2.3 + 2))
      let y = yBase
      y -= Math.exp(-((x - p1) ** 2) / (2 * 90 ** 2)) * 52 * ampScale
      y -= Math.exp(-((x - p2) ** 2) / (2 * 55 ** 2)) * 30 * ampScale
      y -= Math.sin(x * 0.018 + t * 1.3 + i * 0.55) * 5 * ampScale
      if (interactive) {
        // pointer swell
        y -=
          pointer.amp *
          Math.exp(-((x - px) ** 2) / (2 * 80 ** 2)) *
          Math.exp(-((yBase - py) ** 2) / (2 * 110 ** 2)) *
          46
      }
      return y
    }

    const draw = (time: number) => {
      const t = time / 1000
      pointer.x += (target.x - pointer.x) * 0.08
      pointer.y += (target.y - pointer.y) * 0.08
      pointer.amp += (target.amp - pointer.amp) * 0.06

      ctx.clearRect(0, 0, w, h)
      const topPad = h * 0.16
      const field = h * 0.84
      const px = pointer.x * w
      const py = pointer.y * h

      // back to front: each line's silhouette occludes the lines behind it
      for (let i = 0; i < lines; i++) {
        const yBase = topPad + (i / (lines - 1)) * field
        const ridge = new Path2D()
        for (let j = 0; j <= POINTS; j++) {
          const x = (j / POINTS) * w
          const y = ridgePoint(i, x, yBase, t, px, py)
          if (j === 0) ridge.moveTo(x, y)
          else ridge.lineTo(x, y)
        }
        if (!strokeOnly) {
          const silhouette = new Path2D(ridge)
          silhouette.lineTo(w, h)
          silhouette.lineTo(0, h)
          silhouette.closePath()
          ctx.fillStyle = pal.bg
          ctx.fill(silhouette)
        }
        ctx.strokeStyle = stroke(i / (lines - 1))
        ctx.lineWidth = 1.4
        ctx.stroke(ridge)
      }
    }

    const loop = (time: number) => {
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    const host = canvas.parentElement ?? canvas
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = (e.clientY - rect.top) / rect.height
      target.amp = 1
    }
    const onPointerLeave = () => {
      target.amp = 0
    }
    if (interactive) {
      host.addEventListener('pointermove', onPointerMove)
      host.addEventListener('pointerleave', onPointerLeave)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // re-render with the new palette when the theme flips
    const themeObserver = new MutationObserver(() => {
      pal = resolvePalette()
      if (reduced) draw(0)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    resize()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      if (interactive) {
        host.removeEventListener('pointermove', onPointerMove)
        host.removeEventListener('pointerleave', onPointerLeave)
      }
      resizeObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [lines, interactive, strokeOnly, amplitude, palette])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}

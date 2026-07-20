// Minimalist waves motif for subpage headers: a handful of thin sine
// strokes with different periods, phases and drift speeds — a quiet,
// reading-friendly nod to the homepage ocean.
// Every path is 1200 units periodic, so the -50% drift loops seamlessly.
const LAYERS = [
  {
    d: 'M0,80 C150,20 450,20 600,80 S1050,140 1200,80 S1650,20 1800,80 S2250,140 2400,80',
    width: 1.4,
    opacity: 0.45,
    drift: 'wave-drift',
  },
  {
    d: 'M0,80 C150,140 450,140 600,80 S1050,20 1200,80 S1650,140 1800,80 S2250,20 2400,80',
    width: 1.1,
    opacity: 0.3,
    drift: 'wave-drift-slow',
  },
  {
    d: 'M0,80 C75,42 225,42 300,80 S525,118 600,80 S825,42 900,80 S1125,118 1200,80 S1425,42 1500,80 S1725,118 1800,80 S2025,42 2100,80 S2325,118 2400,80',
    width: 0.9,
    opacity: 0.22,
    drift: 'wave-drift-rev',
  },
  {
    d: 'M0,80 C200,50 400,50 600,80 S1000,110 1200,80 S1600,50 1800,80 S2200,110 2400,80',
    width: 0.8,
    opacity: 0.16,
    drift: 'wave-drift-slow',
  },
]

export default function WaveLines({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_75%,transparent),linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className}`}
      aria-hidden
    >
      <svg className="h-full w-[200%]" viewBox="0 0 2400 160" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient
            id="wave-lines-grad"
            x1="0"
            y1="0"
            x2="2400"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        {LAYERS.map(layer => (
          <g key={layer.d} className={layer.drift}>
            <path
              d={layer.d}
              stroke="url(#wave-lines-grad)"
              strokeWidth={layer.width}
              opacity={layer.opacity}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

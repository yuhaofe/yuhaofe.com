// Two sine-wave paths, each periodic at half the viewBox width so the
// translateX(-50%) animation loops seamlessly. They read both as ocean
// waves and as audio/signal waveforms — a pun on "waves".
const WAVE_MAIN =
  'M0 80 C100 20 200 20 300 80 C400 140 500 140 600 80 C700 20 800 20 900 80 C1000 140 1100 140 1200 80'
const WAVE_BACK =
  'M0 90 C100 45 200 45 300 90 C400 135 500 135 600 90 C700 45 800 45 900 90 C1000 135 1100 135 1200 90'

export default function WaveHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-70 sm:h-40"
        aria-hidden
      >
        <svg
          className="animate-wave-drift-slow absolute inset-0 h-full w-[200%] max-w-none text-brand-teal/40"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d={WAVE_BACK} stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <svg
          className="animate-wave-drift absolute inset-0 h-full w-[200%] max-w-none"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient
              id="hero-wave-gradient"
              x1="0"
              y1="0"
              x2="1200"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1560bd" />
              <stop offset="1" stopColor="#0cc5c9" />
            </linearGradient>
          </defs>
          <path d={WAVE_MAIN} stroke="url(#hero-wave-gradient)" strokeWidth="3" />
        </svg>
      </div>
      <h1 className="font-display relative text-5xl font-bold lowercase tracking-tight text-slate-900 sm:text-7xl">
        fly through the{' '}
        <span className="bg-gradient-to-r from-brand to-brand-teal bg-clip-text text-transparent">
          waves
        </span>
      </h1>
    </section>
  )
}

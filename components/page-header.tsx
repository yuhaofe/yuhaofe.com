import WaveLines from '@/components/wave-lines'

// Compact subpage header in the signal-lab style: a quiet wave-lines motif
// over the plain dark gradient. Extra top padding clears the fixed nav.
export default function PageHeader({
  label,
  title,
  meta,
}: {
  label: string
  title: string
  meta?: React.ReactNode
}) {
  return (
    <header className="relative overflow-hidden border-b border-cyan-400/10">
      <WaveLines className="absolute inset-x-0 bottom-0 h-20 opacity-70 sm:h-24" />
      <span className="pointer-events-none absolute left-4 top-20 h-3 w-3 border-l border-t border-cyan-400/30" aria-hidden />
      <span className="pointer-events-none absolute right-4 top-20 h-3 w-3 border-r border-t border-cyan-400/30" aria-hidden />
      <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-cyan-400/30" aria-hidden />
      <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-cyan-400/30" aria-hidden />

      <div className="container-site relative pb-14 pt-32 sm:pb-16 sm:pt-36">
        <p className="animate-fade-up font-mono-hud text-xs uppercase tracking-[0.4em] text-cyan-400/80">
          {label}
        </p>
        <h1
          className="animate-fade-up font-display mt-4 text-3xl font-bold tracking-tight text-cyan-50 sm:text-5xl"
          style={{ animationDelay: '120ms' }}
        >
          {title}
        </h1>
        {meta && (
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            {meta}
          </div>
        )}
      </div>
    </header>
  )
}

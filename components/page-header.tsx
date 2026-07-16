import WaveField from '@/components/wave-field'

// Compact subpage header: a light, non-interactive wave field behind the
// section label and title. The homepage hero carries the full version.
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
    <header className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
      <WaveField
        className="absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%)]"
        lines={8}
        interactive={false}
        amplitude={2.5}
      />
      <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-slate-400/50 dark:border-slate-600" aria-hidden />
      <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-slate-400/50 dark:border-slate-600" aria-hidden />
      <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-slate-400/50 dark:border-slate-600" aria-hidden />
      <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-slate-400/50 dark:border-slate-600" aria-hidden />

      <div className="container-site relative py-14 sm:py-16">
        <p className="animate-fade-up font-mono text-xs uppercase tracking-widest text-brand dark:text-accent">
          {label}
        </p>
        <h1
          className="animate-fade-up font-display mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl"
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

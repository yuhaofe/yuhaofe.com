import WaveField from '@/components/wave-field'
import { getTexts } from '@/lib/i18n'

export default function WaveHero({
  projectCount,
  postCount,
}: {
  projectCount: number
  postCount: number
}) {
  const texts = getTexts()
  const specs = [
    texts.specRole1,
    texts.specRole2,
    texts.specProjects.replace('{count}', String(projectCount)),
    texts.specPosts.replace('{count}', String(postCount)),
  ]
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
      {/* the wave field is the hero — interactive, fading in from the top */}
      <WaveField className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_22%)]" />

      {/* HUD corner brackets framing the composition */}
      <span className="pointer-events-none absolute left-4 top-4 z-10 h-4 w-4 border-l border-t border-slate-400/50 dark:border-slate-600" aria-hidden />
      <span className="pointer-events-none absolute right-4 top-4 z-10 h-4 w-4 border-r border-t border-slate-400/50 dark:border-slate-600" aria-hidden />
      <span className="pointer-events-none absolute bottom-4 left-4 z-10 h-4 w-4 border-b border-l border-slate-400/50 dark:border-slate-600" aria-hidden />
      <span className="pointer-events-none absolute bottom-4 right-4 z-10 h-4 w-4 border-b border-r border-slate-400/50 dark:border-slate-600" aria-hidden />

      {/* vertical signal annotation — CP1919, the pulsar behind the idea */}
      <p
        className="font-mono pointer-events-none absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 [writing-mode:vertical-rl] dark:text-slate-500 lg:block"
        aria-hidden
      >
        sig // cp1919 · radio waves
      </p>

      <div className="container-site pointer-events-none relative z-10 flex min-h-[82vh] flex-col py-24">
        <div className="my-auto">
          <p className="animate-fade-up font-mono flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {texts.heroKicker}
          </p>
          <h1
            className="animate-fade-up font-display mt-5 text-6xl font-bold lowercase tracking-tight text-slate-900 dark:text-slate-100 sm:text-8xl [&_em]:not-italic [&_em]:bg-gradient-to-r [&_em]:from-brand [&_em]:to-brand-teal [&_em]:bg-clip-text [&_em]:text-transparent"
            style={{ animationDelay: '120ms' }}
            dangerouslySetInnerHTML={{ __html: texts.heroTitle }}
          />
        </div>

        {/* spec readout bar */}
        <div
          className="animate-fade-up flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-200/80 pt-4 font-mono text-[0.7rem] uppercase tracking-widest text-slate-400 dark:border-slate-800 dark:text-slate-500"
          style={{ animationDelay: '240ms' }}
        >
          {specs.map(spec => (
            <span key={spec} className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>+</span>
              {spec}
            </span>
          ))}
          {/* scroll cue */}
          <span className="ml-auto flex items-center gap-2" aria-hidden>
            scroll
            <span className="relative h-6 w-px overflow-hidden bg-slate-300 dark:bg-slate-700">
              <span className="animate-scroll-dot absolute left-0 top-0 h-2 w-px bg-accent" />
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

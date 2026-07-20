import Link from 'next/link'
import Parallax from '@/components/parallax'
import Reveal from '@/components/reveal'
import SplitText from '@/components/split-text'

export default function HomeAbout({
  label,
  title,
  aboutMeHtml,
  roles,
  stats,
  moreLabel,
}: {
  label: string
  title: string
  aboutMeHtml: string
  roles: string[]
  stats: { label: string; value: string }[]
  moreLabel: string
}) {
  return (
    <section id="about" className="relative mx-auto max-w-7xl overflow-visible px-6 py-40">
      {/* background index number */}
      <Parallax speed={0.25} className="pointer-events-none absolute -top-6 right-0 hidden lg:block">
        <span className="text-outline select-none text-[14rem] font-bold leading-none opacity-30">
          03
        </span>
      </Parallax>

      <Reveal>
        <p className="font-mono-hud text-xs uppercase tracking-[0.4em] text-cyan-400/80">
          {label}
        </p>
        <SplitText
          as="h2"
          text={title}
          stagger={18}
          className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
        />
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-5">
        <Reveal delay={120} className="md:col-span-3">
          <Parallax speed={-0.04}>
            <div
              className="space-y-5 text-sm leading-relaxed text-[#9db4d0] sm:text-base [&_em]:not-italic [&_em]:text-cyan-300"
              dangerouslySetInnerHTML={{ __html: aboutMeHtml }}
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map(role => (
                <span
                  key={role}
                  className="font-mono-hud rounded-sm border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-[11px] uppercase tracking-wider text-cyan-200/80"
                >
                  {role}
                </span>
              ))}
            </div>

            <Link
              href="/about"
              className="font-mono-hud mt-10 inline-block text-xs tracking-[0.3em] text-[#7d93b2] transition-colors hover:text-cyan-300"
            >
              {moreLabel}
            </Link>
          </Parallax>
        </Reveal>

        <Reveal delay={240} className="md:col-span-2">
          <Parallax speed={0.08}>
            <div className="hud-panel scanline p-6">
              <p className="font-mono-hud mb-5 text-[10px] tracking-[0.3em] text-[#7d93b2]">
                ▚ SYSTEM TELEMETRY
              </p>
              <dl className="font-mono-hud space-y-4">
                {stats.map(s => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between border-b border-cyan-400/10 pb-3"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-[#7d93b2]">
                      {s.label}
                    </dt>
                    <dd className="text-glow text-lg text-cyan-300">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  )
}

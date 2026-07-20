import { getTexts } from '@/lib/i18n'

export default function SiteFooter() {
  const texts = getTexts()
  return (
    <footer
      className="relative border-t border-cyan-400/10 px-6 py-10"
      data-nosnippet
    >
      <div className="font-mono-hud mx-auto flex max-w-6xl flex-col gap-4 text-[11px] tracking-[0.2em] text-[#47586e]">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="flex items-center gap-2">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
            <span dangerouslySetInnerHTML={{ __html: texts.copyright }} />
          </span>
          <span className="text-cyan-400/60">the waves never rest</span>
          <span>EOF ▮</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 border-t border-cyan-400/10 pt-4 sm:justify-start [&_a]:underline [&_a]:decoration-[#47586e] [&_a:hover]:text-cyan-300">
          <span dangerouslySetInnerHTML={{ __html: texts.built }} />
          <span dangerouslySetInnerHTML={{ __html: texts.hosted }} />
          <span dangerouslySetInnerHTML={{ __html: texts.follow }} />
        </div>
      </div>
    </footer>
  )
}

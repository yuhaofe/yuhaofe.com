import { getTexts } from '@/lib/i18n'

export default function SiteFooter() {
  const texts = getTexts()
  return (
    <footer
      className="border-t border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-ink-soft"
      data-nosnippet
    >
      <div className="container-site flex flex-col gap-2 py-10 font-mono text-xs leading-6 text-slate-500 dark:text-slate-400 [&_a]:underline [&_a]:decoration-slate-300 dark:[&_a]:decoration-slate-600 [&_a:hover]:text-brand dark:[&_a:hover]:text-accent">
        <span className="flex items-center gap-2">
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <span dangerouslySetInnerHTML={{ __html: texts.copyright }} />
        </span>
        <div className="flex flex-wrap gap-x-6">
          <span dangerouslySetInnerHTML={{ __html: texts.built }} />
          <span dangerouslySetInnerHTML={{ __html: texts.hosted }} />
          <span dangerouslySetInnerHTML={{ __html: texts.follow }} />
        </div>
      </div>
    </footer>
  )
}

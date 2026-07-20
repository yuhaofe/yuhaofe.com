import type { TocItem } from '@/lib/types'

export default function PostToc({ toc, title }: { toc: TocItem[]; title: string }) {
  if (toc.length === 0) {
    return null
  }
  return (
    <nav className="mb-10 lg:order-2 lg:sticky lg:top-20 lg:mb-0 lg:max-h-[calc(100vh-6rem)] lg:w-52 lg:shrink-0 lg:self-start lg:overflow-auto">
      <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {title}
      </p>
      <ol className="mt-3 space-y-2 border-l border-slate-200 text-sm dark:border-cyan-400/10">
        {toc.map(h2 => (
          <li key={h2.text}>
            <a
              href={`#${h2.text}`}
              className="-ml-px block border-l-2 border-transparent pl-4 text-slate-500 transition-colors hover:border-brand hover:text-brand dark:text-slate-400 dark:hover:border-accent dark:hover:text-accent"
            >
              {h2.text}
            </a>
            {h2.children.length > 0 && (
              <ol className="mt-2 space-y-2">
                {h2.children.map(h3 => (
                  <li key={h3.text}>
                    <a
                      href={`#${h3.text}`}
                      className="block pl-8 text-slate-400 transition-colors hover:text-brand dark:text-slate-500 dark:hover:text-accent"
                    >
                      {h3.text}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

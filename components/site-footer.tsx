import { getTexts } from '@/lib/i18n'

export default function SiteFooter() {
  const texts = getTexts()
  return (
    <footer className="mt-24 border-t border-slate-200/60" data-nosnippet>
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 [&_a]:underline [&_a]:decoration-slate-300 [&_a:hover]:text-brand">
        <span dangerouslySetInnerHTML={{ __html: texts.copyright }} />
        <div className="flex flex-wrap gap-x-6">
          <span dangerouslySetInnerHTML={{ __html: texts.designed }} />
          <span dangerouslySetInnerHTML={{ __html: texts.built }} />
          <span dangerouslySetInnerHTML={{ __html: texts.hosted }} />
        </div>
        <span dangerouslySetInnerHTML={{ __html: texts.follow }} />
      </div>
    </footer>
  )
}

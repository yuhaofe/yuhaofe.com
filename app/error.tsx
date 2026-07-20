'use client'

import { useEffect } from 'react'
import { getTextsFor } from '@/lib/i18n'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  // NEXT_LOCALE is not exposed to client bundles; recover the locale from
  // the <html lang> attribute rendered by the root layout.
  const texts = getTextsFor(
    typeof document !== 'undefined' && document.documentElement.lang === 'zh-CN'
      ? 'zh-CN'
      : 'en'
  )

  return (
    <section className="container-site animate-fade-up pb-24 pt-40 text-center">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">{texts.error500}</h1>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-gradient-to-r from-brand to-brand-teal px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        {texts.errorRetry}
      </button>
    </section>
  )
}

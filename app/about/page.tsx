import type { Metadata } from 'next'
import { getTexts } from '@/lib/i18n'

export function generateMetadata(): Metadata {
  const texts = getTexts()
  return {
    title: texts.about,
    openGraph: {
      url: 'https://yuhaofe.com/about',
    },
  }
}

export default function About() {
  const texts = getTexts()
  return (
    <article
      className="mt-12 leading-7 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-brand [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_p]:mt-4"
      dangerouslySetInnerHTML={{ __html: texts.aboutMe }}
    />
  )
}

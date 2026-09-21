import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
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
    <>
      <PageHeader label={texts.aboutSection} title={texts.about} />
      <section>
        <div className="container-site animate-fade-up py-16 sm:py-20" style={{ animationDelay: '240ms' }}>
          <article
            className="leading-7 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-brand dark:[&_em]:text-accent [&_p]:mt-4 [&_p]:max-w-2xl first:[&_p]:mt-0"
            dangerouslySetInnerHTML={{ __html: texts.aboutMe }}
          />
        </div>
      </section>
    </>
  )
}

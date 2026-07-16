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
        <div className="container-site py-16 sm:py-20">
          <div className="sm:flex sm:items-center sm:gap-14">
            <article
              className="min-w-0 flex-1 leading-7 [&_em]:not-italic [&_em]:font-semibold [&_em]:text-brand dark:[&_em]:text-accent [&_p]:mt-4 [&_p]:max-w-2xl first:[&_p]:mt-0"
              dangerouslySetInnerHTML={{ __html: texts.aboutMe }}
            />
            {/* line-art avatar on a white canvas: multiply erases the white
                on light bg; invert+hue-rotate+screen does the same on dark,
                keeping the strokes blue-teal but lighter */}
            <img
              src="/avatar.png"
              alt="yuhaofe avatar"
              className="mx-auto mt-10 w-40 shrink-0 mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180 sm:mx-0 sm:mt-0 sm:w-56"
            />
          </div>
        </div>
      </section>
    </>
  )
}

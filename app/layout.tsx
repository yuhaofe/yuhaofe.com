import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import { getLocale, getTexts } from '@/lib/i18n'
import './global.css'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export function generateMetadata(): Metadata {
  const texts = getTexts()
  return {
    title: {
      default: texts.title,
      template: '%s - yuhaofe',
    },
    description: texts.description,
    openGraph: {
      title: texts.title,
      description: texts.description,
      type: 'website',
      url: 'https://yuhaofe.com/',
      images: 'https://yuhaofe.com/banner.jpg',
    },
    twitter: {
      card: 'summary_large_image',
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={getLocale()}
      prefix="og: https://ogp.me/ns#"
      className={displayFont.variable}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

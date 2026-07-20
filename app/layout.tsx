import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import AmbientBackground from '@/components/ambient-background'
import Cursor from '@/components/cursor'
import Preloader from '@/components/preloader'
import ScrollProgress from '@/components/scroll-progress'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import SmoothScroll from '@/components/smooth-scroll'
import { getLocale, getTexts } from '@/lib/i18n'
import './global.css'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
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
      // The site is fixed to the dark signal-lab theme for now.
      className={`dark ${displayFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <Preloader />
        <Cursor />
        <SmoothScroll />
        <AmbientBackground />
        <SiteHeader />
        <ScrollProgress />
        <main className="relative z-10 w-full flex-1">{children}</main>
        <div className="relative z-10">
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

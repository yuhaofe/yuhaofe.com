import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
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

// Applies the persisted/system theme before first paint to avoid a flash.
// Must stay in sync with components/theme-toggle.tsx.
const themeBootstrap = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

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
      className={`${displayFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="w-full flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

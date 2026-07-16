import Link from 'next/link'
import { getTexts } from '@/lib/i18n'

export default function SiteHeader() {
  const texts = getTexts()
  const nav = [
    { href: '/', label: texts.home },
    { href: '/projects', label: texts.projects },
    { href: '/blog', label: texts.blog },
    { href: '/about', label: texts.about },
  ]
  return (
    <header
      className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur"
      data-nosnippet
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-5 px-4">
        <Link
          href="/"
          className="font-display bg-gradient-to-r from-brand to-brand-teal bg-clip-text text-xl font-bold tracking-tight text-transparent"
        >
          yuhaofe
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="ml-auto text-sm text-slate-400">
          <a href="/" className="transition-colors hover:text-brand">
            EN
          </a>
          <span className="mx-1">/</span>
          <a href="/zh-CN" className="transition-colors hover:text-brand">
            中
          </a>
        </span>
      </div>
    </header>
  )
}

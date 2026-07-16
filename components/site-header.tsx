import Link from 'next/link'
import MobileMenu from '@/components/mobile-menu'
import ThemeToggle from '@/components/theme-toggle'
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
      className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-ink/85"
      data-nosnippet
    >
      <div className="container-site flex h-14 items-center gap-6">
        <Link
          href="/"
          className="font-display bg-gradient-to-r from-brand to-brand-teal bg-clip-text text-xl font-bold tracking-tight text-transparent"
        >
          yuhaofe
        </Link>
        {/* desktop nav */}
        <nav className="hidden items-center gap-4 text-sm text-slate-500 dark:text-slate-400 sm:flex sm:gap-5">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 transition-colors hover:text-brand dark:hover:text-accent"
            >
              <span className="font-mono mr-1 text-[0.65rem] text-slate-400 transition-colors group-hover:text-accent dark:text-slate-600">
                0{i + 1}
              </span>
              {item.label}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-teal transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
              />
            </Link>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <ThemeToggle label={texts.themeToggle} />
          <span className="font-mono hidden text-xs sm:inline">
            <a href="/" className="transition-colors hover:text-brand dark:hover:text-accent">
              EN
            </a>
            <span className="mx-1">/</span>
            <a
              href="/zh-CN"
              className="transition-colors hover:text-brand dark:hover:text-accent"
            >
              中
            </a>
          </span>
          <MobileMenu items={nav} label={texts.menuToggle} />
        </span>
      </div>
    </header>
  )
}

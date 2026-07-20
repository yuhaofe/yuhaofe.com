import HeaderNav from '@/components/header-nav'
import { getTexts } from '@/lib/i18n'

export default function SiteHeader() {
  const texts = getTexts()
  const nav = [
    { href: '/', label: texts.home },
    { href: '/projects', label: texts.projects },
    { href: '/blog', label: texts.blog },
    { href: '/about', label: texts.about },
  ]
  return <HeaderNav items={nav} menuLabel={texts.menuToggle} />
}

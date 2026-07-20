import { getTexts } from '@/lib/i18n'

export default function NotFound() {
  const texts = getTexts()
  return (
    <section className="container-site animate-fade-up pb-24 pt-40 text-center">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">{texts.error404}</h1>
    </section>
  )
}

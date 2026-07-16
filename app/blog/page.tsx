import type { Metadata } from 'next'
import PostList from '@/components/post-list'
import { getTexts } from '@/lib/i18n'
import { getAllPosts } from '@/lib/notion'

export function generateMetadata(): Metadata {
  const texts = getTexts()
  return {
    title: texts.blog,
    openGraph: {
      url: 'https://yuhaofe.com/blog',
    },
  }
}

export default async function Blog() {
  const texts = getTexts()
  const posts = await getAllPosts()

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-slate-900">{texts.blog}</h2>
      <div className="mt-6">
        <PostList posts={posts} viewMore={texts.viewMore} />
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
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
    <>
      <PageHeader label={texts.blogSection} title={texts.blog} />
      <section>
        <div className="container-site animate-fade-up py-16 sm:py-20" style={{ animationDelay: '240ms' }}>
          <PostList posts={posts} />
        </div>
      </section>
    </>
  )
}

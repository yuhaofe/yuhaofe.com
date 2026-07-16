import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NotionRenderer, { extractToc } from '@/components/notion-renderer'
import PostToc from '@/components/post-toc'
import { getTexts } from '@/lib/i18n'
import { getAllPosts, getPostBySlug } from '@/lib/notion'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {}
  }
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      url: `https://yuhaofe.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }
  const texts = getTexts()
  const toc = extractToc(post.blocks)

  return (
    <article className="mt-12">
      <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-slate-400">
        <time dateTime={`${post.date} 00:00`}>{post.date}</time> by yuhaofe
      </p>
      <div className="mt-10 lg:flex lg:gap-10">
        <PostToc toc={toc} title={texts.toc} />
        <div className="min-w-0 flex-1">
          <NotionRenderer blocks={post.blocks} />
        </div>
      </div>
    </article>
  )
}

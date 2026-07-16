import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NotionRenderer, { extractToc } from '@/components/notion-renderer'
import PageHeader from '@/components/page-header'
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
    <article>
      <PageHeader
        label={texts.blogSection}
        title={post.title}
        meta={
          <p className="font-mono mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            <time dateTime={`${post.date} 00:00`}>{post.date}</time>
            <span aria-hidden>·</span> by yuhaofe
          </p>
        }
      />
      <div className="container-site py-12">
        <div className="lg:flex lg:gap-10">
          <PostToc toc={toc} title={texts.toc} />
          <div className="min-w-0 flex-1 lg:order-1">
            <NotionRenderer blocks={post.blocks} />
          </div>
        </div>
      </div>
    </article>
  )
}

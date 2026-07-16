import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

export default function PostList({
  posts,
  viewMore,
}: {
  posts: PostMeta[]
  viewMore: string
}) {
  return (
    <ul className="space-y-8">
      {posts.map(post => (
        <li key={post.slug} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
          <time
            dateTime={`${post.date} 00:00`}
            className="w-28 shrink-0 pt-0.5 text-sm text-slate-400"
          >
            {post.date}
          </time>
          <div>
            <Link
              href={`/blog/${post.slug}`}
              className="font-medium text-slate-900 transition-colors hover:text-brand"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm leading-6 text-slate-500">{post.summary}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-1 inline-block text-sm text-brand hover:underline"
            >
              {viewMore}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

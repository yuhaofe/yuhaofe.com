import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="border-t border-slate-200 dark:border-slate-800">
      {posts.map(post => (
        <li
          key={post.slug}
          className="group border-b border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-ink-soft"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-1 px-2 py-5 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <time
              dateTime={`${post.date} 00:00`}
              className="font-mono w-28 shrink-0 text-xs text-slate-400 dark:text-slate-500"
            >
              {post.date}
            </time>
            <span className="min-w-0 flex-1">
              <span className="font-medium text-slate-900 transition-colors group-hover:text-brand dark:text-slate-100 dark:group-hover:text-accent">
                {post.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-500 dark:text-slate-400">
                {post.summary}
              </span>
            </span>
            <span
              className="font-mono hidden shrink-0 text-xs text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand dark:group-hover:text-accent sm:inline"
              aria-hidden
            >
              -&gt;
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

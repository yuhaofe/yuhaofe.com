import Link from 'next/link'
import Parallax from '@/components/parallax'
import Reveal from '@/components/reveal'
import SplitText from '@/components/split-text'
import type { PostMeta } from '@/lib/types'

export default function HomeBlog({
  label,
  title,
  posts,
  moreLabel,
}: {
  label: string
  title: string
  posts: PostMeta[]
  moreLabel: string
}) {
  return (
    <section id="blog" className="relative mx-auto max-w-7xl px-6 py-40">
      <Parallax speed={0.22} className="pointer-events-none absolute -top-4 left-0 hidden lg:block">
        <span className="text-outline select-none text-[14rem] font-bold leading-none opacity-30">
          02
        </span>
      </Parallax>

      <Reveal>
        <p className="font-mono-hud text-xs uppercase tracking-[0.4em] text-cyan-400/80">
          {label}
        </p>
        <SplitText
          as="h2"
          text={title}
          stagger={18}
          className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl"
        />
      </Reveal>

      <div className="mt-16">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 100}>
            <Link href={`/blog/${post.slug}`} className="group block" data-cursor>
              <article className="relative grid items-baseline gap-3 border-t border-cyan-400/10 py-8 transition-colors duration-300 hover:bg-cyan-400/[0.03] sm:grid-cols-[110px_1fr_auto] sm:gap-8">
                <span className="text-outline font-mono-hud text-3xl font-bold transition-colors duration-300 group-hover:text-cyan-300 sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-100 transition-all duration-300 group-hover:translate-x-2 group-hover:text-cyan-300 sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9db4d0]">
                    {post.summary}
                  </p>
                </div>
                <div className="font-mono-hud text-xs text-[#7d93b2] sm:text-right">
                  <time dateTime={`${post.date} 00:00`} className="text-cyan-300">
                    {post.date}
                  </time>
                </div>
              </article>
            </Link>
          </Reveal>
        ))}
        <div className="flex justify-end border-t border-cyan-400/10 pt-6">
          <Link
            href="/blog"
            className="font-mono-hud text-xs tracking-[0.3em] text-[#7d93b2] transition-colors hover:text-cyan-300"
          >
            {moreLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

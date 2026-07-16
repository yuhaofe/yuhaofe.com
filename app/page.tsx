import Link from 'next/link'
import PostList from '@/components/post-list'
import ProjectCard from '@/components/project-card'
import Reveal from '@/components/reveal'
import WaveHero from '@/components/wave-hero'
import { getTexts } from '@/lib/i18n'
import { getAllPosts } from '@/lib/notion'
import { getAllProjects } from '@/lib/projects'

export default async function Home() {
  const texts = getTexts()
  const allProjects = await getAllProjects()
  const projects = allProjects.slice(0, 4)
  const posts = await getAllPosts()

  return (
    <>
      <WaveHero projectCount={allProjects.length} postCount={posts.length} />

      <section className="border-b border-slate-200/80 dark:border-slate-800">
        <div className="container-site py-16 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <p className="font-mono shrink-0 text-xs uppercase tracking-widest text-brand dark:text-accent">
                {texts.projectsSection}
              </p>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" aria-hidden />
              <Link
                href="/projects"
                className="font-mono shrink-0 text-xs text-slate-400 transition-colors hover:text-brand dark:hover:text-accent"
              >
                {texts.viewAllProjects}
              </Link>
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              {texts.projects}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {projects.map((info, i) => (
              <Reveal key={info.path} delay={i * 90}>
                <ProjectCard info={info} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-site py-16 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <p className="font-mono shrink-0 text-xs uppercase tracking-widest text-brand dark:text-accent">
                {texts.blogSection}
              </p>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" aria-hidden />
              <Link
                href="/blog"
                className="font-mono shrink-0 text-xs text-slate-400 transition-colors hover:text-brand dark:hover:text-accent"
              >
                {texts.viewAllPosts}
              </Link>
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              {texts.blog}
            </h2>
          </Reveal>
          <div className="mt-10">
            <PostList posts={posts} />
          </div>
        </div>
      </section>
    </>
  )
}

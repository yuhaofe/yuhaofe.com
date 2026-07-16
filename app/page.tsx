import Link from 'next/link'
import PostList from '@/components/post-list'
import ProjectCard from '@/components/project-card'
import WaveHero from '@/components/wave-hero'
import { getTexts } from '@/lib/i18n'
import { getAllPosts } from '@/lib/notion'
import { getAllProjects } from '@/lib/projects'

export default async function Home() {
  const texts = getTexts()
  const projects = (await getAllProjects()).slice(0, 4)
  const posts = await getAllPosts()

  return (
    <>
      <WaveHero />
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-slate-900">{texts.projects}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map(info => (
            <ProjectCard key={info.path} info={info} />
          ))}
        </div>
        <Link href="/projects" className="mt-4 inline-block text-sm text-brand hover:underline">
          {texts.viewAllProjects}
        </Link>
      </section>
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-slate-900">{texts.blog}</h2>
        <div className="mt-6">
          <PostList posts={posts} viewMore={texts.viewMore} />
        </div>
        <Link href="/blog" className="mt-4 inline-block text-sm text-brand hover:underline">
          {texts.viewAllPosts}
        </Link>
      </section>
    </>
  )
}

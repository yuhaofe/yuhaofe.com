import type { Metadata } from 'next'
import ProjectCard from '@/components/project-card'
import { getTexts } from '@/lib/i18n'
import { getAllProjects } from '@/lib/projects'

export function generateMetadata(): Metadata {
  const texts = getTexts()
  return {
    title: texts.projects,
    openGraph: {
      url: 'https://yuhaofe.com/projects',
    },
  }
}

export default async function Projects() {
  const texts = getTexts()
  const projects = await getAllProjects()

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-slate-900">{texts.projects}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map(info => (
          <ProjectCard key={info.path} info={info} />
        ))}
      </div>
    </section>
  )
}

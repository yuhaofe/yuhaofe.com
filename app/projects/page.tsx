import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
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
    <>
      <PageHeader label={texts.projectsSection} title={texts.projects} />
      <section>
        <div className="container-site animate-fade-up py-16 sm:py-20" style={{ animationDelay: '240ms' }}>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map(info => (
              <ProjectCard key={info.path} info={info} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

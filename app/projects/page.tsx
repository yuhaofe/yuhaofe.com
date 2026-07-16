import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import ProjectCard from '@/components/project-card'
import Reveal from '@/components/reveal'
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
        <div className="container-site py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((info, i) => (
              <Reveal key={info.path} delay={i * 90}>
                <ProjectCard info={info} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

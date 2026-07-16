import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import IdleDetectionExample from '@/components/idle-detection-example'
import StoreLinks from '@/components/store-links'
import { getProjectByPath, getAllProjects } from '@/lib/projects'

const mdxComponents = { IdleDetectionExample }

type Params = { project: string }

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await getAllProjects()
  return projects.map(p => ({ project: p.path }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { project } = await params
  const data = await getProjectByPath(project)
  if (!data) {
    return {}
  }
  return {
    title: data.info.title,
    description: data.info.description,
    openGraph: {
      url: `https://yuhaofe.com/${data.info.path}`,
    },
  }
}

export default async function Project({ params }: { params: Promise<Params> }) {
  const { project } = await params
  const data = await getProjectByPath(project)
  if (!data) {
    notFound()
  }
  const { content, info } = data

  return (
    <>
      <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand to-brand-teal p-8 text-white sm:p-10">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{info.title}</h1>
        <p className="mt-3 max-w-xl leading-7 text-white/85">{info.description}</p>
        <StoreLinks links={info.links} />
      </div>
      <section className="mt-10 leading-7 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_img]:my-2 [&_p]:my-4">
        <MDXRemote source={content} components={mdxComponents} options={{ scope: info }} />
      </section>
    </>
  )
}

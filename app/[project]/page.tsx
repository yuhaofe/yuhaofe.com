import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import IdleDetectionExample from '@/components/idle-detection-example'
import StoreLinks from '@/components/store-links'
import WaveField from '@/components/wave-field'
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
      <header className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-teal text-white">
        <WaveField
          className="absolute inset-0 h-full w-full opacity-40"
          lines={8}
          interactive={false}
          strokeOnly
          amplitude={2}
          palette={{ bg: 'transparent', from: [255, 255, 255], to: [255, 255, 255] }}
        />
        <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-white/40" aria-hidden />
        <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-white/40" aria-hidden />
        <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/40" aria-hidden />
        <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/40" aria-hidden />
        <div className="container-site relative py-16 sm:py-24">
          <h1 className="font-display text-3xl font-bold sm:text-5xl">{info.title}</h1>
          <p className="mt-4 max-w-xl leading-7 text-white/85">{info.description}</p>
          <StoreLinks links={info.links} />
        </div>
      </header>
      <section className="container-site py-12 leading-7 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-slate-100 [&_img]:my-2 [&_img]:mr-2 [&_img]:inline-block [&_p]:my-4">
        <MDXRemote source={content} components={mdxComponents} options={{ scope: info }} />
      </section>
    </>
  )
}

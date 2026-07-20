import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import IdleDetectionExample from '@/components/idle-detection-example'
import StoreLinks from '@/components/store-links'
import WaveLines from '@/components/wave-lines'
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
      <header className="relative overflow-hidden border-b border-cyan-400/10">
        <WaveLines className="absolute inset-x-0 bottom-0 h-24 opacity-70 sm:h-28" />
        <span className="pointer-events-none absolute left-4 top-20 h-4 w-4 border-l border-t border-cyan-400/30" aria-hidden />
        <span className="pointer-events-none absolute right-4 top-20 h-4 w-4 border-r border-t border-cyan-400/30" aria-hidden />
        <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-cyan-400/30" aria-hidden />
        <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-cyan-400/30" aria-hidden />
        <div className="container-site relative pb-16 pt-32 sm:pb-20 sm:pt-40">
          <p className="font-mono-hud animate-fade-up text-xs uppercase tracking-[0.4em] text-cyan-400/80">
            {info.type}
          </p>
          <h1 className="font-display animate-fade-up mt-4 text-3xl font-bold tracking-tight text-cyan-50 sm:text-5xl" style={{ animationDelay: '120ms' }}>
            {info.title}
          </h1>
          <p className="animate-fade-up mt-4 max-w-xl leading-7 text-[#9db4d0]" style={{ animationDelay: '200ms' }}>
            {info.description}
          </p>
          <StoreLinks links={info.links} />
        </div>
      </header>
      <section className="container-site animate-fade-up py-12 leading-7 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-slate-100 [&_img]:my-2 [&_img]:mr-2 [&_img]:inline-block [&_p]:my-4" style={{ animationDelay: '240ms' }}>
        <MDXRemote source={content} components={mdxComponents} options={{ scope: info }} />
      </section>
    </>
  )
}

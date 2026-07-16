import Link from 'next/link'
import type { ProjectInfo } from '@/lib/types'

export default function ProjectCard({ info }: { info: ProjectInfo }) {
  return (
    <Link
      href={`/${info.path}`}
      className="group flex flex-col rounded-xl border border-slate-200 p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10"
    >
      <span className="w-fit rounded-full bg-gradient-to-r from-brand/10 to-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand">
        {info.type}
      </span>
      <h3 className="font-display mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand">
        {info.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{info.description}</p>
    </Link>
  )
}

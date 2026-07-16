import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getLocale } from './i18n'
import type { ProjectInfo } from './types'

function projectsDir(): string {
  return path.join(process.cwd(), 'projects', getLocale())
}

export async function getAllProjects(): Promise<ProjectInfo[]> {
  const names = await fs.readdir(projectsDir())
  const infos = await Promise.all(
    names
      .filter(name => name.endsWith('.mdx'))
      .map(async name => {
        const source = await fs.readFile(path.join(projectsDir(), name), 'utf8')
        const { data } = matter(source)
        return data as ProjectInfo
      })
  )
  return infos.sort((p1, p2) => p1.order.localeCompare(p2.order))
}

export async function getProjectByPath(
  projectPath: string
): Promise<{ content: string; info: ProjectInfo } | null> {
  const names = await fs.readdir(projectsDir())
  const name = names.find(n => path.parse(n).name === projectPath)
  if (!name) {
    return null
  }
  const source = await fs.readFile(path.join(projectsDir(), name), 'utf8')
  const { content, data } = matter(source)
  return { content, info: data as ProjectInfo }
}

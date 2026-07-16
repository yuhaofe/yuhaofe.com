export type Locale = 'en' | 'zh-CN'

export type ProjectInfo = {
  path: string
  title: string
  description: string
  type: string
  order: string
  links: string[]
}

export type PostMeta = {
  id: string
  title: string
  date: string
  slug: string
  summary: string
}

export type TocItem = {
  text: string
  children: TocItem[]
}

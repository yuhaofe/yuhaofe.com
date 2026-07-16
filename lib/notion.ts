import { Client } from '@notionhq/client'
import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client'
import { getLocale } from './i18n'
import type { PostMeta } from './types'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID as string

let postsCache: PostMeta[] | null = null
let dataSourceIdCache: string | null = null

// Notion API 2025-09-16: a database is a container of data sources,
// queries run against a data source instead of the database itself.
async function getDataSourceId(): Promise<string> {
  if (dataSourceIdCache) {
    return dataSourceIdCache
  }
  const db = await notion.databases.retrieve({ database_id: databaseId })
  const dataSources = (db as unknown as { data_sources?: { id: string }[] }).data_sources
  dataSourceIdCache = dataSources?.[0]?.id ?? databaseId
  return dataSourceIdCache
}

type RichTextLike = { plain_text: string }[] | undefined

function richTextToPlain(arr: RichTextLike): string {
  return (arr ?? []).map(t => t.plain_text).join('')
}

interface PagePropertiesLike {
  title?: { title: RichTextLike }
  post_time?: { date: { start: string } | null }
  slug?: { rich_text: RichTextLike }
  summary?: { rich_text: RichTextLike }
}

function pageToPostMeta(page: PageObjectResponse): PostMeta {
  const props = page.properties as unknown as PagePropertiesLike
  return {
    id: page.id,
    title: richTextToPlain(props.title?.title),
    date: props.post_time?.date?.start ?? '',
    slug: richTextToPlain(props.slug?.rich_text),
    summary: richTextToPlain(props.summary?.rich_text),
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (postsCache) {
    return postsCache
  }
  const dataSourceId = await getDataSourceId()
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: 'public', checkbox: { equals: true } },
        { property: 'lang', select: { equals: getLocale() } },
      ],
    },
    sorts: [{ property: 'post_time', direction: 'descending' }],
  })
  postsCache = (response.results as PageObjectResponse[]).map(pageToPostMeta)
  return postsCache
}

export interface Post extends PostMeta {
  blocks: BlockObjectResponse[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  const post = posts.find(p => p.slug === slug)
  if (!post) {
    return null
  }
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined
  do {
    const res = await notion.blocks.children.list({
      block_id: post.id,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...(res.results as BlockObjectResponse[]))
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)
  return { ...post, blocks }
}

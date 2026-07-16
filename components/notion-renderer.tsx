import { Fragment } from 'react'
import type { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client'
import type { TocItem } from '@/lib/types'

function plainText(richText: RichTextItemResponse[]): string {
  return richText.map(t => t.plain_text).join('')
}

function renderRichText(richText: RichTextItemResponse[]) {
  return richText.map((t, i) => {
    let node: React.ReactNode = t.plain_text
    const a = t.annotations
    if (a.code) {
      node = (
        <code className="rounded bg-slate-200/60 px-1.5 py-0.5 font-mono text-[0.85em] text-brand dark:bg-slate-800 dark:text-accent">
          {node}
        </code>
      )
    }
    if (a.bold) {
      node = <strong className="font-semibold text-slate-900 dark:text-slate-100">{node}</strong>
    }
    if (a.italic) {
      node = <em>{node}</em>
    }
    if (a.strikethrough) {
      node = <del>{node}</del>
    }
    if (a.underline) {
      node = <u>{node}</u>
    }
    if (t.href) {
      node = (
        <a
          href={t.href}
          target="_blank"
          rel="noreferrer"
          className="text-brand underline decoration-brand/30 transition-colors hover:decoration-brand dark:text-accent dark:decoration-accent/30 dark:hover:decoration-accent"
        >
          {node}
        </a>
      )
    }
    return <Fragment key={i}>{node}</Fragment>
  })
}

export function extractToc(blocks: BlockObjectResponse[]): TocItem[] {
  const toc: TocItem[] = []
  for (const block of blocks) {
    if (block.type === 'heading_2') {
      toc.push({ text: plainText(block.heading_2.rich_text), children: [] })
    } else if (block.type === 'heading_3' && toc.length > 0) {
      toc[toc.length - 1].children.push({
        text: plainText(block.heading_3.rich_text),
        children: [],
      })
    }
  }
  return toc
}

export default function NotionRenderer({ blocks }: { blocks: BlockObjectResponse[] }) {
  const nodes: React.ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      // group consecutive items of the same list type into one list
      const listType = block.type
      const items: React.ReactNode[] = []
      while (i < blocks.length && blocks[i].type === listType) {
        const item = blocks[i]
        const richText =
          item.type === 'bulleted_list_item'
            ? item.bulleted_list_item.rich_text
            : item.type === 'numbered_list_item'
              ? item.numbered_list_item.rich_text
              : null
        if (richText) {
          items.push(<li key={item.id}>{renderRichText(richText)}</li>)
        }
        i++
      }
      nodes.push(
        listType === 'bulleted_list_item' ? (
          <ul key={block.id} className="my-4 list-disc space-y-1 pl-6 leading-7">
            {items}
          </ul>
        ) : (
          <ol key={block.id} className="my-4 list-decimal space-y-1 pl-6 leading-7">
            {items}
          </ol>
        )
      )
      continue
    }
    switch (block.type) {
      case 'paragraph':
        nodes.push(
          <p key={block.id} className="my-4 leading-7">
            {renderRichText(block.paragraph.rich_text)}
          </p>
        )
        break
      case 'heading_1': {
        const text = plainText(block.heading_1.rich_text)
        nodes.push(
          <h1
            key={block.id}
            id={text}
            className="font-display mt-10 mb-4 scroll-mt-20 text-3xl font-bold text-slate-900 dark:text-slate-100"
          >
            <a href={`#${text}`}>{renderRichText(block.heading_1.rich_text)}</a>
          </h1>
        )
        break
      }
      case 'heading_2': {
        const text = plainText(block.heading_2.rich_text)
        nodes.push(
          <h2
            key={block.id}
            id={text}
            className="font-display mt-10 mb-4 scroll-mt-20 text-2xl font-bold text-slate-900 dark:text-slate-100"
          >
            <a href={`#${text}`}>{renderRichText(block.heading_2.rich_text)}</a>
          </h2>
        )
        break
      }
      case 'heading_3': {
        const text = plainText(block.heading_3.rich_text)
        nodes.push(
          <h3
            key={block.id}
            id={text}
            className="font-display mt-8 mb-3 scroll-mt-20 text-xl font-semibold text-slate-900 dark:text-slate-100"
          >
            <a href={`#${text}`}>{renderRichText(block.heading_3.rich_text)}</a>
          </h3>
        )
        break
      }
      case 'quote':
        nodes.push(
          <blockquote
            key={block.id}
            className="my-4 border-l-4 border-brand-teal/50 pl-4 italic text-slate-500 dark:text-slate-400"
          >
            {renderRichText(block.quote.rich_text)}
          </blockquote>
        )
        break
      case 'code':
        nodes.push(
          <pre
            key={block.id}
            data-language={block.code.language}
            className="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm leading-6 text-slate-100 dark:bg-black/40 dark:ring-1 dark:ring-slate-800"
          >
            <code>{plainText(block.code.rich_text)}</code>
          </pre>
        )
        break
      case 'image': {
        const src =
          block.image.type === 'external' ? block.image.external.url : block.image.file.url
        nodes.push(
          <img
            key={block.id}
            src={src}
            alt={plainText(block.image.caption)}
            className="my-4 rounded-lg"
          />
        )
        break
      }
      case 'divider':
        nodes.push(<hr key={block.id} className="my-8 border-slate-200 dark:border-slate-800" />)
        break
      default:
        break
    }
    i++
  }
  return <>{nodes}</>
}

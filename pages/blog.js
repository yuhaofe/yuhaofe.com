import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/api'
import cstyles from '../styles/Common.module.css'

const i18n = {
    en: {
        title: 'Blog - fHz',
        blog: 'Blog (Under Construction)',
    },
    'zh-CN': {
        title: '博客 - fHz',
        blog: '博客（正在施工）'
    }
}

export default function Blog({ posts, locale }) {
    return (
        <section className={cstyles.section}>
            <Head >
                <title>{i18n[locale].title}</title>
                <meta property="og:title" content={i18n[locale].title} key="title" />
                <meta property="og:url" content="https://flyhaozi.com/blog" key="url" />
            </Head>
            <h2>{i18n[locale].blog}</h2>
            <ul className={cstyles.blogList}>
                {
                    posts.map(entry => 
                        <li><span>{entry.date}</span><Link href={`/blog/${entry.slug}`}><a >{entry.title}</a></Link></li>
                    )
                }
            </ul>
        </section>
    )
}

export async function getStaticProps() {
    const posts = await getAllPosts();
    return { props: { posts, locale: process.env.NEXT_LOCALE ?? 'en' } };
}
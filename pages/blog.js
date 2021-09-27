import Head from 'next/head'
import Link from 'next/link'
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

export default function Blog({ locale }) {
    return (
        <section className={cstyles.section}>
            <Head >
                <title>{i18n[locale].title}</title>
                <meta property="og:title" content={i18n[locale].title} key="title" />
                <meta property="og:url" content="https://flyhaozi.com/blog" key="url" />
            </Head>
            <h2>{i18n[locale].blog}</h2>
            <ul className={cstyles.blogList}>
                <li><span>2021-10-01</span><Link href="/blog/2021-national-day"><a >Celebrate The 2021 National Day!!! 🎉✨</a></Link></li>
            </ul>
        </section>
    )
}

export async function getStaticProps() {
    return { props: { locale: process.env.NEXT_LOCALE ?? 'en' } };
}
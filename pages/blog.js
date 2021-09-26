import Head from 'next/head'
import Link from 'next/link'
import cstyles from '../styles/Common.module.css'

export default function Blog() {
    return (
        <section className={cstyles.section}>
            <Head >
                <title>Blog | fHz</title>
                <meta property="og:title" content="Blog | fHz" key="title" />
                <meta property="og:url" content="https://flyhaozi.com/blog" key="url" />
            </Head>
            <h2>Blog (Under Construction)</h2>
            <ul className={cstyles.blogList}>
                <li><span>2021-10-01</span><Link href="/blog/2021-national-day"><a >Celebrate The 2021 National Day!!! 🎉✨</a></Link></li>
            </ul>
        </section>
    )
}
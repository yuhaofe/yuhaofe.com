import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/api'
import { getLocalizedTexts } from '../lib/i18n'
import cstyles from '../styles/Common.module.css'

export default function Blog({ posts, texts }) {
    return (
        <section className={cstyles.section}>
            <Head >
                <title>{`${texts.blog} - YuhaoFe`}</title>
                <meta property="og:title" content={`${texts.blog} - YuhaoFe`} key="title" />
                <meta property="og:url" content="https://yuhaofe.com/blog" key="url" />
            </Head>
            <h2>{texts.blog}</h2>
            <ul className={cstyles.blogList}>
                {
                    posts.map(entry => 
                        <li>
                            <span>{entry.date}</span>
                            <div>
                                <Link href={`/blog/${entry.slug}`}><a >{entry.title}</a></Link>
                                <p>{entry.summary}</p>
                                <Link href={`/blog/${entry.slug}`}><a>{texts.viewMore}</a></Link>
                            </div>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}

export async function getStaticProps() {
    const posts = await getAllPosts();
    const texts = getLocalizedTexts('blog', 'viewMore');
    return { props: { posts, texts } };
}
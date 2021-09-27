import Head from 'next/head'
import cstyles from '../styles/Common.module.css'

const meta = {
    en: {
        title: 'About - fHz'
    },
    'zh-CN': {
        title: '关于 - fHz'
    }
}

export default function About({ locale }) {
    return (
        <>
            <Head >
                <title>{meta[locale].title}</title>
                <meta property="og:title" content={meta[locale].title} key="title" />
                <meta property="og:url" content="https://flyhaozi.com/about" key="url" />
            </Head>
            {
                locale === 'en' && 
                <article className={cstyles.section}>
                    <h2>About Me</h2>
                    <p>Hi, I am <em>Yuhao Feng</em>. fHz is the name I use to publish my works.</p>
                    <p>I like using browser extensions and userscripts to enhance my web browsing experience, so I start learning front-end techniques.</p>
                    <p>I have published some small extensions and scripts. Hope they will make your browsing experience better.</p>
                </article>
            }{
                locale === 'zh-CN' &&
                <article className={cstyles.section}>
                    <h2>关于我</h2>
                    <p>你好，我是<em>冯宇浩</em>。fHz 是我用来发布作品的名字。</p>
                    <p>我喜欢使用浏览器扩展和用户脚本来增强自己的网页浏览体验，因此我开始了学习前端技术。</p>
                    <p>我已经发布了几个小型的扩展和脚本，希望它们能够让你的浏览体验变得更好。</p>
                </article>
            }
        </>
    )
}

export async function getStaticProps() {
    return { props: { locale: process.env.NEXT_LOCALE ?? 'en' } };
}
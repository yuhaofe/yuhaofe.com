import Head from 'next/head'
import { getLocalizedTexts } from '../lib/i18n'
import cstyles from '../styles/Common.module.css'

export default function About({ texts }) {
    return (
        <>
            <Head >
                <title>{`${texts.about} - YuhaoFe`}</title>
                <meta property="og:title" content={`${texts.about} - YuhaoFe`} key="title" />
                <meta property="og:url" content="https://yuhaofe.com/about" key="url" />
            </Head>
            <article className={cstyles.section} dangerouslySetInnerHTML={{__html: texts.aboutMe}}>
            </article>
        </>
    )
}

export async function getStaticProps() {
    const texts = getLocalizedTexts('about', 'aboutMe');
    return { props: { texts } };
}
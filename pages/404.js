import { getLocalizedTexts } from '../lib/i18n'
import cstyles from '../styles/Common.module.css'

export default function Custom404({ texts }) {
    return (
        <section className={cstyles.section}>
            <h1>{texts.error404}</h1>
        </section>
    )
}

export async function getStaticProps() {
    const texts = getLocalizedTexts('error404');
    return { props: { texts } };
}
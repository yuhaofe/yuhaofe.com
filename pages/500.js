import { getLocalizedTexts } from '../lib/i18n'
import cstyles from '../styles/Common.module.css'

export default function Custom500({ texts }) {
    return (
        <section className={cstyles.section}>
            <h1>{texts.error500}</h1>
        </section>
    )
}

export async function getStaticProps() {
    const texts = getLocalizedTexts('error500');
    return { props: { texts } };
}
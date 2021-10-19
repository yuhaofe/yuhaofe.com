import styles from '../styles/Layout.module.css'

export default function Footer({ texts }) {
    return (
        <footer style={{width: '100%'}}>
            <div className={styles.footer} data-nosnippet>
                <span dangerouslySetInnerHTML={{__html: texts.copyright}}></span>
                <div className={styles.tools}>
                    <span dangerouslySetInnerHTML={{__html: texts.designed}}></span>
                    <span dangerouslySetInnerHTML={{__html: texts.built}}></span>
                    <span dangerouslySetInnerHTML={{__html: texts.hosted}}></span>
                </div>
                <div className={styles.social}>
                    <span dangerouslySetInnerHTML={{__html: texts.follow}}></span>
                </div>
            </div>
        </footer>
    )
}
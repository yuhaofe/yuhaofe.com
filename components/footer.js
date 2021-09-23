import styles from '../styles/Layout.module.css'

export default function Footer({}) {
    return (
        <footer className={styles.footer}>
            <span>Copyright &copy; 2021 fHz</span>
            <div className={styles.tools}>
                <span>Designed in <a href="https://www.figma.com/" target="_blank">figma</a></span>
                <span>Built with <a href="https://nextjs.org/" target="_blank">Next.js</a></span>
                <span>Hosted on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a></span>
            </div>
            <div className={styles.social}>
                <span>Follow me on <a href="https://github.com/flyhaozi" target="_blank">Github</a></span>
            </div>
        </footer>
    )
}
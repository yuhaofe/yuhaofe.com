import styles from '../styles/Layout.module.css'

export default function Footer({ locale }) {
    return (
        <footer className={styles.footer}>
            <span>Copyright &copy; 2021 fHz</span>
            {
                locale === 'en' &&
                <>
                    <div className={styles.tools}>
                        <span>Designed in <a href="https://www.figma.com/" target="_blank">figma</a></span>
                        <span>Built with <a href="https://nextjs.org/" target="_blank">Next.js</a></span>
                        <span>Hosted on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a></span>
                    </div>
                    <div className={styles.social}>
                        <span>Follow me on <a href="https://github.com/flyhaozi" target="_blank">Github</a></span>
                    </div>
                </>
            }
            {
                locale === 'zh-CN' &&
                <>
                    <div className={styles.tools}>
                        <span>在 <a href="https://www.figma.com/" target="_blank">figma</a> 中设计</span>
                        <span>用 <a href="https://nextjs.org/" target="_blank">Next.js</a> 构建</span>
                        <span>托管于 <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a></span>
                    </div>
                    <div className={styles.social}>
                        <span>在 <a href="https://github.com/flyhaozi" target="_blank">Github</a> 上关注我</span>
                    </div>
                </>
            }
        </footer>
    )
}
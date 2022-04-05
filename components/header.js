import styles from '../styles/Layout.module.css'
import Link from 'next/link'

export default function Header({ texts }) {
    return (
        <header style={{width: '100%'}}>
            <div className={styles.header} data-nosnippet>
                <Link href="/">
                    <a className={styles.logo}>
                        YuhaoFe
                    </a>
                </Link>
                <span className={styles.lang}><a href="/">EN</a> / <a href="/zh-CN">中</a></span>
                <ul className={styles.nav}>
                    <li><Link href="/">{texts.home}</Link></li>
                    <li><Link href="/projects">{texts.projects}</Link></li>
                    <li><Link href="/blog">{texts.blog}</Link></li>
                    <li><Link href="/about">{texts.about}</Link></li>
                </ul>
            </div>
        </header>
    )
}
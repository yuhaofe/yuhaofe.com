import styles from '../styles/Layout.module.css'
import Link from 'next/link'

export default function Header({ texts }) {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a className={styles.logo}>
                    <svg width="75" height="48" viewBox="0 0 206 133" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M55.9861 61.3103H31.1799V133H15.01L15.01 61.3103L0 61.2325V46.5428L15.01 46.6206L15.01 0H48.0906V15.2803H31.1799V46.5946H55.9861V61.3103Z" fill="white"/>
                        <path d="M137.841 133H121.303V61.3103L82.4517 61.2844V133H65.9143V0.000155439H82.4517V46.5687L121.303 46.5686V2.22056e-05H137.841V133Z" fill="white"/>
                        <path d="M206 132.362L148.329 132.389V118.563L188.056 61.2844L148.329 61.3103V46.5946L206 46.5428V61.2844L166.523 118.563L206 118.537V132.362Z" fill="white"/>
                    </svg>
                </a>
            </Link>
            <ul className={styles.nav}>
                <li><small><a href="/">EN</a> / <a href="/zh-CN">中</a></small></li>
                <li><Link href="/">{texts.home}</Link></li>
                <li><Link href="/projects">{texts.projects}</Link></li>
                <li><Link href="/blog">{texts.blog}</Link></li>
                <li><Link href="/about">{texts.about}</Link></li>
            </ul>
        </header>
    )
}
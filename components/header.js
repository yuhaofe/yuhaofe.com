import styles from '../styles/Layout.module.css'

export default function Header({}) {
    return (
        <header className={styles.header}>
            <span className={styles.logo}><a href="/">fHz</a></span>
            <span className={styles.desc}>fly through the waves</span>
            <ul className={styles.nav}>
                <li><a href="/">Home</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </header>
    )
}
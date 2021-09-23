import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>fHz</title>
        <meta name="description" content="fly through the waves" />
      </Head>
      <section className={styles.section}>
        <h2>Projects</h2>
        <div className={styles.cardContainer}>
          <a href="/project/qbm" className={styles.projectCard}>
            <div className={styles.projectBasic}>
              <div>
                <p className={styles.projectType}>Browser Extension</p>
                <p className={styles.projectName}>Quick Bookmarks Menu</p>
              </div>
              <img className={styles.projectImg}></img>
            </div>
            <p className={styles.projectDesc}>A chrome extension gives you quick access to your bookmarks.</p>
          </a>
          <a href="/project/vqfft" className={styles.projectCard}>
            <div className={styles.projectBasic}>
              <div>
                <p className={styles.projectType}>Userscript</p>
                <p className={styles.projectName}>Video Quality Fixer for Twitter</p>
              </div>
            </div>
            <p className={styles.projectDesc}>Force highest quality playback for Twitter videos.</p>
          </a>
        </div>
        <a href="/projects" className={styles.viewAll}>View all projects...</a>
      </section>
      <hr />
      <section className={styles.section}>
        <h2>Blog</h2>
        <div className={styles.cardContainer}>
          <div className={styles.blogCard}>
            <ul>
              <li><span>2021-10-01</span><a href="/blog/2021-national-day">Celebrate The 2021 National Day!!! 🎉✨</a></li>
            </ul>
          </div>
        </div>
        <a href="/blog" className={styles.viewAll}>View all posts...</a>
      </section>
    </>
  )
}

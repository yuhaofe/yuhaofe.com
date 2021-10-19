import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import styles from '../styles/Layout.module.css'

export default function Layout({ children, texts }) {
  // https://nextjs.org/docs/api-reference/next/head
  return (
    <>
      <Head>
        <title>{texts.title}</title>
        <meta name="description" content={texts.description} />
        <meta property="og:title" content={texts.title} key="title" />
        <meta property="og:description" content={texts.description} key="description" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:url" content="https://flyhaozi.com/" key="url" />
        <meta property="og:image" content="https://flyhaozi.com/banner.jpg" key="image" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <Header texts={texts} />
      <main className={styles.children}>{children}</main>
      <Footer texts={texts} />
    </>
  )
}
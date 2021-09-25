import Header from './header'
import Footer from './footer'
import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.children}>{children}</main>
      <Footer />
    </>
  )
}
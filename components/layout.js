import Header from './header'
import Footer from './footer'
import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <hr />
      <main className={styles.children}>{children}</main>
      <hr />
      <Footer />
    </div>
  )
}
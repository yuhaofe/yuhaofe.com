import '../styles/globals.css'
import '../components/layout'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout locale={pageProps.locale}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp

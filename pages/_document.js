// https://nextjs.org/docs/advanced-features/custom-document
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = process.env.NEXT_LOCALE ?? 'en';
    return { ...initialProps, locale };
  }

  render() {
    return (
      <Html lang={this.props.locale} prefix="og: https://ogp.me/ns#" >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
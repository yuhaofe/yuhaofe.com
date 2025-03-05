import type { Metadata } from 'next'
import Link from 'next/link'
import './global.css'
import styles from './layout.module.css'
import { getLocalizedTexts } from '../lib/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const texts = getLocalizedTexts();

  return {
    // charset 默认设置为 utf-8，不可修改
    // viewport 默认设置为 width=device-width, initial-scale=1，可修改
    title: texts.title,
    description: texts.description,
    openGraph: {
      title: texts.title,
      description: texts.description,
      type: 'website',
      url: 'https://yuhaofe.com/',
      images: 'https://yuhaofe.com/banner.jpg',
    },
    twitter: {
      card: 'summary_large_image'
    },
    // 图标meta根据文件自动生成，无需手动配置
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = process.env.NEXT_LOCALE ?? 'en';
  const texts = getLocalizedTexts();

  return (
    <html lang={locale} prefix="og: https://ogp.me/ns#">
      <body>
        <header style={{width: '100%'}}>
            <div className={styles.header} data-nosnippet>
                <Link href="/" className={styles.logo}>
                    
                        YuhaoFe
                    
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

        <main className={styles.children}>{children}</main>
        
        <footer style={{width: '100%'}}>
            <div className={styles.footer} data-nosnippet>
                <span dangerouslySetInnerHTML={{__html: texts.copyright}}></span>
                <div className={styles.tools}>
                    <span dangerouslySetInnerHTML={{__html: texts.designed}}></span>
                    <span dangerouslySetInnerHTML={{__html: texts.built}}></span>
                    <span dangerouslySetInnerHTML={{__html: texts.hosted}}></span>
                </div>
                <div className={styles.social}>
                    <span dangerouslySetInnerHTML={{__html: texts.follow}}></span>
                </div>
            </div>
        </footer>
      </body>
    </html>
  );
}

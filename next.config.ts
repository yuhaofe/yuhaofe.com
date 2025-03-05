import type { NextConfig } from 'next'

const locale = process.env.NEXT_LOCALE
const isEnLocale = !locale || locale === 'en'

const nextConfig: NextConfig = {
    output: 'export', // enable SSG mode
    basePath: isEnLocale ? '' : '/' + locale, // route base path
    distDir: isEnLocale ? 'out' : 'out/' + locale, // SSG export dir
}

export default nextConfig
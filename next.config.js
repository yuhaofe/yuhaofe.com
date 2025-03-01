const locale = process.env.NEXT_LOCALE;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    basePath: (!locale || (locale === 'en')) ? '' : '/' + locale,
    output: 'export', // enable SSG mode
    distDir: (!locale || (locale === 'en')) ? 'out' : 'out/' + locale, // SSG export dir
}

module.exports = nextConfig
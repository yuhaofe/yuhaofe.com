const locale = process.env.NEXT_LOCALE;

module.exports = {
    basePath: (!locale || (locale === 'en')) ? '' : '/' + process.env.NEXT_LOCALE,
}
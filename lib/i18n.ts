import type { Locale } from './types'

const i18n = {
  en: {
    // layout
    title: 'yuhaofe - the waves never rest',
    description: 'the waves never rest',

    // header
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    about: 'About',

    // index
    viewAllProjects: '>> View all projects',
    viewAllPosts: '>> View all posts',
    viewMore: '>> View more',
    heroKicker: '// yuhaofe.com — index',
    heroTitle: 'the <em>waves</em><br />never rest',
    specRole1: 'FRONT-END DEV',
    specRole2: 'EXTENSION MAKER',
    specProjects: '{count} PROJECTS',
    specPosts: '{count} POSTS',
    projectsSection: '01 / PROJECTS',
    blogSection: '02 / BLOG',
    aboutSection: '03 / ABOUT',
    themeToggle: 'Toggle color theme',
    menuToggle: 'Open menu',

    // footer
    copyright: 'Copyright &copy; 2026 yuhaofe',
    built: 'Built with <a href="https://nextjs.org/" target="_blank">Next.js</a>',
    hosted: 'Hosted on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>',
    follow: 'Follow me on <a href="https://github.com/yuhaofe" target="_blank">Github</a>',

    // blog
    toc: 'Table of Contents',

    // about
    aboutMe: `<p>Hi, I am <em>Yuhao Feng</em>. I like using browser extensions and userscripts to enhance my web browsing experience, so I start learning front-end techniques.</p>
    <p>I have published some small extensions and scripts. Hope they will make your browsing experience better.</p>`,

    // errors
    error404: '404 - Page Not Found',
    error500: '500 - Server-side error occurred',
    errorRetry: 'Try again',
  },
  'zh-CN': {
    title: 'yuhaofe - 浪涌不息',
    description: '浪涌不息',

    home: '主页',
    projects: '项目',
    blog: '博客',
    about: '关于',

    viewAllProjects: '>> 查看全部项目',
    viewAllPosts: '>> 查看全部博文',
    viewMore: '>> 查看更多',
    heroKicker: '// yuhaofe.com — 首页',
    heroTitle: '<em>浪</em>涌不息',
    specRole1: '前端开发',
    specRole2: '扩展作者',
    specProjects: '{count} 个项目',
    specPosts: '{count} 篇博文',
    projectsSection: '01 / 项目',
    blogSection: '02 / 博客',
    aboutSection: '03 / 关于',
    themeToggle: '切换明暗主题',
    menuToggle: '打开菜单',

    copyright: 'Copyright &copy; 2026 yuhaofe',
    built: '用 <a href="https://nextjs.org/" target="_blank">Next.js</a> 构建',
    hosted: '托管于 <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>',
    follow: '在 <a href="https://github.com/yuhaofe" target="_blank">Github</a> 上关注我',

    toc: '目录',

    aboutMe: `<p>你好，我是<em>冯宇浩</em>。我喜欢使用浏览器扩展和用户脚本来增强自己的网页浏览体验，因此我开始了学习前端技术。</p>
    <p>我已经发布了几个小型的扩展和脚本，希望它们能够让你的浏览体验变得更好。</p>`,

    error404: '404 - 找不到页面',
    error500: '500 - 服务器出错',
    errorRetry: '重试',
  },
}

export type Texts = (typeof i18n)['en']

export function getLocale(): Locale {
  return process.env.NEXT_LOCALE === 'zh-CN' ? 'zh-CN' : 'en'
}

export function getTextsFor(locale: Locale): Texts {
  return i18n[locale]
}

export function getTexts(): Texts {
  return getTextsFor(getLocale())
}

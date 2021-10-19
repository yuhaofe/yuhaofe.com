const i18n = {
    en: {
        // layout
        title: 'fHz - fly through the waves',
        description: 'fly through the waves',

        // header
        home: 'Home',
        projects: 'Projects',
        blog: 'Blog',
        about: 'About',

        // index
        viewAllProjects: '>> View all projects',
        viewAllPosts: '>> View all posts',
        viewMore: '>> View more',

        // footer
        copyright: 'Copyright &copy; 2021 fHz',
        designed: 'Designed in <a href="https://www.figma.com/" target="_blank">figma</a>',
        built: 'Built with <a href="https://nextjs.org/" target="_blank">Next.js</a>',
        hosted: 'Hosted on <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>',
        follow: 'Follow me on <a href="https://github.com/flyhaozi" target="_blank">Github</a>',

        // about
        aboutMe: `<h2>About Me</h2>
        <p>Hi, I am <em>Yuhao Feng</em>. fHz is the name I use to publish my works.</p>
        <p>I like using browser extensions and userscripts to enhance my web browsing experience, so I start learning front-end techniques.</p>
        <p>I have published some small extensions and scripts. Hope they will make your browsing experience better.</p>`,

        // errors
        error404: '404 - Page Not Found',
        error500: '500 - Server-side error occurred'
    },
    'zh-CN': {
        title: 'fHz - 飞跃浪潮',
        description: '飞跃浪潮',

        home: '主页',
        projects: '项目',
        blog: '博客',
        about: '关于',

        viewAllProjects: '>> 查看全部项目',
        viewAllPosts: '>> 查看全部博文',
        viewMore: '>> 查看更多',

        copyright: 'Copyright &copy; 2021 fHz',
        designed: '在 <a href="https://www.figma.com/" target="_blank">figma</a> 中设计',
        built: '用 <a href="https://nextjs.org/" target="_blank">Next.js</a> 构建',
        hosted: '托管于 <a href="https://pages.cloudflare.com/" target="_blank">Cloudflare Pages</a>',
        follow: '在 <a href="https://github.com/flyhaozi" target="_blank">Github</a> 上关注我',

        aboutMe: `<h2>关于我</h2>
        <p>你好，我是<em>冯宇浩</em>。fHz 是我用来发布作品的名字。</p>
        <p>我喜欢使用浏览器扩展和用户脚本来增强自己的网页浏览体验，因此我开始了学习前端技术。</p>
        <p>我已经发布了几个小型的扩展和脚本，希望它们能够让你的浏览体验变得更好。</p>`,

        error404: '404 - 找不到页面',
        error500: '500 - 服务器出错'
    }
};

export function getLocalizedTexts(...keyArr) {
    let text = {};
    const locale = process.env.NEXT_LOCALE ?? 'en';
    const layoutKeyArr = ['title', 'description'];
    const headerKeyArr = ['home', 'projects', 'blog', 'about'];
    const footerKeyArr = ['copyright', 'designed', 'built', 'hosted', 'follow'];
    for (const key of [...keyArr, ...layoutKeyArr, ...headerKeyArr, ...footerKeyArr]) {
        text[key] = i18n[locale][key];
    }
    return text;
}
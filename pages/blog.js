import cstyles from '../styles/Common.module.css'

export default function Blog() {
    return (
        <section className={cstyles.section}>
            <h2>Blog (Under Construction)</h2>
            <ul className={cstyles.blogList}>
            <li><span>2021-10-01</span><a href="/blog/2021-national-day">Celebrate The 2021 National Day!!! 🎉✨</a></li>
            </ul>
        </section>
    )
}
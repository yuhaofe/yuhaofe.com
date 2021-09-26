import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { useRouter } from 'next/router'
import path from 'path'
import cstyles from '../styles/Common.module.css'
import IdleDetectionExample from '../components/idle-detection-example'

const components = { IdleDetectionExample };

export default function Project({ source, frontMatter }) {
    const router = useRouter();
    return (
        <>
            <Head >
                <title>{frontMatter.title}</title>
                <meta name="description" content={frontMatter.description} />
                <meta property="og:title" content={frontMatter.title} />
                <meta property="og:description" content={frontMatter.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://flyhaozi.com/" + frontMatter.path} />
                <meta property="og:image" content="https://flyhaozi.com/banner.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </Head>
            <div className={cstyles.top}>
                <h1>{frontMatter.title}</h1>
                <p>{frontMatter.description}</p>
                <div>
                    {frontMatter.links.map((link, index) => {
                        return <a href={link} target="_blank" key={index}>{
                            link.startsWith("https://chrome.google.com") &&
                            <img src="/icons/chrome-web-store.svg" alt="Install from Chrome Web Store" />
                        } {link.startsWith("https://microsoftedge.microsoft.com") &&
                            <img src="/icons/microsoft-store.svg" alt="Get it from Microsoft" />
                            } {link.startsWith("https://greasyfork.org") &&
                                <img src="/icons/greasyfork.svg" alt="Install from Greasy Fork" />
                            } {link.startsWith("https://github.com") &&
                                <img src="/icons/github-white.svg" alt="View on Github" />
                            }
                        </a>
                    })}
                </div>
            </div>
            <section className={cstyles.section}>
                <MDXRemote {...source} components={ components } />
            </section>
        </>
    )
}

export async function getStaticPaths() {
    const projectsDir = path.join(process.cwd(), 'projects');
    const projectNames = await fs.readdir(projectsDir);
    const paths = projectNames.map(name => {
        return { params: { project: path.parse(name).name } };
    });
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { project } = params;
    const projectsDir = path.join(process.cwd(), 'projects');
    const projectNames = await fs.readdir(projectsDir);
    const projName = projectNames.find(name => path.parse(name).name === project);
    if (!projName) {
        return { notFound: true };
    }
    const projPath = path.join(projectsDir, projName);
    const projSource = await fs.readFile(projPath, 'utf8');
    const { content, data } = matter(projSource);
    const mdxSource = await serialize(content, { scope: data });
    return { props: { source: mdxSource, frontMatter: data } };
}
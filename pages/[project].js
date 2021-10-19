import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { useRouter } from 'next/router'
import path from 'path'
import IdleDetectionExample from '../components/idle-detection-example'
import { getLocalizedTexts } from '../lib/i18n'
import cstyles from '../styles/Common.module.css'

const components = { IdleDetectionExample };

export default function Project({ source, frontMatter, texts }) {
    const router = useRouter();
    return (
        <>
            <Head >
                <title>{frontMatter.title + " - fHz"}</title>
                <meta name="description" content={frontMatter.description} />
                <meta property="og:title" content={frontMatter.title + " - fHz"} key="title" />
                <meta property="og:description" content={frontMatter.description} key="description" />
                <meta property="og:url" content={"https://flyhaozi.com/" + frontMatter.path} key="url" />
            </Head>
            <div className={cstyles.top}>
                <h1>{frontMatter.title}</h1>
                <p>{frontMatter.description}</p>
                <div>
                    {frontMatter.links.map((link, index) => {
                        return <a href={link} target="_blank" key={index}>
                        { link.startsWith("https://chrome.google.com") &&
                            <img src="/icons/chrome-web-store.svg" alt="Install from Chrome Web Store" />
                        } { link.startsWith("https://microsoftedge.microsoft.com") &&
                            <img src="/icons/microsoft-store.svg" alt="Get it from Microsoft" />
                        } { (link.startsWith("https://greasyfork.org") || link.startsWith("https://sleazyfork.org")) &&
                            <img src="/icons/greasyfork.svg" alt="Install from Greasy Fork" />
                        } { link.startsWith("https://github.com") &&
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
    const locale = process.env.NEXT_LOCALE ?? 'en';
    const projectsDir = path.join(process.cwd(), 'projects', locale);
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
    const locale = process.env.NEXT_LOCALE ?? 'en';
    const { project } = params;
    const projectsDir = path.join(process.cwd(), 'projects', locale);
    const projectNames = await fs.readdir(projectsDir);
    const projName = projectNames.find(name => path.parse(name).name === project);
    if (!projName) {
        return { notFound: true };
    }
    const projPath = path.join(projectsDir, projName);
    const projSource = await fs.readFile(projPath, 'utf8');
    const { content, data } = matter(projSource);
    const mdxSource = await serialize(content, { scope: data });
    const texts = getLocalizedTexts();
    return { props: { source: mdxSource, frontMatter: data, texts } };
}
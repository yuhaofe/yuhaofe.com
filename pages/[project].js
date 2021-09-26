import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { useRouter } from 'next/router'
import path from 'path'
import cstyles from '../styles/Common.module.css'

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
                <p>
                    {frontMatter.links.map((link, index) => {
                        return <a href={link} target="_blank" key={index}>{
                            link.startsWith("https://chrome.google.com") &&
                            <img src="https://camo.githubusercontent.com/a4857075aa233365548b863664816a8d15172d5aa5dc5ca5d7e2abfebfb09152/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6368726f6d652d6763732d75706c6f616465722e61707073706f742e636f6d2f696d6167652f576c443877433667386b685957504a5573516365516b6858536c76312f55563443347962654254735a74343355347869732e706e67" alt="Install from Chrome Web Store" />
                        } {link.startsWith("https://microsoftedge.microsoft.com") &&
                            <img src="https://user-images.githubusercontent.com/12277417/132962008-04e2971d-c769-41df-9adc-08a089295def.png" alt="Get it from Microsoft" />
                            } {link.startsWith("https://greasyfork.org") &&
                                <img src="https://greasyfork.org/packs/media/images/blacklogo96-b2384000fca45aa17e45eb417cbcbb59.png" alt="Install from Greasy Fork" height="58" />
                            } {link.startsWith("https://github.com") &&
                                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github" height="58" />
                            }
                        </a>
                    })}
                </p>
            </div>
            <section className={cstyles.section}>
                <MDXRemote {...source} />
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
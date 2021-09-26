import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import cstyles from '../styles/Common.module.css'

export default function Projects({ projectInfos }) {
    return (
        <section className={cstyles.section}>
            <Head >
                <title>Projects | fHz</title>
                <meta property="og:title" content="Projects | fHz" key="title" />
                <meta property="og:url" content="https://flyhaozi.com/projects" key="url" />
            </Head>
            <h2>Projects</h2>
            <div className={cstyles.cardContainer}>
            {
                projectInfos.map(info => {
                    return <Link href={'/' + info.path} key={info.path}>
                        <a className={cstyles.projectCard}>
                            <div className={cstyles.projectBasic}>
                                <div>
                                    <p className={cstyles.projectType}>{info.type}</p>
                                    <p className={cstyles.projectName}>{info.title}</p>
                                </div>
                                <img className={cstyles.projectImg}></img>
                            </div>
                            <p className={cstyles.projectDesc}>{info.description}</p>
                        </a>
                    </Link>
                })
            }
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    const projectsDir = path.join(process.cwd(), 'projects');
    const projectNames = await fs.readdir(projectsDir);
    const projectInfos = await Promise.all(projectNames.map(async name => {
        const projPath = path.join(projectsDir, name);
        const projSource = await fs.readFile(projPath, 'utf8');
        const { data } = matter(projSource);
        return data;
    }));

    if (!projectInfos) {
        return {
            notFound: true,
        }
    }

    projectInfos.sort((p1, p2) => p1.order.localeCompare(p2.order));

    return {
        props: { projectInfos }
    }
}
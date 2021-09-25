import cstyles from '../styles/Common.module.css'
import { useRouter } from 'next/router'
import Head from 'next/head'

const projects = [
    {
        path: "quick-bookmarks-menu",
        name: "Quick Bookmarks Menu",
        description: "A chrome extension gives you quick access to your bookmarks.",
        links: ["https://chrome.google.com/webstore/detail/quick-bookmarks-menu/fkemipdcgbeknabedhecepcebhlnlhbf",
            "https://microsoftedge.microsoft.com/addons/detail/quick-bookmarks-menu/nipmnpfdiiloiegpkodghkbgnhedgmhj",
            "https://github.com/flyhaozi/Quick-Bookmarks-Menu"]
    },
    {
        path: "twitter-video-fixer",
        name: "Video Quality Fixer for Twitter",
        description: "Force highest quality playback for Twitter videos.",
        links: ["https://greasyfork.org/scripts/399827-video-quality-fixer-for-twitter",
            "https://github.com/flyhaozi/Video-Quality-Fixer-for-Twitter"],
    }
];

export default function Project({ proj }) {
    const router = useRouter();

    return (
        <>
            <Head >
                <title>{proj.name}</title>
                <meta name="description" content={proj.description} />
                <meta property="og:title" content={proj.name} />
                <meta property="og:description" content={proj.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://flyhaozi.com/" + proj.path} />
                <meta property="og:image" content="https://flyhaozi.com/banner.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </Head>
            <div className={cstyles.top}>
                <h1>{proj.name}</h1>
                <p>{proj.description}</p>
                <p>
                    {proj.links.map((link, index) => {
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
                <h2>{proj.name}</h2>
            </section>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { project: "quick-bookmarks-menu" } },
            { params: { project: "twitter-video-fixer" } }
        ],
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { project } = params;
    let proj = null;
    projects.forEach(p => {
        if (p.path === project) {
            proj = p;
        }
    });
    if (!proj) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            proj,
        }
    };
}
import { getAllPosts, getPostBySlug } from '../../lib/api'
import cstyles from '../../styles/Common.module.css'
import styles from '../../styles/Blog.module.css'

const renderText = textArr => textArr.reduce((acc, cur) => {
    if (cur.type != 'text') {
        return acc;
    }
    let jsx = (<>{cur.text.content}</>);
    if (cur.annotations.bold) {
        jsx = (<strong>{jsx}</strong>);
    }
    if (cur.annotations.italic) {
        jsx = (<em>{jsx}</em>);
    }
    if (cur.annotations.strikethrough) {
        jsx = (<del>{jsx}</del>);
    }
    if (cur.annotations.underline) {
        jsx = (<u>{jsx}</u>);
    }
    if (cur.annotations.code) {
        jsx = (<code>{jsx}</code>);
    }
    if (cur.text.link) {
        jsx = (<a href={cur.text.link.url}>{jsx}</a>)
    }
    return [...acc, jsx];
}, []);

export default function Blog({ post }) {

    const content = post.content.reduce((acc, cur) => {
        let jsx = null;
        let lastType = null;
        if (acc.length != 0) {
            lastType = acc[acc.length - 1].type;
        }
        switch (cur.type) {
            case "paragraph":
                jsx = (<p>{renderText(cur.paragraph.text)}</p>);
                break;
            case "heading_1":
                jsx = (<a href={`#${cur.heading_1.text[0].plain_text}`}><h1 id={cur.heading_1.text[0].plain_text}>{renderText(cur.heading_1.text)}</h1></a>);
                break;
            case "heading_2":
                jsx = (<a href={`#${cur.heading_2.text[0].plain_text}`}><h2 id={cur.heading_2.text[0].plain_text}>{renderText(cur.heading_2.text)}</h2></a>);
                break;
            case "heading_3":
                jsx = (<a href={`#${cur.heading_3.text[0].plain_text}`}><h3 id={cur.heading_3.text[0].plain_text}>{renderText(cur.heading_3.text)}</h3></a>);
                break;
            case "bulleted_list_item":
                if (lastType != 'ul') {
                    jsx = (
                        <ul>
                            <li>{renderText(cur.bulleted_list_item.text)}</li>
                        </ul>
                    );
                } else {
                    let lastElmProps = acc[acc.length - 1].props;
                    if (!Array.isArray(lastElmProps.children)) {
                        lastElmProps.children = [lastElmProps.children];
                    }
                    lastElmProps.children.push(<li>{renderText(cur.bulleted_list_item.text)}</li>);
                }
                break;
            case "numbered_list_item":
                if (lastType != 'ol') {
                    jsx = (
                        <ol>
                            <li>{renderText(cur.numbered_list_item.text)}</li>
                        </ol>
                    );
                } else {
                    let lastElmProps = acc[acc.length - 1].props;
                    if (!Array.isArray(lastElmProps.children)) {
                        lastElmProps.children = [lastElmProps.children];
                    }
                    lastElmProps.children.push(<li>{renderText(cur.numbered_list_item.text)}</li>);
                }
                break; 
            case "quote":
                jsx = (<blockquote>{renderText(cur.quote.text)}</blockquote>);
                break;
            case "code":
                jsx = (<pre>{renderText(cur.code.text)}</pre>);
                break;
            case "image":
                jsx = (<img src={cur.image.external.url || cur.image.file.url} />);
                break;
            
            default:
                break;
        }

        return jsx ? [...acc, jsx] : acc;
    }, []);

    return (
        <article className={styles.post + ' ' + cstyles.section}>
            <h1>{post.title}</h1>
            <p><time dateTime={`${post.date} 00:00`}>{post.date}</time> by fHz</p>
            <section>
                {content}
            </section>
        </article>
    )
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    const paths = posts.map(entry => ({
        params: { 
            blog: entry.slug 
        }
    }));
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const post = await getPostBySlug(params.blog);

    return {
        props: {
            post
        }
    };
}
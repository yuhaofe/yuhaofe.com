import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

let posts = [];

export async function getAllPosts() {
  if (posts.length != 0) {
    return posts;
  }
  
  const locale = process.env.NEXT_LOCALE ?? 'en';

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [{
          "property": "public",
          "checkbox": {
            "equals": true
          }
        },
        {
          "property": "lang",
          "select": {
            "equals": locale
          }
        }]}
    });
    posts = response.results.map(result => ({
      id: result.id,
      title: result.properties.title.title[0].plain_text,
      date: result.properties.post_time.date.start,
      slug: result.properties.slug.rich_text[0].plain_text,
      summary: result.properties.summary.rich_text[0].plain_text
    }));
    return posts;
  } catch (error) {
    console.error(error.body);
  }
}

export async function getPostBySlug(slug) {
  const entries = await getAllPosts();
  const post = entries.find(entry => entry.slug === slug);
  try {
    const response = await notion.blocks.children.list({
      block_id: post.id
    });
    post.content = response.results;
    return post;
  } catch (error) {
    console.error(error.body);
  }
}

import rss from '@astrojs/rss';
import { getPosts } from '../data/posts';
import { site, path } from '../data/site';
import type { APIContext } from 'astro';
export async function GET(context: APIContext) {
  return rss({title:site.title, description:site.description, site:context.site!, items:(await getPosts()).map(post=>({title:post.data.title,description:post.data.description,pubDate:post.data.date,link:path(`blog/${post.id}/`)})),customData:'<language>zh-cn</language>'});
}

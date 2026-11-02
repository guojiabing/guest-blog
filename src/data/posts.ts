import { getCollection } from 'astro:content';
export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.replace(/---[\s\S]*?---/, '').length / 400));

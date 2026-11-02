import type { APIContext } from 'astro';
import { path } from '../data/site';
export function GET({ site }: APIContext) {return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(path('sitemap-index.xml'),site)}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}

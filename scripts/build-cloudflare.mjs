import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Cloudflare serves this site at the root of its own hostname, rather than
// GitHub Pages' /guest-blog/ repository path. Build every URL consistently.
const siteUrl = new URL(process.env.SITE_URL || 'https://blog.jiabing.me');
if (siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password ||
    siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
  throw new Error('SITE_URL 必须是 HTTPS 网站根地址，例如 https://blog.jiabing.me');
}

const astro = fileURLToPath(new URL('../node_modules/astro/astro.js', import.meta.url));
const result = spawnSync(process.execPath, [astro, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SITE_URL: siteUrl.origin, BASE_PATH: '/' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);

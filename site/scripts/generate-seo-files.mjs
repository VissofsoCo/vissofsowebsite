/**
 * Writes public/sitemap.xml and public/robots.txt.
 *
 * Next's own app/sitemap.ts and app/robots.ts would normally do this, but its
 * metadata-route loader embeds the project's absolute path in a single-quoted
 * string. This project lives under a folder with an apostrophe in it
 * ("KAVIN'S"), which terminates that string and makes the generated module
 * fail to parse — the same bug that broke the favicon route earlier. Writing
 * the two files directly sidesteps the loader entirely.
 *
 * Runs automatically before `npm run build`; run it by hand with
 * `npm run seo` after changing the routes or the site URL.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Kept in step with src/lib/site.ts by hand — this script runs outside the
// TypeScript build, so it cannot import that module directly.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vissofso.com').replace(/\/$/, '')
const routes = ['/', '/services', '/solutions', '/about', '/team', '/careers', '/contact']

const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
`

await mkdir(join(root, 'public'), { recursive: true })
await writeFile(join(root, 'public', 'sitemap.xml'), sitemap)
await writeFile(join(root, 'public', 'robots.txt'), robots)

console.log(`seo: wrote sitemap.xml (${routes.length} urls) and robots.txt for ${siteUrl}`)

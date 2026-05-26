import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSiteUrl } from './seo-domain.mjs'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const publicDir = join(rootDir, 'public')
const siteUrl = getSiteUrl()
const today = new Date().toISOString().slice(0, 10)
const urls = ['/', '/privacy-policy', '/terms-and-conditions']

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.3'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`

await mkdir(publicDir, { recursive: true })
await writeFile(join(publicDir, 'robots.txt'), robots)
await writeFile(join(publicDir, 'sitemap.xml'), sitemap)
await writeFile(join(publicDir, 'sitemap-index.xml'), sitemapIndex)

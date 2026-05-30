import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSiteUrl } from './seo-domain.mjs'
import { commercialPagePaths } from '../src/seo-pages.js'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const publicDir = join(rootDir, 'public')
const siteUrl = getSiteUrl()
const today = new Date().toISOString().slice(0, 10)
const urls = [
  '/',
  ...commercialPagePaths,
  '/privacy-policy',
  '/terms-and-conditions',
]

const getUrlMeta = (path) => {
  if (path === '/') {
    return { changefreq: 'weekly', priority: '1.0' }
  }

  if (commercialPagePaths.includes(path)) {
    return { changefreq: 'weekly', priority: '0.8' }
  }

  return { changefreq: 'monthly', priority: '0.3' }
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => {
      const { changefreq, priority } = getUrlMeta(path)

      return `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    },
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

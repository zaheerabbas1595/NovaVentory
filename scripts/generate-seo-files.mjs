import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSiteUrl } from './seo-domain.mjs'
import { allSeoPagePaths, allSeoPages } from '../src/seo-pages.js'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const publicDir = join(rootDir, 'public')
const siteUrl = getSiteUrl()
const today = new Date().toISOString().slice(0, 10)
const urls = [
  '/',
  ...allSeoPagePaths,
  '/privacy-policy',
  '/terms-and-conditions',
]

const getUrlMeta = (path) => {
  if (path === '/') {
    return { changefreq: 'weekly', priority: '1.0' }
  }

  if (allSeoPagePaths.includes(path)) {
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

const metaPixelHead = `    <!-- Meta Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1721526562622331');
      fbq('track', 'PageView');
    </script>
    <!-- End Meta Pixel Code -->`

const metaPixelNoScript = `    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1721526562622331&ev=PageView&noscript=1"
      alt="" /></noscript>`

const createHtml = (page) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href="${siteUrl}${page.path}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#050505" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="description" content="${page.description}" />
    <meta name="author" content="NovaVentory" />
    <meta property="og:site_name" content="NovaVentory" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${siteUrl}${page.path}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="${siteUrl}/og-novaventory.jpg" />
    <meta property="og:image:alt" content="NovaVentory Viking leather bracelet product photo" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${siteUrl}/og-novaventory.jpg" />
    <meta name="google-site-verification" content="bfVFvSd2-GiDeRZMRsjeT9RSeL9kQtxtsHjluEgemJg" />
${metaPixelHead}
    <title>${page.title}</title>
  </head>
  <body>
${metaPixelNoScript}
    <div id="root"></div>
    <noscript>${page.heading || page.title} from NovaVentory.</noscript>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`

await mkdir(publicDir, { recursive: true })
await writeFile(join(publicDir, 'robots.txt'), robots)
await writeFile(join(publicDir, 'sitemap.xml'), sitemap)
await writeFile(join(publicDir, 'sitemap-index.xml'), sitemapIndex)

await Promise.all(
  Object.values(allSeoPages).map(async (page) => {
    const htmlPath = join(rootDir, `${page.path.replace(/^\//, '')}.html`)

    await mkdir(dirname(htmlPath), { recursive: true })
    await writeFile(htmlPath, createHtml(page))
  }),
)

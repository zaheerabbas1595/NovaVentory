import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSiteUrl } from './seo-domain.mjs'
import { allSeoPagePaths, allSeoPages } from '../src/seo-pages.js'
import {
  defaultSeoImage,
  getPageSeoImage,
  productSeoImages,
} from '../src/product-seo-images.js'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const publicDir = join(rootDir, 'public')
const publicImageDir = join(publicDir, 'images')
const sourceImageDir = join(rootDir, 'src', 'assets', 'etsy-listings')
const siteUrl = getSiteUrl()
const today = new Date().toISOString().slice(0, 10)
const adsensePublisherId = 'ca-pub-8273338730781765'
const adsTxt = 'google.com, pub-8273338730781765, DIRECT, f08c47fec0942fa0\n'
const supportPages = {
  '/about': {
    path: '/about',
    title: 'About NovaVentory | Viking Jewelry On Etsy',
    description:
      'Learn about NovaVentory, an Etsy-based jewelry shop focused on Viking bracelets, Norse necklaces, raven jewelry, and Nordic accessories.',
    heading: 'About NovaVentory',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact NovaVentory | Etsy Shop Support',
    description:
      'Contact NovaVentory for product questions, order support, shipping questions, and Etsy listing help.',
    heading: 'Contact NovaVentory',
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | NovaVentory',
    description:
      'Privacy Policy for NovaVentory, including website cookies, Google advertising disclosures, Meta Pixel, and Etsy checkout information.',
    heading: 'Privacy Policy',
  },
  '/terms-and-conditions': {
    path: '/terms-and-conditions',
    title: 'Terms And Conditions | NovaVentory',
    description:
      'Terms and Conditions for using the NovaVentory website and shopping NovaVentory products through Etsy.',
    heading: 'Terms And Conditions',
  },
}
const urls = [
  '/',
  ...allSeoPagePaths,
  ...Object.keys(supportPages),
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

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const getPageImages = (path) => {
  if (path === '/') {
    return Object.values(productSeoImages)
  }

  const page = allSeoPages[path] || supportPages[path]

  if (!page) {
    return [defaultSeoImage]
  }

  const productNames = [
    page.productName,
    page.heroProductName,
    ...(page.productNames || []),
  ].filter(Boolean)
  const uniqueImages = new Map()

  productNames.forEach((productName) => {
    const image = productSeoImages[productName]

    if (image) {
      uniqueImages.set(image.path, image)
    }
  })

  if (!uniqueImages.size) {
    const fallbackImage = getPageSeoImage(page)
    uniqueImages.set(fallbackImage.path, fallbackImage)
  }

  return [...uniqueImages.values()]
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (path) => {
      const { changefreq, priority } = getUrlMeta(path)
      const imageEntries = getPageImages(path)
        .map(
          (image) => `    <image:image>
      <image:loc>${siteUrl}${escapeXml(image.path)}</image:loc>
      <image:title>${escapeXml(image.alt)}</image:title>
    </image:image>`,
        )
        .join('\n')

      return `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${imageEntries}
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

const createHtml = (page) => {
  const seoImage = getPageSeoImage(page)
  const seoImageUrl = `${siteUrl}${seoImage.path}`

  return `<!doctype html>
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
    <meta property="og:image" content="${seoImageUrl}" />
    <meta property="og:image:alt" content="${seoImage.alt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${seoImageUrl}" />
    <meta name="google-site-verification" content="bfVFvSd2-GiDeRZMRsjeT9RSeL9kQtxtsHjluEgemJg" />
    <meta name="google-adsense-account" content="${adsensePublisherId}" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}" crossorigin="anonymous"></script>
    <title>${page.title}</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript>${page.heading || page.title} from NovaVentory.</noscript>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
}

await mkdir(publicDir, { recursive: true })
await mkdir(publicImageDir, { recursive: true })
await Promise.all(
  Object.values(productSeoImages).map((image) =>
    copyFile(
      join(sourceImageDir, image.fileName),
      join(publicImageDir, image.path.replace('/images/', '')),
    ),
  ),
)
await writeFile(join(publicDir, 'robots.txt'), robots)
await writeFile(join(publicDir, 'ads.txt'), adsTxt)
await writeFile(join(publicDir, 'sitemap.xml'), sitemap)
await writeFile(join(publicDir, 'sitemap-index.xml'), sitemapIndex)

await Promise.all(
  [...Object.values(allSeoPages), ...Object.values(supportPages)].map(async (page) => {
    const htmlPath = join(rootDir, `${page.path.replace(/^\//, '')}.html`)

    await mkdir(dirname(htmlPath), { recursive: true })
    await writeFile(htmlPath, createHtml(page))
  }),
)

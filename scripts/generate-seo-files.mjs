import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSiteUrl } from './seo-domain.mjs'
import { allSeoPagePaths, allSeoPages, indexableSeoPagePaths } from '../src/seo-pages.js'
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
const siteLanguage = 'en-US'
const siteLocale = 'en_US'
const targetCountryCode = 'US'
const targetCountryName = 'United States'
const supportPages = {
  '/about': {
    path: '/about',
    title: 'About NovaVentory | Viking Jewelry On Etsy',
    description:
      'Learn about NovaVentory, an Etsy-based jewelry shop focused on Viking bracelets, Norse necklaces, raven jewelry, and Nordic accessories.',
    heading: 'About NovaVentory',
    sections: [
      {
        title: 'Who We Are',
        body: [
          'NovaVentory is an Etsy-based jewelry shop focused on Viking-inspired bracelets, Norse necklaces, raven jewelry, stainless steel cuffs, and Nordic accessories.',
          'This website is built as a product guide and storefront preview. It helps visitors compare styles, read buying guides, and reach active NovaVentory Etsy listings for checkout.',
        ],
      },
      {
        title: 'Editorial Standards',
        body: [
          'NovaVentory publishes original product descriptions and style guides for shoppers interested in sizing, materials, care, symbolism, styling, shipping expectations, and gift decisions.',
          'Modern accessories are described as Viking-inspired, Norse-inspired, or symbolic when they are not museum reproductions.',
        ],
      },
    ],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact NovaVentory | Etsy Shop Support',
    description:
      'Contact NovaVentory for product questions, order support, shipping questions, and Etsy listing help.',
    heading: 'Contact NovaVentory',
    sections: [
      {
        title: 'Send A Direct Message',
        body: [
          'Use the NovaVentory contact form for product questions, bracelet sizing help, shipping questions, collaboration requests, or general support.',
          'For Etsy order-specific questions, include your Etsy order number in the form or message NovaVentory through Etsy so the question stays connected to your purchase.',
        ],
      },
    ],
    formUrl: 'https://tally.so/embed/aQkE5v?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1',
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | NovaVentory',
    description:
      'Privacy Policy for NovaVentory, including website cookies, Google advertising disclosures, Meta Pixel, and Etsy checkout information.',
    heading: 'Privacy Policy',
    sections: [
      {
        title: 'Overview',
        body: [
          'NovaVentory is an Etsy-based jewelry shop. This website introduces products, publishes buying guides, and links visitors to Etsy for checkout.',
          'The Privacy Policy explains cookies, advertising services, analytics, Etsy checkout, and how order-related support may work.',
        ],
      },
    ],
  },
  '/terms-and-conditions': {
    path: '/terms-and-conditions',
    title: 'Terms And Conditions | NovaVentory',
    description:
      'Terms and Conditions for using the NovaVentory website and shopping NovaVentory products through Etsy.',
    heading: 'Terms And Conditions',
    sections: [
      {
        title: 'Overview',
        body: [
          'These terms apply to use of the NovaVentory website. Product purchases are completed on Etsy and may also be governed by Etsy policies and the terms shown on each Etsy listing.',
          'Final product details, checkout totals, shipping estimates, and available options are shown on Etsy at the time of purchase.',
        ],
      },
    ],
  },
  '/shipping-and-returns': {
    path: '/shipping-and-returns',
    title: 'Shipping And Returns | NovaVentory',
    description:
      'Read NovaVentory shipping, delivery, return, and order support notes for Etsy purchases and Viking jewelry product questions.',
    heading: 'Shipping And Returns',
    sections: [
      {
        title: 'Where Checkout Happens',
        body: [
          'NovaVentory product pages link to active Etsy listings. Checkout, order confirmation, taxes, payment handling, and final shipping details are managed through Etsy.',
          'The product pages on this website help shoppers compare materials, sizing notes, style intent, and gift suitability before moving to Etsy checkout.',
        ],
      },
      {
        title: 'Shipping And Order Support',
        body: [
          'Shipping times, available destinations, tracking, and order messages should be reviewed on the relevant Etsy listing or order page because Etsy displays the current order details.',
          'For support, use the contact form or Etsy messages and include the product name or order number so the request can be matched to the correct listing.',
        ],
      },
      {
        title: 'Returns And Issues',
        body: [
          'If an item arrives damaged, incorrect, delayed, or different from the listing details, contact NovaVentory through Etsy or the contact form as soon as possible.',
          'Return eligibility and timing may depend on the Etsy listing terms, order status, and the nature of the issue.',
        ],
      },
    ],
  },
}
const urls = [
  '/',
  ...indexableSeoPagePaths,
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

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

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

const renderStaticContent = (page) => {
  const sections = page.sections || []
  const productNames = [
    page.productName,
    page.heroProductName,
    ...(page.productNames || []),
  ].filter(Boolean)
  const relatedLinks = page.related || []
  const formMarkup = page.formUrl
    ? `<section>
        <h2>Contact Form</h2>
        <iframe src="${escapeHtml(page.formUrl)}" title="${escapeHtml(page.heading)} form" width="100%" style="border:0"></iframe>
        <p><a href="https://tally.so/r/aQkE5v">Open the NovaVentory contact form directly</a>.</p>
      </section>`
    : ''

  return `<main id="main-content" class="static-fallback">
      <h1>${escapeHtml(page.heading || page.title)}</h1>
      ${page.intro ? `<p>${escapeHtml(page.intro)}</p>` : ''}
      ${formMarkup}
      ${sections
        .map(
          (section) => `<section>
        <h2>${escapeHtml(section.title)}</h2>
        ${(Array.isArray(section.body) ? section.body : [section.body])
          .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
          .join('\n')}
      </section>`,
        )
        .join('\n')}
      ${
        productNames.length
          ? `<section>
        <h2>Related NovaVentory Products</h2>
        <ul>${productNames.map((productName) => `<li>${escapeHtml(productName)}</li>`).join('')}</ul>
      </section>`
          : ''
      }
      ${
        relatedLinks.length
          ? `<nav aria-label="Related pages">
        ${relatedLinks.map((path) => `<a href="${escapeHtml(path)}">${escapeHtml(path.replace(/^\/|\/$/g, '').replace(/-/g, ' ') || 'Home')}</a>`).join(' ')}
      </nav>`
          : ''
      }
    </main>`
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (path) => {
      const { changefreq, priority } = getUrlMeta(path)
      const pageUrl = `${siteUrl}${path === '/' ? '/' : path}`
      const imageEntries = getPageImages(path)
        .map(
          (image) => `    <image:image>
      <image:loc>${siteUrl}${escapeXml(image.path)}</image:loc>
      <image:title>${escapeXml(image.alt)}</image:title>
    </image:image>`,
        )
        .join('\n')

      return `  <url>
    <loc>${pageUrl}</loc>
    <xhtml:link rel="alternate" hreflang="${siteLanguage}" href="${pageUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl}" />
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
  const pageUrl = `${siteUrl}${page.path}`
  const canonicalUrl = `${siteUrl}${page.canonicalPath || page.path}`
  const robotsContent = page.noindex
    ? 'noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const tallyScript = page.formUrl
    ? '    <script async src="https://tally.so/widgets/embed.js"></script>\n'
    : ''

  return `<!doctype html>
<html lang="${siteLanguage}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="${siteLanguage}" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#050505" />
    <meta name="robots" content="${robotsContent}" />
    <meta name="description" content="${page.description}" />
    <meta name="author" content="NovaVentory" />
    <meta name="geo.region" content="${targetCountryCode}" />
    <meta name="geo.placename" content="${targetCountryName}" />
    <meta property="og:site_name" content="NovaVentory" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:locale" content="${siteLocale}" />
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
${tallyScript}    <style>
      .static-fallback{max-width:940px;margin:0 auto;padding:48px 20px;font-family:Arial,sans-serif;line-height:1.7;color:#1a1a1a;background:#fff}
      .static-fallback h1{font-size:40px;line-height:1.1;margin:0 0 18px}
      .static-fallback h2{font-size:24px;margin:34px 0 10px}
      .static-fallback a{color:#6f5000;font-weight:700}
    </style>
    <title>${page.title}</title>
  </head>
  <body>
    <div id="root">${renderStaticContent(page)}</div>
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

export const siteUrl =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  'https://novaventory.vercel.app'

export const siteTitle =
  'NovaVentory | Viking Jewelry, Raven Bracelets & Norse Necklaces'

export const siteDescription =
  "Shop NovaVentory Viking jewelry on Etsy, including raven bracelets, Norse cuffs, wolf fang necklaces, and Nordic stainless steel accessories with free USA shipping."

export const shopUrl = 'https://www.etsy.com/shop/NovaVentory'

export const absoluteUrl = (path) => new URL(path, `${siteUrl}/`).href

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector)

  if (element) {
    element.setAttribute(attribute, value)
  }
}

export function updateDocumentSeo() {
  const canonicalUrl = absoluteUrl('/')
  const previewImage = absoluteUrl('/og-novaventory.jpg')

  document.title = siteTitle
  setMeta('link[rel="canonical"]', 'href', canonicalUrl)
  setMeta('meta[name="description"]', 'content', siteDescription)
  setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  setMeta('meta[property="og:title"]', 'content', 'NovaVentory | Viking Jewelry on Etsy')
  setMeta('meta[property="og:description"]', 'content', siteDescription)
  setMeta('meta[property="og:image"]', 'content', previewImage)
  setMeta('meta[name="twitter:title"]', 'content', 'NovaVentory | Viking Jewelry on Etsy')
  setMeta('meta[name="twitter:description"]', 'content', siteDescription)
  setMeta('meta[name="twitter:image"]', 'content', previewImage)
}

export function createStructuredData(products) {
  const productGraph = products.map((product, index) => {
    const price = product.price.replace('$', '')

    return {
      '@type': 'Product',
      '@id': `${siteUrl}/#product-${index + 1}`,
      name: product.name,
      image: absoluteUrl(product.image),
      description: `${product.name} from NovaVentory's Viking-inspired Etsy jewelry collection.`,
      brand: {
        '@type': 'Brand',
        name: 'NovaVentory',
      },
      category: 'Viking jewelry',
      offers: {
        '@type': 'Offer',
        url: product.href,
        priceCurrency: 'USD',
        price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@id': `${siteUrl}/#organization`,
        },
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'NovaVentory',
        url: siteUrl,
        logo: absoluteUrl('/apple-touch-icon.svg'),
        sameAs: [shopUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'NovaVentory',
        url: siteUrl,
        description: siteDescription,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'Store',
        '@id': `${siteUrl}/#store`,
        name: 'NovaVentory',
        url: siteUrl,
        image: absoluteUrl('/og-novaventory.jpg'),
        description: siteDescription,
        priceRange: '$$',
        parentOrganization: {
          '@id': `${siteUrl}/#organization`,
        },
        sameAs: [shopUrl],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Featured Products',
            item: `${siteUrl}/#products`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#featured-products`,
        name: 'Featured NovaVentory Viking jewelry',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: product.href,
          name: product.name,
        })),
      },
      ...productGraph,
    ],
  }
}

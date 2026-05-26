export const siteUrl =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  'https://novaventory.vercel.app'

export const siteTitle =
  'NovaVentory | Viking Jewelry, Raven Bracelets & Norse Necklaces'

export const siteDescription =
  "Shop NovaVentory Viking jewelry on Etsy, including raven bracelets, Norse cuffs, wolf fang necklaces, and Nordic stainless steel accessories with free USA shipping."

export const shopUrl = 'https://www.etsy.com/shop/NovaVentory'

export const absoluteUrl = (path) => new URL(path, `${siteUrl}/`).href

const parsePrice = (price) => Number.parseFloat(price.replace(/[^0-9.]/g, ''))

const createSku = (product, index) =>
  `NOVAVENTORY-${String(index + 1).padStart(2, '0')}-${product.name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 36)}`

const createShippingDetails = () => ({
  '@type': 'OfferShippingDetails',
  shippingRate: {
    '@type': 'MonetaryAmount',
    value: 0,
    currency: 'USD',
  },
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'US',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 3,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: 3,
      maxValue: 7,
      unitCode: 'DAY',
    },
  },
})

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector)

  if (element) {
    element.setAttribute(attribute, value)
  }
}

export function updateDocumentSeo(page = {}) {
  const canonicalUrl = absoluteUrl(page.path || '/')
  const title = page.title || siteTitle
  const description = page.description || siteDescription
  const previewImage = absoluteUrl('/og-novaventory.jpg')

  document.title = title
  setMeta('link[rel="canonical"]', 'href', canonicalUrl)
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:image"]', 'content', previewImage)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('meta[name="twitter:image"]', 'content', previewImage)
}

export function createStructuredData(products) {
  const productGraph = products.map((product, index) => {
    const price = parsePrice(product.price)

    return {
      '@type': 'Product',
      '@id': `${siteUrl}/#product-${index + 1}`,
      name: product.name,
      image: absoluteUrl(product.image),
      description: `${product.name} from NovaVentory's Viking-inspired Etsy jewelry collection.`,
      sku: createSku(product, index),
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
        shippingDetails: createShippingDetails(),
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

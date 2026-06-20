import { defaultSeoImage, getProductSeoImage } from './product-seo-images'

export const siteUrl =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  'https://novaventory.com'

export const siteTitle =
  'Viking Jewelry & Viking Bracelets | Norse Necklaces | NovaVentory'

export const siteDescription =
  'Shop NovaVentory Viking jewelry for US shoppers on Etsy, including Viking bracelets, Norse cuffs, raven jewelry, wolf fang necklaces, Odin pendants, and Nordic stainless steel accessories with USD pricing and free USA shipping.'

export const siteLanguage = 'en-US'
export const siteLocale = 'en_US'
export const targetCountryCode = 'US'
export const targetCountryName = 'United States'

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
  const previewImage = absoluteUrl(page.image || defaultSeoImage.path)
  const previewImageAlt = page.imageAlt || defaultSeoImage.alt

  document.title = title
  setMeta('link[rel="canonical"]', 'href', canonicalUrl)
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:locale"]', 'content', siteLocale)
  setMeta('meta[property="og:image"]', 'content', previewImage)
  setMeta('meta[property="og:image:alt"]', 'content', previewImageAlt)
  setMeta('meta[name="geo.region"]', 'content', targetCountryCode)
  setMeta('meta[name="geo.placename"]', 'content', targetCountryName)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('meta[name="twitter:image"]', 'content', previewImage)

  document.documentElement.lang = siteLanguage
}

export function createStructuredData(products, page = {}) {
  const pageUrl = absoluteUrl(page.path || '/')
  const pageName = page.heading || 'Featured NovaVentory Viking jewelry'
  const pageDescription = page.description || siteDescription
  const pageImage = absoluteUrl(page.image || defaultSeoImage.path)
  const usCountry = {
    '@type': 'Country',
    name: targetCountryName,
  }
  const usAudience = {
    '@type': 'Audience',
    geographicArea: usCountry,
  }
  const productGraph = products.map((product, index) => {
    const price = parsePrice(product.price)
    const productImage = getProductSeoImage(product.name)

    return {
      '@type': 'Product',
      '@id': `${pageUrl}#product-${index + 1}`,
      name: product.name,
      image: absoluteUrl(productImage.path),
      description: `${product.name} from NovaVentory's Viking-inspired Etsy jewelry collection.`,
      sku: createSku(product, index),
      audience: usAudience,
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
        eligibleRegion: usCountry,
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
        areaServed: usCountry,
        sameAs: [shopUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'NovaVentory',
        url: siteUrl,
        description: siteDescription,
        inLanguage: siteLanguage,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      ...(page.path
        ? [
            {
              '@type': 'CollectionPage',
              '@id': `${pageUrl}#webpage`,
              name: pageName,
              url: pageUrl,
              description: pageDescription,
              primaryImageOfPage: pageImage,
              inLanguage: siteLanguage,
              audience: usAudience,
              isPartOf: {
                '@id': `${siteUrl}/#website`,
              },
              publisher: {
                '@id': `${siteUrl}/#organization`,
              },
            },
          ]
        : []),
      {
        '@type': 'Store',
        '@id': `${siteUrl}/#store`,
        name: 'NovaVentory',
        url: siteUrl,
        image: absoluteUrl('/og-novaventory.jpg'),
        description: siteDescription,
        priceRange: '$$',
        areaServed: usCountry,
        availableLanguage: {
          '@type': 'Language',
          name: 'English',
        },
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
            name: page.path ? pageName : 'Featured Products',
            item: page.path ? pageUrl : `${siteUrl}/#products`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#featured-products`,
        name: pageName,
        audience: usAudience,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: product.href,
          name: product.name,
        })),
      },
      ...(page.faq?.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl}#faq`,
              mainEntity: page.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
      ...productGraph,
    ],
  }
}

export const metaPixelId = '1721526562622331'

export const trackMetaPixel = (eventName, parameters = {}) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return
  }

  window.fbq('track', eventName, parameters)
}

export const trackMetaPixelCustom = (eventName, parameters = {}) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return
  }

  window.fbq('trackCustom', eventName, parameters)
}

export const createProductEventParameters = (product) => ({
  content_name: product.name,
  content_type: 'product',
  content_ids: [product.path],
  value: Number.parseFloat(product.price.replace(/[^0-9.]/g, '')),
  currency: 'USD',
})

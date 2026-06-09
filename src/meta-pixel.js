export const metaPixelId = '1721526562622331'

let pixelInitialized = false
const queuedEvents = []

const loadMetaPixelScript = () => {
  if (document.querySelector('script[data-meta-pixel="true"]')) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.dataset.metaPixel = 'true'
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)
}

const flushQueuedEvents = () => {
  queuedEvents.splice(0).forEach(([method, eventName, parameters]) => {
    window.fbq(method, eventName, parameters)
  })
}

export const initMetaPixel = () => {
  if (
    pixelInitialized ||
    typeof window === 'undefined' ||
    typeof document === 'undefined'
  ) {
    return
  }

  pixelInitialized = true

  const startPixel = () => {
    window.fbq =
      window.fbq ||
      function fbq() {
        window.fbq.queue.push(arguments)
      }
    window.fbq.queue = window.fbq.queue || []
    window.fbq.loaded = true
    window.fbq.version = '2.0'
    window._fbq = window._fbq || window.fbq

    loadMetaPixelScript()
    window.fbq('init', metaPixelId)
    window.fbq('track', 'PageView')
    flushQueuedEvents()
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startPixel, { timeout: 2500 })
    return
  }

  window.setTimeout(startPixel, 1800)
}

export const trackMetaPixel = (eventName, parameters = {}) => {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.fbq !== 'function') {
    queuedEvents.push(['track', eventName, parameters])
    initMetaPixel()
    return
  }

  window.fbq('track', eventName, parameters)
}

export const trackMetaPixelCustom = (eventName, parameters = {}) => {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.fbq !== 'function') {
    queuedEvents.push(['trackCustom', eventName, parameters])
    initMetaPixel()
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

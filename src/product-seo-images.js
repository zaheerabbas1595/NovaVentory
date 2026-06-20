export const defaultSeoImage = {
  path: '/images/viking-raven-bracelet.jpg',
  alt: 'NovaVentory Viking raven bracelet product photo',
}

export const productSeoImages = {
  'Viking Twisted Cuff Bracelet, 316L Stainless Steel Norse Bangle': {
    path: '/images/viking-twisted-cuff.jpg',
    fileName: 'viking-twisted-cuff.jpg',
    alt: 'Viking twisted stainless steel cuff bracelet on dark wood',
  },
  'Wolf Fang Pendant Necklace, Stainless Steel Viking Wolf Tooth': {
    path: '/images/wolf-fang-pendant.jpg',
    fileName: 'wolf-fang-pendant.jpg',
    alt: 'Stainless steel wolf fang Viking pendant necklace close-up',
  },
  'Viking Leather Bracelet, Braided Black Leather Chain': {
    path: '/images/viking-leather-bracelet.jpg',
    fileName: 'viking-leather-bracelet.jpg',
    alt: 'Braided black leather Viking bracelet with metal chain detail',
  },
  'Norse Raven Cuff Bracelet, Stainless Steel Viking Bangle': {
    path: '/images/norse-raven-cuff.jpg',
    fileName: 'norse-raven-cuff.jpg',
    alt: 'Norse raven stainless steel Viking cuff bracelet',
  },
  'Viking Raven Bracelet, Stainless Steel Norse Cuff Wristband': {
    path: '/images/viking-raven-bracelet.jpg',
    fileName: 'viking-raven-bracelet.jpg',
    alt: 'Viking raven stainless steel Norse cuff bracelet',
  },
  "Oversized Satin Bow Hair Clip, Retro Barrette Women's Accessory": {
    path: '/images/satin-bow-hair-clip.jpg',
    fileName: 'satin-bow-hair-clip.jpg',
    alt: 'Oversized satin bow hair clip product photo',
  },
  "Men's Viking Dragon Bracelet, Stainless Steel Nordic Cuff": {
    path: '/images/viking-dragon-bracelet.jpg',
    fileName: 'viking-dragon-bracelet.jpg',
    alt: 'Men’s Viking dragon stainless steel Nordic cuff bracelet',
  },
  'Odin Raven Necklace, Huginn Muninn Viking Pendant': {
    path: '/images/odin-raven-necklace.jpg',
    fileName: 'odin-raven-necklace.jpg',
    alt: 'Odin raven Huginn Muninn Viking pendant necklace',
  },
}

export const getProductSeoImage = (productName) =>
  productSeoImages[productName] || defaultSeoImage

export const getPageSeoImage = (page = {}) => {
  const productName =
    page.productName ||
    page.heroProductName ||
    page.productNames?.[0]

  return productName ? getProductSeoImage(productName) : defaultSeoImage
}

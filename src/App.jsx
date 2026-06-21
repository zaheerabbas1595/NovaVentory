import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gem,
  Headphones,
  Menu,
  Play,
  Search,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import './App.css'
import {
  createProductEventParameters,
  initMetaPixel,
  trackMetaPixel,
  trackMetaPixelCustom,
} from './meta-pixel'
import { createStructuredData, shopUrl, updateDocumentSeo } from './seo'
import { defaultSeoImage, getPageSeoImage, getProductSeoImage } from './product-seo-images'

import etsyTwistedCuff from './assets/etsy-listings/viking-twisted-cuff.jpg'
import etsyWolfFang from './assets/etsy-listings/wolf-fang-pendant.jpg'
import etsyLeatherBracelet from './assets/etsy-listings/viking-leather-bracelet.jpg'
import etsyNorseRavenCuff from './assets/etsy-listings/norse-raven-cuff.jpg'
import etsyVikingRavenBracelet from './assets/etsy-listings/viking-raven-bracelet.jpg'
import etsySatinBowClip from './assets/etsy-listings/satin-bow-hair-clip.jpg'
import etsyDragonBracelet from './assets/etsy-listings/viking-dragon-bracelet.jpg'
import etsyOdinRavenNecklace from './assets/etsy-listings/odin-raven-necklace.jpg'

const heroSlides = [
  {
    eyebrow: 'Best-selling product reel',
    title: ['Viking Bracelet', 'Customer Favorite'],
    text: 'Watch the featured Reel for the piece customers keep choosing, then shop the full NovaVentory Etsy edit.',
    buttonLabel: 'Shop Best Sellers',
    image: etsyLeatherBracelet,
    accent: etsyTwistedCuff,
    videoSrc: '/videos/bestseller-raven-bracelet.mp4',
  },
  {
    eyebrow: 'Statement bracelets',
    title: ['Raven Bracelets', 'With Nordic Detail'],
    text: 'Leather wraps, engraved metal plates, and dark finishes bring Viking character to everyday styling.',
    buttonLabel: 'Explore Featured Products',
    image: etsyNorseRavenCuff,
    accent: etsyVikingRavenBracelet,
  },
  {
    eyebrow: 'Forged cuff style',
    title: ['Silver Cuffs', 'For A Viking Look'],
    text: 'Twisted metal forms and carved animal-head details give every bracelet a strong old-world presence.',
    buttonLabel: 'Shop Featured Products',
    image: etsyTwistedCuff,
    accent: etsyDragonBracelet,
  },
  {
    eyebrow: 'Torque bracelet edit',
    title: ['Braided Torques', 'Built To Stand Out'],
    text: 'Dark oxidized texture, Nordic shaping, and sculptural ends create bracelets with unmistakable Viking energy.',
    buttonLabel: 'See Featured Products',
    image: etsyVikingRavenBracelet,
    accent: etsyLeatherBracelet,
  },
  {
    eyebrow: 'Rugged jewelry edit',
    title: ['Norse Bracelets', 'And Necklaces'],
    text: 'A focused collection of Viking-inspired wristwear and raven pendants made for confident daily wear.',
    buttonLabel: 'Browse Featured Products',
    image: etsyOdinRavenNecklace,
    accent: etsyWolfFang,
  },
]

const products = [
  {
    path: '/products/viking-twisted-cuff-bracelet',
    name: 'Viking Twisted Cuff Bracelet, 316L Stainless Steel Norse Bangle',
    price: '$34.20',
    oldPrice: '$38.00',
    badge: '10% off',
    image: etsyTwistedCuff,
    href: 'https://www.etsy.com/listing/4472255350/viking-twisted-cuff-bracelet-316l',
  },
  {
    path: '/products/wolf-fang-pendant-necklace',
    name: 'Wolf Fang Pendant Necklace, Stainless Steel Viking Wolf Tooth',
    price: '$32.40',
    oldPrice: '$36.00',
    badge: '10% off',
    image: etsyWolfFang,
    href: 'https://www.etsy.com/listing/4471749819/wolf-fang-pendant-necklace-men-stainless',
  },
  {
    path: '/products/viking-leather-bracelet',
    name: 'Viking Leather Bracelet, Braided Black Leather Chain',
    price: '$34.20',
    oldPrice: '$38.00',
    badge: '10% off',
    image: etsyLeatherBracelet,
    href: 'https://www.etsy.com/listing/4464869860/viking-leather-bracelet-men-braided',
  },
  {
    path: '/products/norse-raven-cuff-bracelet',
    name: 'Norse Raven Cuff Bracelet, Stainless Steel Viking Bangle',
    price: '$30.60',
    oldPrice: '$34.00',
    badge: '10% off',
    image: etsyNorseRavenCuff,
    href: 'https://www.etsy.com/listing/4481078347/norse-raven-cuff-bracelet-men-stainless',
  },
  {
    path: '/products/viking-raven-bracelet',
    name: 'Viking Raven Bracelet, Stainless Steel Norse Cuff Wristband',
    price: '$30.60',
    oldPrice: '$34.00',
    badge: '10% off',
    image: etsyVikingRavenBracelet,
    href: 'https://www.etsy.com/listing/4433569216/viking-raven-bracelet-for-men-stainless',
  },
  {
    path: '/products/satin-bow-hair-clip',
    name: "Oversized Satin Bow Hair Clip, Retro Barrette Women's Accessory",
    price: '$23.40',
    oldPrice: '$26.00',
    badge: '10% off',
    image: etsySatinBowClip,
    href: 'https://www.etsy.com/listing/4442382703/satin-bow-hair-clip-for-women-large',
  },
  {
    path: '/products/viking-dragon-bracelet',
    name: "Men's Viking Dragon Bracelet, Stainless Steel Nordic Cuff",
    price: '$34.20',
    oldPrice: '$38.00',
    badge: '10% off',
    image: etsyDragonBracelet,
    href: 'https://www.etsy.com/listing/4455935876/mens-viking-dragon-bracelet-stainless',
  },
  {
    path: '/products/odin-raven-necklace',
    name: 'Odin Raven Necklace, Huginn Muninn Viking Pendant',
    price: '$31.50',
    oldPrice: '$35.00',
    badge: '10% off',
    image: etsyOdinRavenNecklace,
    href: 'https://www.etsy.com/listing/4459280295/nordic-mythology-odin-raven-necklace',
  },
]

const services = [
  {
    title: 'Amazing Value Every Day',
    text: 'Luxury finishes, fair prices, and seasonal edits.',
    icon: Gem,
  },
  {
    title: 'Successful Customer Service',
    text: 'A friendly support team for orders and sizing.',
    icon: Headphones,
  },
  {
    title: 'All Payment Methods',
    text: 'Pay securely with cards, wallets, or installments.',
    icon: CreditCard,
  },
  {
    title: 'Completely Free Shipping',
    text: 'Complimentary delivery on qualifying orders.',
    icon: Truck,
  },
]

const homePageMeta = {
  path: '/',
  title: 'Viking Jewelry & Viking Bracelets | Norse Necklaces | NovaVentory',
  description:
    'Shop NovaVentory Viking jewelry for US shoppers on Etsy, including Viking bracelets, Norse cuffs, raven jewelry, wolf fang necklaces, Odin pendants, and Nordic stainless steel accessories with USD pricing and free USA shipping.',
  heading: 'Viking Jewelry And Viking Bracelets',
  image: defaultSeoImage.path,
  imageAlt: defaultSeoImage.alt,
  faq: [
    {
      question: 'What Viking jewelry does NovaVentory sell?',
      answer:
        'NovaVentory focuses on Viking-inspired bracelets, Norse cuffs, raven jewelry, Odin raven necklaces, wolf fang pendants, dragon bracelets, and Nordic stainless steel accessories sold through Etsy.',
    },
    {
      question: 'Which NovaVentory page is best for Viking bracelet searches?',
      answer:
        'The Viking Bracelet page is the main hub for Viking bracelet searches, while the leather bracelet, cuff bracelet, raven bracelet, and stainless steel bracelet pages support more specific buying intent.',
    },
    {
      question: 'Are NovaVentory products purchased on this website?',
      answer:
        'NovaVentory product pages link to active Etsy listings, where shoppers can review current pricing, shipping details, availability, and checkout options.',
    },
  ],
}

const homeCollections = [
  {
    title: 'Viking Bracelets',
    kicker: 'Best sellers',
    href: '/viking-bracelet',
    image: etsyVikingRavenBracelet,
    text: 'Cuffs, raven bracelets, leather wristwear, and dragon designs for the strongest bracelet search intent.',
  },
  {
    title: 'Viking Leather Bracelets',
    kicker: 'Black leather',
    href: '/viking-leather-bracelets',
    image: etsyLeatherBracelet,
    text: 'Braided black leather styles for shoppers who want daily comfort with rugged Norse character.',
  },
  {
    title: 'Viking Arm Rings',
    kicker: 'Forged cuffs',
    href: '/viking-arm-ring',
    image: etsyTwistedCuff,
    text: 'Open cuff and bangle styles with twisted metal, raven motifs, and stainless steel structure.',
  },
  {
    title: 'Raven Jewelry',
    kicker: 'Odin symbols',
    href: '/raven-jewelry',
    image: etsyNorseRavenCuff,
    text: 'Raven bracelets, Norse raven cuffs, and Odin raven necklaces connected by mythology and symbolism.',
  },
  {
    title: 'Viking Necklaces',
    kicker: 'Pendants',
    href: '/viking-necklaces',
    image: etsyOdinRavenNecklace,
    text: 'Wolf fang pendants and Odin raven necklaces for shoppers who prefer symbolic necklace pieces.',
  },
  {
    title: 'Viking Gifts For Men',
    kicker: 'Gift guide',
    href: '/blog/viking-jewelry-gifts-for-men',
    image: etsyDragonBracelet,
    text: 'A buying guide for matching leather, steel, raven, dragon, and necklace designs to the right person.',
  },
]

const homeSeoBlocks = [
  {
    title: 'A Focused Viking Jewelry Storefront',
    body: 'NovaVentory is built around a tighter Viking jewelry collection rather than a broad fashion catalog. The strongest categories are Viking bracelets, Norse cuffs, raven jewelry, stainless steel wristwear, wolf fang pendants, and Odin raven necklaces. That focus helps shoppers compare related pieces without moving through unrelated jewelry styles.',
  },
  {
    title: 'Bracelet Search Intent Comes First',
    body: 'Most shoppers who search for Viking jewelry are looking for a clear product shape: a bracelet, cuff, arm ring, necklace, or pendant. NovaVentory separates those paths into dedicated category pages so a search for Viking leather bracelet, Viking cuff bracelet, raven bracelet, or stainless steel Viking bracelet can land on the most relevant URL.',
  },
  {
    title: 'Guides Support The Product Pages',
    body: 'The guide section explains Viking bracelet meaning, raven symbolism, stainless steel versus leather, styling advice, and gift choices. These articles strengthen the product pages because they answer questions shoppers ask before buying, while internal links point back to the most relevant bracelet and necklace pages.',
  },
]

const scrollRevealSelector = [
  '.editorial-split > *',
  '.home-collection-hub .section-title',
  '.collection-hub-card',
  '.products-section .section-title',
  '.product-card',
  '.testimonial-section .section-title',
  '.testimonial-card',
  '.home-seo-story > div',
  '.seo-story-grid article',
  '.campaign-band',
  '.feature-row > *',
  '.service-item',
  '.home-faq .section-title',
  '.faq-list details',
  '.collection-content',
  '.collection-keywords span',
  '.collection-copy-grid article',
  '.collection-products .section-title',
  '.collection-links a',
  '.product-detail-image',
  '.product-detail-copy',
  '.blog-grid',
  '.blog-card',
  '.blog-article header',
  '.blog-article-image',
  '.blog-article section',
  '.blog-product-feature',
  '.blog-product-feature a',
  '.legal-content',
  '.legal-section',
].join(', ')

const shopMenuItems = [
  {
    label: 'Featured Products',
    href: '/#products',
    text: 'Customer-favorite Viking pieces',
  },
  {
    label: 'Bracelets',
    href: '/bracelets',
    text: 'Cuffs, leather, raven and dragon designs',
  },
  {
    label: 'Viking Jewelry',
    href: '/viking-jewelry',
    text: 'Full Norse-inspired collection',
  },
  {
    label: 'Viking Necklaces',
    href: '/viking-necklaces',
    text: 'Raven, wolf fang and Odin pendants',
  },
  {
    label: 'Raven Jewelry',
    href: '/raven-jewelry',
    text: 'Symbolic raven bracelets and necklaces',
  },
]

const guideMenuItems = [
  {
    label: 'Viking Bracelet Meaning',
    href: '/blog/what-does-a-viking-bracelet-mean',
  },
  {
    label: 'Raven Symbol Guide',
    href: '/blog/raven-symbol-meaning-in-norse-jewelry',
  },
  {
    label: 'Bracelet Styling',
    href: '/blog/how-to-style-a-viking-bracelet',
  },
]

const headerQuickLinks = [
  { label: 'Reviews', href: '/#reviews' },
  { label: 'About', href: '/about' },
]

const headerSearchEntries = [
  ...products.map((product) => ({
    label: product.name,
    href: product.path,
    type: 'Product',
    meta: product.price,
    keywords: product.name,
  })),
  { label: 'Viking Bracelets', href: '/bracelets', type: 'Collection', keywords: 'bracelet bracelets cuff cuffs arm ring stainless steel leather raven dragon' },
  { label: 'Viking Jewelry', href: '/viking-jewelry', type: 'Collection', keywords: 'viking jewelry norse nordic accessories' },
  { label: 'Raven Jewelry', href: '/raven-jewelry', type: 'Collection', keywords: 'raven odin huginn muninn bracelet necklace' },
  { label: 'Viking Necklaces', href: '/viking-necklaces', type: 'Collection', keywords: 'necklace necklaces pendant pendants wolf fang odin raven' },
  { label: 'Norse Jewelry Guides', href: '/blog', type: 'Guide', keywords: 'guide blog meaning styling viking bracelet raven symbol' },
]

const popularSearchEntries = headerSearchEntries.slice(0, 5)

const normalizeSearchText = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const getHeaderSearchResults = (query) => {
  const terms = normalizeSearchText(query).split(' ').filter(Boolean)

  if (!terms.length) {
    return popularSearchEntries
  }

  return headerSearchEntries
    .map((entry) => {
      const haystack = normalizeSearchText(
        `${entry.label} ${entry.type} ${entry.keywords}`,
      )
      const score = terms.reduce((total, term) => {
        if (normalizeSearchText(entry.label).includes(term)) {
          return total + 3
        }

        if (haystack.includes(term)) {
          return total + 1
        }

        return total
      }, 0)

      return { ...entry, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((firstEntry, secondEntry) => secondEntry.score - firstEntry.score)
    .slice(0, 6)
}

const legalPages = {
  '/about': {
    title: 'About NovaVentory | Viking Jewelry On Etsy',
    description:
      'Learn about NovaVentory, an Etsy-based jewelry shop focused on Viking bracelets, Norse necklaces, raven jewelry, and Nordic accessories.',
    eyebrow: 'About NovaVentory',
    heading: 'About NovaVentory',
    updatedLabel: 'Last reviewed',
    updated: 'June 9, 2026',
    sections: [
      {
        title: 'Who We Are',
        body: [
          'NovaVentory is an Etsy-based jewelry shop focused on Viking-inspired bracelets, Norse necklaces, raven jewelry, stainless steel cuffs, and Nordic accessories.',
          'This website is built as a product guide and storefront preview. It helps visitors compare styles, read buying guides, and reach the active NovaVentory Etsy listings for checkout.',
        ],
      },
      {
        title: 'What We Sell',
        body: [
          'The collection highlights everyday jewelry with Norse character: raven bracelets, dragon cuffs, wolf fang pendants, Odin raven necklaces, braided leather bracelets, and stainless steel Viking pieces.',
          'Each product page links to the matching Etsy listing so shoppers can review current availability, shipping details, pricing, and checkout options before buying.',
        ],
      },
      {
        title: 'Our Content',
        body: [
          'NovaVentory publishes original product descriptions and style guides for shoppers interested in Viking jewelry, bracelet styling, Norse symbolism, gift ideas, and material comparisons.',
          'Our goal is to make the site useful before a purchase, not only to send visitors to a product page.',
        ],
      },
      {
        title: 'Editorial Standards',
        body: [
          'Every guide is written for shoppers who need practical help before buying: sizing, materials, care, symbolism, styling, shipping expectations, and gift decisions.',
          'We avoid claiming museum-level historical accuracy for modern accessories. When a design is Viking-inspired, Norse-inspired, or symbolic, we describe it that way so visitors can understand the style honestly.',
        ],
      },
      {
        title: 'Support And Transparency',
        body: [
          'Visitors can use the Contact page for product questions, sizing help, collaboration requests, or general support before visiting Etsy.',
          'Order-specific checkout, payment, tax, and delivery details are confirmed through Etsy because that is where the final purchase is completed.',
        ],
      },
    ],
    actions: [
      { label: 'Browse Products', href: '/#products' },
      { label: 'Visit Etsy Shop', href: shopUrl, external: true },
    ],
  },
  '/contact': {
    title: 'Contact NovaVentory | Etsy Shop Support',
    description:
      'Contact NovaVentory for product questions, order support, shipping questions, and Etsy listing help.',
    eyebrow: 'Contact NovaVentory',
    heading: 'Contact NovaVentory',
    updatedLabel: 'Last reviewed',
    updated: 'June 9, 2026',
    sections: [
      {
        title: 'Best Way To Contact Us',
        body: [
          'For the fastest help with an order, product question, return, sizing question, or shipping issue, contact NovaVentory through Etsy messages.',
          'Using Etsy messages keeps your question connected to the relevant listing or order and helps us review the correct purchase details.',
        ],
      },
      {
        title: 'Product And Order Questions',
        body: [
          'You can ask about Viking bracelet sizing, necklace materials, shipping availability, current discounts, product photos, or order status before or after checkout.',
          'Final checkout, payment, tax, and order confirmation details are handled through Etsy.',
        ],
      },
      {
        title: 'Response Notes',
        body: [
          'We aim to respond to genuine customer and product questions as soon as possible through Etsy. Response times may vary during weekends, holidays, or high-volume sales periods.',
          'Please do not send sensitive payment information through this website. Payments are handled securely on Etsy.',
        ],
      },
    ],
    form: {
      title: 'Send Us A Message',
      intro:
        'Use this form for product questions, sizing help, collaboration requests, or general NovaVentory support.',
      src: 'https://tally.so/embed/aQkE5v?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1',
      fallbackUrl: 'https://tally.so/r/aQkE5v',
    },
    actions: [{ label: 'Message On Etsy', href: shopUrl, external: true }],
  },
  '/privacy-policy': {
    title: 'Privacy Policy | NovaVentory',
    description:
      'Privacy Policy for NovaVentory, including website cookies, Google advertising disclosures, Meta Pixel, and Etsy checkout information.',
    eyebrow: 'Privacy Policy',
    heading: 'Privacy Policy',
    updated: 'June 9, 2026',
    sections: [
      {
        title: 'Overview',
        body: [
          'NovaVentory is an Etsy-based jewelry shop. This website introduces our products and links visitors to Etsy to view listings or complete purchases.',
          'This policy explains the limited information handled by this website and how order-related information may be handled through Etsy.',
        ],
      },
      {
        title: 'Information We May Receive',
        body: [
          'When you visit this website, basic technical information such as browser type, device type, referring pages, and general usage activity may be processed by our hosting and analytics providers.',
          'When you buy from NovaVentory on Etsy, Etsy may provide order details needed to fulfill and support your purchase, such as your name, shipping address, selected item, and order messages.',
        ],
      },
      {
        title: 'Payments',
        body: [
          'Payments are handled through Etsy and its payment partners. NovaVentory does not collect or store full payment card details on this website.',
        ],
      },
      {
        title: 'How Information Is Used',
        body: [
          'Order information is used to process purchases, arrange shipping, answer support questions, manage returns or order issues, and keep records required for business, tax, or legal reasons.',
          'Website information may be used to maintain site performance, improve product presentation, and understand general visitor interest.',
        ],
      },
      {
        title: 'Sharing Information',
        body: [
          'Information may be shared with Etsy, shipping providers, hosting providers, analytics services, and professional advisers when needed to operate the shop, fulfill orders, or comply with obligations.',
          'NovaVentory does not sell personal information from this website.',
        ],
      },
      {
        title: 'Cookies And Third-Party Services',
        body: [
          'This website may use essential hosting technologies and third-party services, including Meta Pixel, to understand page visits, product interest, and clicks from this website to NovaVentory Etsy listings.',
          'If Google advertising services are added to this website, Google and its partners may use cookies, web beacons, IP addresses, or other identifiers to serve ads, measure ad performance, prevent fraud, and understand visits to this website.',
          'Third parties, including Google, may place and read cookies on your browser or use web beacons or IP addresses as a result of ad serving on this website. You can learn more at https://policies.google.com/technologies/partner-sites.',
          'Meta Pixel may use cookies or similar technologies to help measure ad performance and build advertising audiences. Etsy may use its own cookies and tracking technologies when you visit Etsy pages from links on this site.',
        ],
      },
      {
        title: 'Your Choices',
        body: [
          'You can contact NovaVentory through the Etsy shop if you need help with an order or want to ask about personal information connected to an Etsy purchase.',
          'You can also manage Etsy account and privacy settings directly through Etsy.',
          'You can manage browser cookies through your browser settings and review Google advertising controls through Google account and ad settings where available.',
        ],
      },
    ],
  },
  '/shipping-and-returns': {
    title: 'Shipping And Returns | NovaVentory',
    description:
      'Read NovaVentory shipping, delivery, return, and order support notes for Etsy purchases and Viking jewelry product questions.',
    eyebrow: 'Shipping And Returns',
    heading: 'Shipping And Returns',
    updated: 'June 21, 2026',
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
    actions: [
      { label: 'Contact Support', href: '/contact' },
      { label: 'Visit Etsy Shop', href: shopUrl, external: true },
    ],
  },
  '/terms-and-conditions': {
    title: 'Terms And Conditions | NovaVentory',
    description:
      'Terms and Conditions for using the NovaVentory website and shopping NovaVentory products through Etsy.',
    eyebrow: 'Terms And Conditions',
    heading: 'Terms And Conditions',
    updated: 'May 26, 2026',
    sections: [
      {
        title: 'Overview',
        body: [
          'These terms apply to your use of the NovaVentory website. Product purchases are completed on Etsy and may also be governed by Etsy policies and the terms shown on each Etsy listing.',
        ],
      },
      {
        title: 'Product Information',
        body: [
          'We aim to present product names, images, pricing, availability, and descriptions accurately. Final product details, checkout totals, shipping estimates, and available options are shown on Etsy at the time of purchase.',
          'Colors and finishes may appear slightly different depending on device screens, lighting, and product photography.',
        ],
      },
      {
        title: 'Orders And Payments',
        body: [
          'Orders are placed through Etsy. Etsy and its payment partners process checkout, taxes, payment authorization, and order confirmations.',
          'NovaVentory may refuse or cancel an order when required by Etsy policy, payment issues, suspected fraud, inventory errors, or other reasonable business reasons.',
        ],
      },
      {
        title: 'Shipping',
        body: [
          'Shipping details, delivery estimates, and destination availability are shown on Etsy listings and during checkout. Delivery dates are estimates and may be affected by carrier delays, customs processing, holidays, or incorrect shipping information.',
        ],
      },
      {
        title: 'Returns And Order Issues',
        body: [
          'Return, exchange, cancellation, and refund eligibility is shown on the relevant Etsy listing and order page. If there is a problem with an order, contact NovaVentory through Etsy messages so the issue can be reviewed.',
        ],
      },
      {
        title: 'Website Use',
        body: [
          'You may use this website for lawful personal shopping and product discovery. You may not misuse the website, attempt to interfere with its operation, or copy site content for deceptive or competing uses.',
        ],
      },
      {
        title: 'Limitation Of Liability',
        body: [
          'This website is provided as an informational storefront. To the fullest extent allowed by law, NovaVentory is not responsible for indirect, incidental, or consequential losses related to website use, third-party platforms, shipping providers, or external links.',
        ],
      },
      {
        title: 'Changes To These Terms',
        body: [
          'NovaVentory may update these terms from time to time. The updated date on this page shows when the terms were last revised.',
        ],
      },
    ],
  },
}

const testimonials = [
  {
    name: 'Aiden Brooks',
    location: 'Denver, CO',
    review:
      'The Viking bracelet feels substantial without being heavy. The carved detail looks even better in person.',
  },
  {
    name: 'Maya Sterling',
    location: 'Austin, TX',
    review:
      'I bought the raven necklace as a gift and the finish was beautiful. It arrived ready to wear and felt premium.',
  },
  {
    name: 'Lucas Ward',
    location: 'Seattle, WA',
    review:
      'The torque bracelet has that Viking look I wanted, but it still works with everyday outfits.',
  },
  {
    name: 'Nora Bennett',
    location: 'Chicago, IL',
    review:
      'The necklace chain is strong, the pendant is clean, and the Nordic styling feels authentic without being loud.',
  },
  {
    name: 'Ethan Cole',
    location: 'Boston, MA',
    review:
      'My bracelet has held up through daily wear. No dulling, no rough edges, just a really solid piece.',
  },
  {
    name: 'Priya Shah',
    location: 'New York, NY',
    review:
      'The Viking necklace became my favorite layering piece. It adds character without overpowering the rest.',
  },
  {
    name: 'Caleb Turner',
    location: 'Nashville, TN',
    review:
      'Great weight, clean engraving, and a secure clasp. The bracelet feels built to last.',
  },
  {
    name: 'Isla Morgan',
    location: 'Portland, OR',
    review:
      'I love the old-world feel of the bracelet. It looks handmade and still feels polished.',
  },
  {
    name: 'Rowan Pierce',
    location: 'Phoenix, AZ',
    review:
      'The raven necklace gets compliments every time I wear it. The details are sharp and the metal tone is perfect.',
  },
  {
    name: 'Sofia Reed',
    location: 'Miami, FL',
    review:
      'I ordered matching Viking bracelets for my partner and me. Both fit well and feel incredibly sturdy.',
  },
  {
    name: 'Marcus Hale',
    location: 'San Diego, CA',
    review:
      'The bracelet has a rugged look, but the finish is smooth enough for all-day wear.',
  },
  {
    name: 'Lena Frost',
    location: 'Minneapolis, MN',
    review:
      'The necklace pendant has a beautiful Nordic pattern. It feels meaningful, not costume-like.',
  },
  {
    name: 'Owen Blake',
    location: 'Charlotte, NC',
    review:
      'I wanted a Viking bracelet that felt bold but not bulky. This one got the balance exactly right.',
  },
  {
    name: 'Amelia Knox',
    location: 'Dallas, TX',
    review:
      'The necklace packaging was lovely and the piece itself looked more expensive than I expected.',
  },
  {
    name: 'Henry Vale',
    location: 'Salt Lake City, UT',
    review:
      'The bracelet engraving is deep and crisp. It has a strong Viking style without feeling oversized.',
  },
  {
    name: 'Zara Quinn',
    location: 'Atlanta, GA',
    review:
      'My Viking necklace has become a daily staple. It sits nicely and keeps its shine.',
  },
  {
    name: 'Miles Archer',
    location: 'Madison, WI',
    review:
      'The cuff bracelet feels powerful and refined at the same time. Exactly what I hoped for.',
  },
  {
    name: 'Grace Lin',
    location: 'San Jose, CA',
    review:
      'I bought the necklace for my brother and he wears it constantly. The pendant design is excellent.',
  },
  {
    name: 'Finn Carter',
    location: 'Tampa, FL',
    review:
      'The Viking bracelet has a nice antique character and the size was easy to adjust.',
  },
  {
    name: 'Elena Hart',
    location: 'Raleigh, NC',
    review:
      'Beautiful craftsmanship. The necklace feels personal and the Nordic motif is very clean.',
  },
  {
    name: 'Theo James',
    location: 'Columbus, OH',
    review:
      'The bracelet looks strong, fits comfortably, and has become my favorite accessory.',
  },
  {
    name: 'Ruby Stone',
    location: 'Sacramento, CA',
    review:
      'The Viking necklace has a rich finish and enough detail to stand out in a simple outfit.',
  },
  {
    name: 'Jack Ellis',
    location: 'Kansas City, MO',
    review:
      'Excellent bracelet for the price. The design feels inspired by Viking craft, not mass-produced.',
  },
  {
    name: 'Mila West',
    location: 'Philadelphia, PA',
    review:
      'I came back for a second necklace because the first one wore so well. Beautiful pieces.',
  },
]

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 8)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const closeDropdownTimerRef = useRef(null)
  const searchResults = getHeaderSearchResults(searchQuery)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(
    () => () => {
      if (closeDropdownTimerRef.current) {
        window.clearTimeout(closeDropdownTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('mobile-menu-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const openDropdown = (dropdownName) => {
    if (closeDropdownTimerRef.current) {
      window.clearTimeout(closeDropdownTimerRef.current)
    }

    setActiveDropdown(dropdownName)
  }

  const scheduleDropdownClose = () => {
    if (closeDropdownTimerRef.current) {
      window.clearTimeout(closeDropdownTimerRef.current)
    }

    closeDropdownTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null)
    }, 320)
  }

  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      scheduleDropdownClose()
    }
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const query = String(formData.get('site-search') || searchQuery).trim()
    const [firstResult] = getHeaderSearchResults(query)

    window.location.href = firstResult?.href || '/#products'
  }

  const handleSearchBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsSearchOpen(false)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setIsSearchOpen(true)
  }

  const handleSearchResultClick = () => {
    setIsSearchOpen(false)
    closeMobileMenu()
  }

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="top-strip">
        <span>Free USA shipping</span>
        <span>Viking-inspired jewelry</span>
        <span>Secure Etsy checkout</span>
      </div>
      <div className="header-shell">
        <div className="brand-row">
          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={22} />
          </button>

          <a className="brand" href="/" aria-label="NovaVentory home">
            <span className="brand-mark">NV</span>
            <span className="brand-text">
              <span>NovaVentory</span>
              <small>Viking Jewelry</small>
            </span>
          </a>

          <form
            className="header-search"
            role="search"
            onSubmit={handleSearchSubmit}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={handleSearchBlur}
          >
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">
              Search NovaVentory products
            </label>
            <input
              id="site-search"
              name="site-search"
              type="search"
              placeholder="Search bracelets, raven, necklaces"
              autoComplete="off"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-controls="header-search-results"
              aria-expanded={isSearchOpen}
            />
            <button type="submit">Search</button>
            {isSearchOpen ? (
              <div className="search-results" id="header-search-results">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <a
                      href={result.href}
                      onClick={handleSearchResultClick}
                      key={`${result.type}-${result.href}`}
                    >
                      <span>{result.type}</span>
                      <strong>{result.label}</strong>
                      {result.meta ? <small>{result.meta}</small> : null}
                    </a>
                  ))
                ) : (
                  <div className="search-empty">No matching products found</div>
                )}
              </div>
            ) : null}
          </form>

          <div className="header-actions" aria-label="Header actions">
            <a
              className="icon-action bag-action"
              href={shopUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Shop NovaVentory on Etsy"
            >
              <ShoppingBag size={20} />
              <span>0</span>
            </a>
          </div>
        </div>

        <nav className="site-nav" aria-label="Primary navigation">
          <div
            className={`nav-dropdown ${activeDropdown === 'shop' ? 'is-open' : ''}`}
            onMouseEnter={() => openDropdown('shop')}
            onMouseLeave={scheduleDropdownClose}
            onFocus={() => openDropdown('shop')}
            onBlur={handleDropdownBlur}
          >
            <button
              type="button"
              className="nav-trigger"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'shop'}
            >
              Shop
              <ChevronDown size={14} />
            </button>
            <div className="nav-menu-panel">
              {shopMenuItems.map((item) => (
                <a href={item.href} key={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>
          <div
            className={`nav-dropdown ${activeDropdown === 'guides' ? 'is-open' : ''}`}
            onMouseEnter={() => openDropdown('guides')}
            onMouseLeave={scheduleDropdownClose}
            onFocus={() => openDropdown('guides')}
            onBlur={handleDropdownBlur}
          >
            <button
              type="button"
              className="nav-trigger"
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'guides'}
            >
              Guides
              <ChevronDown size={14} />
            </button>
            <div className="nav-menu-panel compact">
              <a href="/blog">
                <strong>All Guides</strong>
                <span>Jewelry styling and symbolism</span>
              </a>
              {guideMenuItems.map((item) => (
                <a href={item.href} key={item.href}>
                  <strong>{item.label}</strong>
                </a>
              ))}
            </div>
          </div>
          {headerQuickLinks.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href={shopUrl} target="_blank" rel="noreferrer">
            Etsy
          </a>
        </nav>
      </div>

      <div
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'is-open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <aside
        className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-head">
          <a className="brand" href="/" onClick={closeMobileMenu} aria-label="NovaVentory home">
            <span className="brand-mark">NV</span>
            <span className="brand-text">
              <span>NovaVentory</span>
              <small>Viking Jewelry</small>
            </span>
          </a>
          <button
            className="mobile-menu-close"
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <form className="mobile-search" role="search" onSubmit={handleSearchSubmit}>
          <Search size={17} aria-hidden="true" />
          <label className="sr-only" htmlFor="mobile-site-search">
            Search NovaVentory products
          </label>
          <input
            id="mobile-site-search"
            name="site-search"
            type="search"
            placeholder="Search Viking jewelry"
            autoComplete="off"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

        <nav className="mobile-nav-links" aria-label="Mobile primary navigation">
          <details open>
            <summary>
              Shop
              <ChevronDown size={15} />
            </summary>
            <div>
              {shopMenuItems.map((item) => (
                <a href={item.href} onClick={closeMobileMenu} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
          <details>
            <summary>
              Guides
              <ChevronDown size={15} />
            </summary>
            <div>
              <a href="/blog" onClick={closeMobileMenu}>
                All Guides
              </a>
              {guideMenuItems.map((item) => (
                <a href={item.href} onClick={closeMobileMenu} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
          {headerQuickLinks.map((item) => (
            <a href={item.href} onClick={closeMobileMenu} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href={shopUrl} target="_blank" rel="noreferrer" onClick={closeMobileMenu}>
            Shop On Etsy
          </a>
        </nav>
      </aside>
    </header>
  )
}

function Seo({ page }) {
  useEffect(() => {
    initMetaPixel()
    updateDocumentSeo(page)
  }, [page])

  return page?.skipStructuredData ? null : (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          createStructuredData(page?.structuredProducts || products, page),
        ),
      }}
    />
  )
}

function useScrollReveal(routeKey) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const revealedElements = new WeakSet()

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll(scrollRevealSelector).forEach((element) => {
        element.classList.add('scroll-reveal', 'is-visible')
      })

      return undefined
    }

    const markVisible = (element) => {
      element.classList.add('is-visible')
    }

    const revealVisibleElements = () => {
      document.querySelectorAll('.scroll-reveal:not(.is-visible)').forEach((element) => {
        const rect = element.getBoundingClientRect()

        if (rect.top <= window.innerHeight * 1.05 && rect.bottom >= 0) {
          markVisible(element)
        }
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          markVisible(entry.target)
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px 8% 0px',
        threshold: 0.08,
      },
    )

    const revealElements = () => {
      document.querySelectorAll(scrollRevealSelector).forEach((element, index) => {
        if (revealedElements.has(element)) {
          return
        }

        element.classList.add('scroll-reveal')
        element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`)
        observer.observe(element)
        revealedElements.add(element)
      })

      window.requestAnimationFrame(revealVisibleElements)
    }

    revealElements()

    const mutationObserver = new MutationObserver(revealElements)
    mutationObserver.observe(document.getElementById('root'), {
      childList: true,
      subtree: true,
    })
    window.addEventListener('scroll', revealVisibleElements, { passive: true })
    window.addEventListener('resize', revealVisibleElements)

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('scroll', revealVisibleElements)
      window.removeEventListener('resize', revealVisibleElements)
    }
  }, [routeKey])
}

function useHashScroll(routeKey) {
  useEffect(() => {
    const scrollToHash = (behavior = 'smooth') => {
      if (!window.location.hash) {
        return
      }

      const target = document.getElementById(
        window.location.hash.replace('#', ''),
      )

      if (target) {
        target.scrollIntoView({ behavior, block: 'start' })
      }
    }

    const handleHashChange = () => scrollToHash('smooth')

    window.requestAnimationFrame(() => scrollToHash('auto'))
    const retryTimer = window.setTimeout(() => scrollToHash('auto'), 900)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.clearTimeout(retryTimer)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [routeKey])
}

const renderLegalText = (text) =>
  text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith('https://') || part.startsWith('http://')) {
      const punctuation = part.match(/[.,;:!?]+$/)?.[0] || ''
      const url = punctuation ? part.slice(0, -punctuation.length) : part

      return (
        <span key={`${url}-${index}`}>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
          {punctuation}
        </span>
      )
    }

    return (
      <span key={`${part}-${index}`}>
        {part}
      </span>
    )
  })

function LegalPage({ page }) {
  return (
    <main className="legal-page" id="main-content">
      <section className="legal-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.heading}</h1>
        <p>
          {page.updatedLabel || 'Last updated'}: {page.updated}
        </p>
        {page.actions?.length ? (
          <div className="legal-actions">
            {page.actions.map((action) => (
              <a
                className="button button-dark"
                href={action.href}
                key={action.label}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noreferrer' : undefined}
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}
      </section>

      {page.form ? (
        <section className="contact-form-band" aria-labelledby="contact-form-title">
          <div>
            <p className="eyebrow">Direct contact</p>
            <h2 id="contact-form-title">{page.form.title}</h2>
            <p>{page.form.intro}</p>
            <div className="tally-form-frame">
              <iframe
                src={page.form.src}
                title={`${page.heading} form`}
                width="100%"
                height="760"
              />
            </div>
            <p className="contact-form-fallback">
              If the form does not load, open it directly:{' '}
              <a href={page.form.fallbackUrl} target="_blank" rel="noreferrer">
                NovaVentory contact form
              </a>
              .
            </p>
          </div>
        </section>
      ) : null}

      <section className="legal-content" aria-label={page.heading}>
        {page.sections.map((section) => (
          <article className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{renderLegalText(paragraph)}</p>
            ))}
          </article>
        ))}
      </section>
    </main>
  )
}

const getProductByName = (productName) =>
  products.find((product) => product.name === productName)

const getProductsForPage = (page) =>
  page?.productNames?.map(getProductByName).filter(Boolean) || []

const getPageTitle = (path, seoPages = {}) =>
  seoPages.commercialPages?.[path]?.heading ||
  seoPages.productPages?.[path]?.heading ||
  seoPages.blogPages?.[path]?.heading ||
  path
    .replace(/^\/|\/$/g, '')
    .split('/')
    .pop()
    .replace(/-/g, ' ')

function SeoRouteLoader({ currentPath }) {
  const [seoPages, setSeoPages] = useState(null)

  useEffect(() => {
    let isMounted = true

    import('./seo-pages').then((pages) => {
      if (isMounted) {
        setSeoPages(pages)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (!seoPages) {
    return <main className="route-loading" id="main-content" aria-label="Loading page" />
  }

  const { blogPages, commercialPages, productPages } = seoPages
  const commercialPage = commercialPages[currentPath]
  const productPage = productPages[currentPath]
  const blogPage = blogPages[currentPath]
  const selectedProduct = productPage ? getProductByName(productPage.productName) : undefined
  const collectionProducts = getProductsForPage(commercialPage)
  const pageMeta = commercialPage
    ? {
        path: currentPath,
        title: commercialPage.title,
        description: commercialPage.description,
        heading: commercialPage.heading,
        image: getPageSeoImage(commercialPage).path,
        imageAlt: getPageSeoImage(commercialPage).alt,
        structuredProducts: collectionProducts,
      }
    : productPage
      ? {
          path: currentPath,
          title: productPage.title,
          description: productPage.description,
          heading: productPage.heading,
          image: getProductSeoImage(productPage.productName).path,
          imageAlt: getProductSeoImage(productPage.productName).alt,
          structuredProducts: selectedProduct ? [selectedProduct] : [],
        }
      : blogPage
        ? {
            path: currentPath,
            title: blogPage.title,
            description: blogPage.description,
            heading: blogPage.heading,
            image: getPageSeoImage(blogPage).path,
            imageAlt: getPageSeoImage(blogPage).alt,
            skipStructuredData: true,
          }
        : undefined

  return (
    <>
      <Seo page={pageMeta} />
      {commercialPage ? (
        <CollectionPage
          page={commercialPage}
          collectionProducts={collectionProducts}
          seoPages={seoPages}
        />
      ) : productPage && selectedProduct ? (
        <ProductPage page={productPage} product={selectedProduct} seoPages={seoPages} />
      ) : blogPage?.path === '/blog' ? (
        <BlogIndex page={blogPage} blogPages={blogPages} />
      ) : blogPage ? (
        <BlogPost page={blogPage} seoPages={seoPages} />
      ) : (
        <HomePage />
      )}
    </>
  )
}

function RelatedLinks({ links = [], seoPages }) {
  if (!links.length) {
    return null
  }

  return (
    <nav className="collection-links" aria-label="Related NovaVentory pages">
      {links.map((path) => (
        <a href={path} key={path}>
          {getPageTitle(path, seoPages)}
        </a>
      ))}
    </nav>
  )
}

function CollectionPage({ page, collectionProducts, seoPages }) {
  return (
    <main className="collection-page" id="main-content">
      <section className="collection-hero">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p>{page.intro}</p>
          <div className="collection-actions">
            <a className="button button-dark" href="#products">
              View Products
            </a>
            <a className="button button-ghost" href={shopUrl} target="_blank" rel="noreferrer">
              Visit Etsy Shop
            </a>
          </div>
        </div>
      </section>

      <section className="collection-content" aria-label={`${page.heading} details`}>
        <div className="collection-keywords" aria-label="Related searches">
          {page.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
        <div className="collection-copy-grid">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-section collection-products" id="products">
        <div className="section-title">
          <p className="eyebrow">NovaVentory Etsy listings</p>
          <h2>Shop {page.heading}</h2>
          <p>Focused picks from the active NovaVentory jewelry collection.</p>
        </div>
        <div className="product-grid">
          {collectionProducts.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </section>

      <RelatedLinks links={page.related} seoPages={seoPages} />
    </main>
  )
}

function ProductPage({ page, product, seoPages }) {
  useEffect(() => {
    trackMetaPixel('ViewContent', createProductEventParameters(product))
  }, [product])

  const trackEtsyClick = () => {
    trackMetaPixelCustom('EtsyOutboundClick', createProductEventParameters(product))
  }

  return (
    <main className="product-page" id="main-content">
      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p>{page.intro}</p>
          <div className="product-detail-price">
            <data value={product.price.replace('$', '')}>{product.price}</data>
            <del>{product.oldPrice}</del>
            <span>{product.badge}</span>
          </div>
          <ul>
            {page.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="collection-actions product-actions">
            <a
              className="button button-dark"
              href={product.href}
              target="_blank"
              rel="noreferrer"
              onClick={trackEtsyClick}
            >
              Buy on Etsy
            </a>
            <a className="button button-light" href="/bracelets">
              Browse Bracelets
            </a>
          </div>
        </div>
      </section>

      <section className="collection-content" aria-label={`${page.heading} details`}>
        <div className="collection-keywords" aria-label="Related searches">
          {page.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
        <div className="collection-copy-grid">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-research-notes" aria-label={`${page.heading} buying notes`}>
        <article>
          <h2>Before You Buy</h2>
          <p>
            Check the Etsy listing for current availability, exact checkout total,
            delivery estimate, and return eligibility before placing an order.
          </p>
        </article>
        <article>
          <h2>Fit And Wear</h2>
          <p>
            Compare the product shape with jewelry you already wear. Cuffs feel
            more structured, leather feels softer, and pendants are usually easier
            to gift when wrist size is unknown.
          </p>
        </article>
        <article>
          <h2>Support</h2>
          <p>
            Use the Contact page for sizing or product questions, and include the
            product name if you need help comparing {product.name}.
          </p>
        </article>
      </section>

      <RelatedLinks links={page.related} seoPages={seoPages} />
    </main>
  )
}

function BlogIndex({ page, blogPages }) {
  const posts = Object.values(blogPages).filter((post) => post.path !== '/blog')

  return (
    <main className="blog-page" id="main-content">
      <section className="blog-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.heading}</h1>
        <p>{page.intro}</p>
      </section>
      <section className="blog-grid" aria-label="Viking jewelry guides">
        {posts.map((post) => (
          <article className="blog-card" key={post.path}>
            <a className="blog-card-image" href={post.path} aria-label={post.heading}>
              <img
                src={getProductByName(post.heroProductName || post.productNames?.[0])?.image}
                alt=""
              />
            </a>
            <p className="eyebrow">{post.eyebrow}</p>
            <h2>{post.heading}</h2>
            <p>{post.intro}</p>
            <a className="inline-link" href={post.path}>
              Read guide
              <ArrowRight size={17} />
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}

function BlogProductFeature({ page }) {
  const featureProducts = getProductsForPage(page)

  if (!featureProducts.length) {
    return null
  }

  return (
    <aside className="blog-product-feature" aria-label="Featured NovaVentory products">
      <h2>Featured NovaVentory Picks</h2>
      <div>
        {featureProducts.slice(0, 3).map((product) => (
          <a href={product.path} key={product.name}>
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}

function BlogPost({ page, seoPages }) {
  const heroProduct = getProductByName(page.heroProductName || page.productNames?.[0])

  return (
    <main className="blog-page" id="main-content">
      <article className="blog-article">
        <header>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p className="article-meta">
            By NovaVentory Editorial Team · Updated {page.updated || 'June 21, 2026'}
          </p>
          <p>{page.intro}</p>
        </header>
        {heroProduct ? (
          <figure className="blog-article-image">
            <img src={heroProduct.image} alt={heroProduct.name} />
            <figcaption>{heroProduct.name}</figcaption>
          </figure>
        ) : null}
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <BlogProductFeature page={page} />
      </article>
      <RelatedLinks links={page.related} seoPages={seoPages} />
    </main>
  )
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false)
  const [videoReadySlide, setVideoReadySlide] = useState(null)
  const heroVideoRef = useRef(null)
  const slide = heroSlides[activeSlide]
  const isVideoReady = videoReadySlide === activeSlide

  const showNextSlide = useCallback(() => {
    setIsHeroVideoPlaying(false)
    setVideoReadySlide(null)
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!slide.videoSrc || isHeroVideoPlaying) {
      return undefined
    }

    const timer = window.setInterval(() => {
      showNextSlide()
    }, 5500)

    return () => window.clearInterval(timer)
  }, [isHeroVideoPlaying, slide.videoSrc, showNextSlide])

  useEffect(() => {
    if (!slide.videoSrc || !isHeroVideoPlaying) {
      return undefined
    }

    const video = heroVideoRef.current

    if (video) {
      try {
        video.currentTime = 0
      } catch {
        // Some browsers reject currentTime changes before video metadata loads.
      }

      video.play().catch(() => {
        setIsHeroVideoPlaying(false)
      })
    }

    return undefined
  }, [activeSlide, isHeroVideoPlaying, slide.videoSrc])

  const showPreviousSlide = () => {
    setIsHeroVideoPlaying(false)
    setVideoReadySlide(null)
    setActiveSlide(
      (currentSlide) =>
        (currentSlide - 1 + heroSlides.length) % heroSlides.length,
    )
  }

  const showSelectedSlide = (index) => {
    setIsHeroVideoPlaying(false)
    setVideoReadySlide(null)
    setActiveSlide(index)
  }

  const playHeroVideo = () => {
    setVideoReadySlide(null)
    setIsHeroVideoPlaying(true)
  }

  return (
    <section
      className="hero"
      id="home"
      aria-label="Featured jewelry collections"
      aria-roledescription="carousel"
    >
      <div className="hero-background" aria-hidden="true">
        {heroSlides.map((heroSlide, index) => (
          <img
            className={index === activeSlide ? 'active' : ''}
            src={heroSlide.image}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            alt=""
            key={heroSlide.eyebrow}
          />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>
            {slide.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{slide.text}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#products">
              {slide.buttonLabel}
            </a>
          </div>
        </div>
        <div className={`hero-showcase ${slide.videoSrc ? 'with-video' : ''}`}>
          {slide.videoSrc ? (
            <div className="hero-video-panel">
              <img
                className="hero-video-poster"
                src={slide.image}
                fetchPriority="high"
                alt=""
                aria-hidden="true"
              />
              {isHeroVideoPlaying ? (
                <video
                  ref={heroVideoRef}
                  className={isVideoReady ? 'is-ready' : ''}
                  src={slide.videoSrc}
                  poster={slide.image}
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedData={() => setVideoReadySlide(activeSlide)}
                  onCanPlay={() => setVideoReadySlide(activeSlide)}
                  onPlaying={() => setVideoReadySlide(activeSlide)}
                  onError={() => {
                    setVideoReadySlide(null)
                    setIsHeroVideoPlaying(false)
                  }}
                  onStalled={() => setVideoReadySlide(null)}
                  onEnded={showNextSlide}
                  aria-label="Best-selling Viking raven bracelet video"
                >
                  <track
                    kind="captions"
                    src="/videos/bestseller-raven-bracelet.vtt"
                    srcLang="en"
                    label="English captions"
                    default
                  />
                </video>
              ) : (
                <button
                  className="hero-video-play"
                  type="button"
                  onClick={playHeroVideo}
                  aria-label="Play best-selling Viking raven bracelet reel"
                >
                  <Play size={28} fill="currentColor" />
                </button>
              )}
            </div>
          ) : (
            <div className="hero-wrist-panel" aria-hidden="true">
              <span />
              <img src={slide.image} alt="" />
            </div>
          )}
          <div className="hero-accent-panel">
            <img src={slide.accent} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="hero-controls">
        <button
          className="hero-arrow"
          type="button"
          onClick={showPreviousSlide}
          aria-label="Show previous hero slide"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {heroSlides.map((heroSlide, index) => (
            <button
              className={index === activeSlide ? 'active' : ''}
              type="button"
              onClick={() => showSelectedSlide(index)}
              aria-label={`Show slide ${index + 1}: ${heroSlide.title.join(' ')}`}
              aria-selected={index === activeSlide}
              role="tab"
              key={heroSlide.eyebrow}
            />
          ))}
        </div>
        <button
          className="hero-arrow"
          type="button"
          onClick={showNextSlide}
          aria-label="Show next hero slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  )
}

function ProductCard({ product }) {
  const trackEtsyClick = () => {
    trackMetaPixelCustom('EtsyOutboundClick', createProductEventParameters(product))
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <span>{product.badge}</span>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>
          <data value={product.price.replace('$', '')}>{product.price}</data>
          <del>{product.oldPrice}</del>
        </p>
        <a
          className="product-details-link"
          href={product.path}
          aria-label={`View details for ${product.name}`}
        >
          View Details
        </a>
        <a
          className="product-buy-link"
          href={product.href}
          target="_blank"
          rel="noreferrer"
          onClick={trackEtsyClick}
          aria-label={`Buy ${product.name} on Etsy`}
        >
          Buy on Etsy
        </a>
      </div>
    </article>
  )
}

function ServiceItem({ service }) {
  const Icon = service.icon

  return (
    <article className="service-item">
      <Icon size={31} strokeWidth={1.6} aria-hidden="true" />
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </article>
  )
}

function TestimonialSlider() {
  const [activeReview, setActiveReview] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((currentReview) => (currentReview + 1) % testimonials.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const visibleReviews = [0, 1, 2].map(
    (offset) => testimonials[(activeReview + offset) % testimonials.length],
  )

  const showPreviousReview = () => {
    setActiveReview(
      (currentReview) =>
        (currentReview - 1 + testimonials.length) % testimonials.length,
    )
  }

  const showNextReview = () => {
    setActiveReview((currentReview) => (currentReview + 1) % testimonials.length)
  }

  return (
    <section className="testimonial-section" id="reviews" aria-label="Client reviews">
      <div className="section-title">
        <p className="eyebrow">Loved by Viking jewelry collectors</p>
        <h2>Client Reviews</h2>
        <p>Real feedback on our Viking bracelets and necklaces.</p>
      </div>
      <div className="testimonial-slider">
        <button
          className="testimonial-arrow"
          type="button"
          onClick={showPreviousReview}
          aria-label="Show previous reviews"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="testimonial-track">
          {visibleReviews.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div className="testimonial-stars" role="img" aria-label="Five star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star size={16} fill="currentColor" key={index} aria-hidden="true" />
                ))}
              </div>
              <p>{testimonial.review}</p>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </article>
          ))}
        </div>
        <button
          className="testimonial-arrow"
          type="button"
          onClick={showNextReview}
          aria-label="Show next reviews"
        >
          <ChevronRight size={22} />
        </button>
      </div>
      <div className="testimonial-footer">
        <span>
          {String(activeReview + 1).padStart(2, '0')} / {testimonials.length}
        </span>
        <div className="testimonial-progress" aria-hidden="true">
          <span
            style={{
              width: `${((activeReview + 1) / testimonials.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  )
}

function HomeCollectionHub() {
  return (
    <section className="home-collection-hub" aria-labelledby="home-collections-title">
      <div className="section-title">
        <p className="eyebrow">Viking jewelry categories</p>
        <h2 id="home-collections-title">Shop By Viking Jewelry Style</h2>
        <p>
          Clear paths for Viking bracelets, leather bracelets, arm rings, raven
          jewelry, necklaces, and gift guides.
        </p>
      </div>
      <div className="collection-hub-grid">
        {homeCollections.map((collection) => (
          <a className="collection-hub-card" href={collection.href} key={collection.href}>
            <img src={collection.image} alt="" loading="lazy" />
            <div>
              <small>{collection.kicker}</small>
              <span>{collection.title}</span>
              <p>{collection.text}</p>
            </div>
            <strong>
              Shop now
              <ArrowRight size={18} aria-hidden="true" />
            </strong>
          </a>
        ))}
      </div>
    </section>
  )
}

function HomeSeoStory() {
  return (
    <section className="home-seo-story" aria-labelledby="home-seo-title">
      <div>
        <p className="eyebrow">Viking store guide</p>
        <h2 id="home-seo-title">Viking Jewelry, Norse Cuffs, And Raven Bracelets</h2>
      </div>
      <div className="seo-story-grid">
        {homeSeoBlocks.map((block) => (
          <article key={block.title}>
            <h3>{block.title}</h3>
            <p>{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function HomeFaq() {
  return (
    <section className="home-faq" aria-labelledby="home-faq-title">
      <div className="section-title">
        <p className="eyebrow">Shopping questions</p>
        <h2 id="home-faq-title">Viking Jewelry FAQ</h2>
      </div>
      <div className="faq-list">
        {homePageMeta.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <main className="home-page" id="main-content">
      <Hero />

      <section className="editorial-split">
        <div className="editorial-copy">
          <p className="eyebrow">Viking winter trends</p>
          <h2>Check Nordic Trends</h2>
          <p>
            Raven motifs, black leather, and twisted metal bracelets bring a
            rugged edge to the season.
          </p>
          <a className="inline-link" href="#products">
            Explore Viking jewelry
            <ArrowRight size={17} />
          </a>
        </div>
        <a
          className="editorial-product-link"
          href="/products/viking-leather-bracelet"
          aria-label="View Viking leather bracelet product page"
        >
          <img
            src={etsyLeatherBracelet}
            alt="Viking leather bracelet listing photo"
            loading="lazy"
          />
        </a>
        <a
          className="editorial-product-link"
          href="/products/wolf-fang-pendant-necklace"
          aria-label="View wolf fang pendant necklace product page"
        >
          <img
            src={etsyWolfFang}
            alt="Wolf fang pendant necklace listing photo"
            loading="lazy"
          />
        </a>
        <a
          className="editorial-product-link"
          href="/products/norse-raven-cuff-bracelet"
          aria-label="View Norse raven cuff bracelet product page"
        >
          <img
            src={etsyNorseRavenCuff}
            alt="Norse raven cuff bracelet listing photo"
            loading="lazy"
          />
        </a>
      </section>

      <HomeCollectionHub />

      <section className="products-section" id="products">
        <div className="section-title">
          <p className="eyebrow">NovaVentory Etsy listings</p>
          <h2>Featured Products</h2>
          <p>All active shop listings with current sale pricing.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </section>

      <TestimonialSlider />

      <HomeSeoStory />

      <section className="campaign-band">
        <div>
          <span>Super discount for your first purchase</span>
          <h2>2nd shopping surprise campaign!</h2>
          <p>Use discount code in checkout page.</p>
        </div>
        <a className="button button-dark" href="#products">
          Check Products
        </a>
      </section>

      <section className="feature-row">
        <img src={etsyDragonBracelet} alt="Viking dragon bracelet listing photo" loading="lazy" />
        <div>
          <p className="eyebrow">This Month's Best Sellers</p>
          <h2>Viking Products of The Week</h2>
          <p>
            Choose a raven bracelet or Nordic necklace that brings character
            to daily wear.
          </p>
          <a className="inline-link" href="#products">
            Shop the edit
            <ArrowRight size={17} />
          </a>
        </div>
        <img src={etsyOdinRavenNecklace} alt="Odin raven necklace listing photo" loading="lazy" />
      </section>

      <section className="service-grid" aria-label="Store services">
        {services.map((service) => (
          <ServiceItem service={service} key={service.title} />
        ))}
      </section>

      <HomeFaq />
    </main>
  )
}

function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  useScrollReveal(currentPath)
  useHashScroll(currentPath)

  const legalPage = legalPages[currentPath]
  const pageMeta = legalPage
    ? {
        path: currentPath,
        title: legalPage.title,
        description: legalPage.description,
        image: defaultSeoImage.path,
        imageAlt: defaultSeoImage.alt,
        skipStructuredData: true,
      }
    : currentPath === '/'
      ? homePageMeta
    : undefined

  return (
    <>
      <Seo page={pageMeta} />
      <Header />
      {legalPage ? (
        <LegalPage page={legalPage} />
      ) : currentPath === '/' ? (
        <HomePage />
      ) : (
        <SeoRouteLoader currentPath={currentPath} />
      )}

      <footer className="footer">
        <div className="footer-brand">
          <strong>NovaVentory</strong>
          <span>Viking jewelry and accessories available on Etsy.</span>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/bracelets">Bracelets</a>
          <a href="/viking-jewelry">Viking Jewelry</a>
          <a href="/nordic-bracelet">Nordic Bracelet</a>
            <a href="/blog">Guides</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/shipping-and-returns">Shipping & Returns</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms</a>
          </nav>
        <ShieldCheck className="footer-badge" size={20} aria-hidden="true" />
      </footer>
    </>
  )
}

export default App

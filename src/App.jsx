import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gem,
  Headphones,
  Star,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import './App.css'
import { createStructuredData, shopUrl, updateDocumentSeo } from './seo'
import { commercialPages } from './seo-pages'

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
    name: 'Viking Twisted Cuff Bracelet, 316L Stainless Steel Norse Bangle',
    price: '$34.20',
    oldPrice: '$38.00',
    badge: '10% off',
    image: etsyTwistedCuff,
    href: 'https://www.etsy.com/listing/4472255350/viking-twisted-cuff-bracelet-316l',
  },
  {
    name: 'Wolf Fang Pendant Necklace, Stainless Steel Viking Wolf Tooth',
    price: '$32.40',
    oldPrice: '$36.00',
    badge: '10% off',
    image: etsyWolfFang,
    href: 'https://www.etsy.com/listing/4471749819/wolf-fang-pendant-necklace-men-stainless',
  },
  {
    name: 'Viking Leather Bracelet, Braided Black Leather Chain',
    price: '$34.20',
    oldPrice: '$38.00',
    badge: '10% off',
    image: etsyLeatherBracelet,
    href: 'https://www.etsy.com/listing/4464869860/viking-leather-bracelet-men-braided',
  },
  {
    name: 'Norse Raven Cuff Bracelet, Stainless Steel Viking Bangle',
    price: '$30.60',
    oldPrice: '$34.00',
    badge: '10% off',
    image: etsyNorseRavenCuff,
    href: 'https://www.etsy.com/listing/4481078347/norse-raven-cuff-bracelet-men-stainless',
  },
  {
    name: 'Viking Raven Bracelet, Stainless Steel Norse Cuff Wristband',
    price: '$30.60',
    oldPrice: '$34.00',
    badge: '10% off',
    image: etsyVikingRavenBracelet,
    href: 'https://www.etsy.com/listing/4433569216/viking-raven-bracelet-for-men-stainless',
  },
  {
    name: "Oversized Satin Bow Hair Clip, Retro Barrette Women's Accessory",
    price: '$23.40',
    oldPrice: '$26.00',
    badge: '10% off',
    image: etsySatinBowClip,
    href: 'https://www.etsy.com/listing/4442382703/satin-bow-hair-clip-for-women-large',
  },
  {
    name: "Men's Viking Dragon Bracelet, Stainless Steel Nordic Cuff",
    price: '$34.20',
    oldPrice: '$38.00',
    badge: '10% off',
    image: etsyDragonBracelet,
    href: 'https://www.etsy.com/listing/4455935876/mens-viking-dragon-bracelet-stainless',
  },
  {
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

const legalPages = {
  '/privacy-policy': {
    title: 'Privacy Policy | NovaVentory',
    description:
      'Privacy Policy for NovaVentory, including how this website and Etsy checkout may handle customer information.',
    eyebrow: 'Privacy Policy',
    heading: 'Privacy Policy',
    updated: 'May 26, 2026',
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
          'This website may use essential hosting technologies and third-party services. Etsy may use its own cookies and tracking technologies when you visit Etsy pages from links on this site.',
        ],
      },
      {
        title: 'Your Choices',
        body: [
          'You can contact NovaVentory through the Etsy shop if you need help with an order or want to ask about personal information connected to an Etsy purchase.',
          'You can also manage Etsy account and privacy settings directly through Etsy.',
        ],
      },
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
  return (
    <header className="site-header">
      <div className="top-strip">
        <span>Free shipping in all states of the USA</span>
      </div>
      <div className="brand-row">
        <a className="brand" href="/" aria-label="NovaVentory home">
          NovaVentory
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="/#products">Products</a>
          <a href="/bracelets">Bracelets</a>
          <a href="/viking-bracelet">Viking Bracelet</a>
          <a href="/#reviews">Reviews</a>
          <a href={shopUrl} target="_blank" rel="noreferrer">
            Etsy
          </a>
        </nav>
      </div>
    </header>
  )
}

function Seo({ page }) {
  useEffect(() => {
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

function LegalPage({ page }) {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.heading}</h1>
        <p>Last updated: {page.updated}</p>
      </section>

      <section className="legal-content" aria-label={page.heading}>
        {page.sections.map((section) => (
          <article className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </section>
    </main>
  )
}

function CollectionPage({ page, collectionProducts }) {
  return (
    <main className="collection-page">
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

      <nav className="collection-links" aria-label="Related NovaVentory pages">
        <a href="/bracelets">All Bracelets</a>
        <a href="/viking-bracelet">Viking Bracelet</a>
        <a href="/nordic-bracelet">Nordic Bracelet</a>
        <a href="/raven-bracelet">Raven Bracelet</a>
      </nav>
    </main>
  )
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [videoReadySlide, setVideoReadySlide] = useState(null)
  const heroVideoRef = useRef(null)
  const slide = heroSlides[activeSlide]
  const isVideoReady = videoReadySlide === activeSlide

  const showNextSlide = useCallback(() => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (slide.videoSrc) {
      const video = heroVideoRef.current

      if (video) {
        try {
          video.currentTime = 0
        } catch {
          // Some browsers reject currentTime changes before video metadata loads.
        }

        video.play().catch(() => {})
      }

      return undefined
    }

    const timer = window.setInterval(() => {
      showNextSlide()
    }, 5500)

    return () => window.clearInterval(timer)
  }, [activeSlide, slide.videoSrc, showNextSlide])

  const showPreviousSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        (currentSlide - 1 + heroSlides.length) % heroSlides.length,
    )
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
              <video
                ref={heroVideoRef}
                className={isVideoReady ? 'is-ready' : ''}
                src={slide.videoSrc}
                poster={slide.image}
                autoPlay
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoReadySlide(activeSlide)}
                onCanPlay={() => setVideoReadySlide(activeSlide)}
                onPlaying={() => setVideoReadySlide(activeSlide)}
                onError={() => setVideoReadySlide(null)}
                onStalled={() => setVideoReadySlide(null)}
                onEnded={showNextSlide}
                aria-label="Best-selling Viking raven bracelet video"
              />
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
              onClick={() => setActiveSlide(index)}
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
          href={product.href}
          target="_blank"
          rel="noreferrer"
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
      <Icon size={31} strokeWidth={1.6} />
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
              <div className="testimonial-stars" aria-label="Five star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star size={16} fill="currentColor" key={index} />
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

function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const legalPage = legalPages[currentPath]
  const commercialPage = commercialPages[currentPath]
  const collectionProducts = commercialPage
    ? products.filter((product) => commercialPage.productNames.includes(product.name))
    : []
  const pageMeta = legalPage
    ? {
        path: currentPath,
        title: legalPage.title,
        description: legalPage.description,
        skipStructuredData: true,
      }
    : commercialPage
      ? {
          path: currentPath,
          title: commercialPage.title,
          description: commercialPage.description,
          heading: commercialPage.heading,
          structuredProducts: collectionProducts,
        }
      : undefined

  return (
    <>
      <Seo page={pageMeta} />
      <Header />
      {legalPage ? (
        <LegalPage page={legalPage} />
      ) : commercialPage ? (
        <CollectionPage page={commercialPage} collectionProducts={collectionProducts} />
      ) : (
        <main>
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
            <img src={etsyLeatherBracelet} alt="Viking leather bracelet listing photo" />
            <img src={etsyWolfFang} alt="Wolf fang pendant necklace listing photo" />
            <img src={etsyNorseRavenCuff} alt="Norse raven cuff bracelet listing photo" />
          </section>

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
            <img src={etsyDragonBracelet} alt="Viking dragon bracelet listing photo" />
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
            <img src={etsyOdinRavenNecklace} alt="Odin raven necklace listing photo" />
          </section>

          <section className="service-grid" aria-label="Store services">
            {services.map((service) => (
              <ServiceItem service={service} key={service.title} />
            ))}
          </section>

        </main>
      )}

      <footer className="footer">
        <strong>NovaVentory</strong>
        <span>Viking jewelry and accessories available on Etsy.</span>
        <a href="/bracelets">Bracelets</a>
        <a href="/nordic-bracelet">Nordic Bracelet</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms</a>
        <ShieldCheck size={20} aria-hidden="true" />
      </footer>
    </>
  )
}

export default App

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
        <a className="brand" href="#home" aria-label="NovaVentory home">
          NovaVentory
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const heroVideoRef = useRef(null)
  const slide = heroSlides[activeSlide]

  const showNextSlide = useCallback(() => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (slide.videoSrc) {
      const video = heroVideoRef.current

      if (video) {
        video.currentTime = 0
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
              <video
                ref={heroVideoRef}
                src={slide.videoSrc}
                poster={slide.image}
                autoPlay
                muted
                playsInline
                preload="auto"
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
          <span>{product.price}</span>
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
    <section className="testimonial-section" aria-label="Client reviews">
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
  return (
    <>
      <Header />
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
              Read more
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

      <footer className="footer">
        <strong>NovaVentory</strong>
        <span>Viking jewelry and accessories available on Etsy.</span>
        <ShieldCheck size={20} aria-hidden="true" />
      </footer>
    </>
  )
}

export default App

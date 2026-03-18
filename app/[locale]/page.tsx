import RevealObserver from '@/components/landing/RevealObserver'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import TrustBar from '@/components/landing/TrustBar'
import HowItWorks from '@/components/landing/HowItWorks'
import MobileApp from '@/components/landing/MobileApp'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UnitLift',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web, iOS, Android',
  description: 'Profesionalna coaching platforma za online fitness trenere.',
  url: 'https://unitlift.com',
  offers: {
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'EUR',
  },
  author: {
    '@type': 'Organization',
    name: 'UnitDuo',
    url: 'https://unitlift.com',
  },
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealObserver />
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <MobileApp />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}

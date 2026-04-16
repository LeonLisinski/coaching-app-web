import RevealObserver from '@/components/landing/RevealObserver'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    alternates: {
      canonical: locale === 'hr' ? '/' : '/en',
      languages: { hr: '/', en: '/en', 'x-default': '/' },
    },
  }
}
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import TrustBar from '@/components/landing/TrustBar'
import HowItWorks from '@/components/landing/HowItWorks'
import ClientApp from '@/components/landing/ClientApp'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'
import WaveDivider from '@/components/landing/WaveDivider'

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
    name: 'UnitLift',
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
      <WaveDivider from="#eef4ff" to="#f5f7ff" />
      <HowItWorks />
      <WaveDivider from="#f5f7ff" to="#eceffe" />
      <ClientApp />
      <WaveDivider from="#eceffe" to="#ffffff" />
      <Pricing />
      <WaveDivider from="#f5f9ff" to="#eceffe" />
      <Testimonials />
      <WaveDivider from="#f5f7ff" to="#eceffe" />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}

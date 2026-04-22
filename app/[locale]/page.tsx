import type { Metadata } from 'next'
import RevealObserver from '@/components/landing/RevealObserver'
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
import { buildPageMetadata } from '@/lib/seo-metadata'
import { SITE_URL } from '@/lib/site'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const l = locale === 'en' ? 'en' : 'hr'
  if (l === 'hr') {
    return buildPageMetadata({
      locale: 'hr',
      pathname: '/',
      title: 'Aplikacija za osobne trenere | UnitLift',
      description:
        'Coaching aplikacija za online klijente: planovi treninga i prehrane, tjedni check-ini, chat i plaćanja. Postavi u 5 minuta - 14 dana besplatno.',
      languages: { hr: '/', en: '/en', 'x-default': '/' },
    })
  }
  return buildPageMetadata({
    locale: 'en',
    pathname: '/en',
    title: 'Personal trainer app for online clients | UnitLift',
    description:
      'Online coaching software: training and meal plans, weekly check-ins, chat and payments. Set up in 5 minutes - 14 days free.',
    languages: { hr: '/', en: '/en', 'x-default': '/' },
  })
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UnitLift',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web, iOS, Android',
  description: 'Web i aplikacija za trenere s online klijentima. Planovi, check-ini, plaćanja i poruke na jednom mjestu.',
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'EUR',
  },
  author: {
    '@type': 'Organization',
    name: 'UnitLift',
    url: SITE_URL,
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

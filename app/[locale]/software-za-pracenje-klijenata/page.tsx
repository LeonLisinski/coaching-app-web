import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { buildPageMetadata } from '@/lib/seo-metadata'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'hr') return {}
  return buildPageMetadata({
    locale: 'hr',
    pathname: '/software-za-pracenje-klijenata',
    title: 'Praćenje klijenata - tjedni check-ini | UnitLift',
    description:
      'Automatski podsjetnici, fotke napretka, grafovi. Vidi tko drži ritam, tko ne - bez ručnog skupljanja poruka. Isprobaj 14 dana besplatno.',
    keywords: [
      'praćenje klijenata osobni trener',
      'check-in klijenti',
      'aplikacija za fitness trenere',
      'planovi treninga online',
    ],
    languages: {
      hr: '/software-za-pracenje-klijenata',
      en: '/en/client-tracking-software',
      'x-default': '/software-za-pracenje-klijenata',
    },
  })
}

export default async function SoftwareZaPracenjeKlijenataPage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/client-tracking-software')
  return <SeoLandingPage namespace="seoPageTracking" />
}

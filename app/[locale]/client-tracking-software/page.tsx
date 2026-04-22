import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { buildPageMetadata } from '@/lib/seo-metadata'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en') return {}
  return buildPageMetadata({
    locale: 'en',
    pathname: '/en/client-tracking-software',
    title: 'Client tracking for coaches - weekly check-ins | UnitLift',
    description:
      'Weekly check-ins with measurements, photos, and flags when someone is late. Less chasing, cleaner history. 14-day free trial.',
    keywords: [
      'personal trainer client tracking',
      'client check-ins',
      'online coaching software',
      'workout plan app',
    ],
    languages: {
      hr: '/software-za-pracenje-klijenata',
      en: '/en/client-tracking-software',
      'x-default': '/software-za-pracenje-klijenata',
    },
  })
}

export default async function ClientTrackingSoftwarePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/software-za-pracenje-klijenata')
  return <SeoLandingPage namespace="seoPageTracking" />
}

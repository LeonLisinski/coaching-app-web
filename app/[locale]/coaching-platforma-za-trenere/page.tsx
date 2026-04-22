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
    pathname: '/coaching-platforma-za-trenere',
    title: 'Coaching aplikacija - manje organiziranja, više klijenata | UnitLift',
    description:
      'Jedan sustav za pozive klijenata, check-ine i plaćanja. Kad raste broj klijenata, ne raste nered u porukama. 14 dana besplatno.',
    keywords: [
      'online coaching aplikacija',
      'aplikacija za fitness trenere',
      'vođenje klijenata trener',
      'check-in klijenti',
    ],
    languages: {
      hr: '/coaching-platforma-za-trenere',
      en: '/en/online-coaching-software',
      'x-default': '/coaching-platforma-za-trenere',
    },
  })
}

export default async function CoachingPlatformaPage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/online-coaching-software')
  return <SeoLandingPage namespace="seoPageCoaching" />
}

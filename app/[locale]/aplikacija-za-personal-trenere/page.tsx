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
    pathname: '/aplikacija-za-personal-trenere',
    title: 'Aplikacija za osobne trenere - online klijenti | UnitLift',
    description:
      'Coaching aplikacija za online klijente: planovi treninga i prehrane, tjedni check-ini i chat. Manje poruka, više reda. Isprobaj 14 dana besplatno.',
    keywords: [
      'aplikacija za osobne trenere',
      'coaching aplikacija',
      'online fitness trener aplikacija',
      'praćenje klijenata osobni trener',
    ],
    languages: {
      hr: '/aplikacija-za-personal-trenere',
      en: '/en/personal-trainer-app',
      'x-default': '/aplikacija-za-personal-trenere',
    },
  })
}

export default async function AplicijaZaPersonalTrenerePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/personal-trainer-app')
  return <SeoLandingPage namespace="seoPageApp" />
}

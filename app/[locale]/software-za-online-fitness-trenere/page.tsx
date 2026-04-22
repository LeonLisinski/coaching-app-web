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
    pathname: '/software-za-online-fitness-trenere',
    title: 'Online fitness trener - planovi, check-ini, plaćanja | UnitLift',
    description:
      'Makni se s Excela: planovi treninga i prehrane, tjedni check-ini, chat, pregled tko je platio. Postavi u pet minuta. 14 dana besplatno.',
    keywords: [
      'software za online fitness trenere',
      'aplikacija za osobne trenere',
      'planovi treninga online',
      'online fitness trener aplikacija',
    ],
    languages: {
      hr: '/software-za-online-fitness-trenere',
      en: '/en/online-personal-trainer-software',
      'x-default': '/software-za-online-fitness-trenere',
    },
  })
}

export default async function SoftwareZaFitnessTrenerePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/online-personal-trainer-software')
  return <SeoLandingPage />
}

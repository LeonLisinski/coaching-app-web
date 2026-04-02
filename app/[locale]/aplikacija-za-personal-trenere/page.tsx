import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'hr') return {}
  return {
    title: 'Aplikacija za Personal Trenere | UnitLift',
    description: 'UnitLift daje svakom klijentu vlastitu mobilnu aplikaciju s planovima, check-inima i chatom. Profesionalni personal trening bez PDF-ova i WhatsAppa.',
    keywords: ['aplikacija za personal trenere', 'trenerska aplikacija', 'mobilna aplikacija za klijente', 'coaching aplikacija hrvatska'],
    alternates: {
      canonical: '/aplikacija-za-personal-trenere',
      languages: { hr: '/aplikacija-za-personal-trenere', en: '/en/personal-trainer-app', 'x-default': '/aplikacija-za-personal-trenere' },
    },
    openGraph: {
      title: 'Aplikacija za Personal Trenere | UnitLift',
      description: 'Daj klijentima pravu aplikaciju — planovi, check-ini i chat na jednom ekranu.',
      url: 'https://unitlift.com/aplikacija-za-personal-trenere',
      type: 'website',
    },
  }
}

export default async function AplicijaZaPersonalTrenerePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/personal-trainer-app')
  return <SeoLandingPage namespace="seoPageApp" />
}

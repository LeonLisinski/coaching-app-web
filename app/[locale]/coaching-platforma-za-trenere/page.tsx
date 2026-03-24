import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'hr') return {}
  return {
    title: 'Coaching Platforma za Trenere | UnitLift',
    description: 'UnitLift je coaching platforma koja automatizira onboarding, check-ine i praćenje plaćanja. Od prvih klijenata do pune prakse — bez mijenjanja alata.',
    keywords: ['coaching platforma za trenere', 'online coaching platforma', 'platforma za personal trenere', 'coaching software hrvatska'],
    alternates: {
      canonical: '/hr/coaching-platforma-za-trenere',
      languages: { hr: '/hr/coaching-platforma-za-trenere', en: '/en/online-coaching-software' },
    },
    openGraph: {
      title: 'Coaching Platforma za Trenere | UnitLift',
      description: 'Sustav koji automatizira administraciju i skalira s tvojim poslom.',
      url: 'https://unitlift.com/hr/coaching-platforma-za-trenere',
      type: 'website',
    },
  }
}

export default async function CoachingPlatformaPage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/online-coaching-software')
  return <SeoLandingPage namespace="seoPageCoaching" />
}

import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'hr') return {}
  return {
    title: 'Software za Praćenje Klijenata | UnitLift',
    description: 'UnitLift automatski prikuplja tjedne check-ine od klijenata — mjere, fotografije, osjećaj, san. Kompletna slika napretka bez ručne administracije.',
    keywords: ['software za praćenje klijenata', 'praćenje napretka klijenata', 'check-in sustav za trenere', 'trenerski software za napredak'],
    alternates: {
      canonical: '/hr/software-za-pracenje-klijenata',
      languages: { hr: '/hr/software-za-pracenje-klijenata', en: '/en/client-tracking-software' },
    },
    openGraph: {
      title: 'Software za Praćenje Klijenata | UnitLift',
      description: 'Automatski tjedni check-ini — mjere, fotografije i napredak na jednom ekranu.',
      url: 'https://unitlift.com/hr/software-za-pracenje-klijenata',
      type: 'website',
    },
  }
}

export default async function SoftwareZaPracenjePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'en') permanentRedirect('/en/client-tracking-software')
  return <SeoLandingPage namespace="seoPageTracking" />
}

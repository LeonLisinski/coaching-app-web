import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') return {}
  return {
    title: 'Client Tracking Software for Personal Trainers | UnitLift',
    description: 'UnitLift automatically collects weekly check-ins from clients — measurements, photos, mood, sleep. Complete progress picture without manual admin.',
    keywords: ['client tracking software', 'client progress tracking', 'check-in system for trainers', 'trainer client management'],
    alternates: {
      canonical: '/en/client-tracking-software',
      languages: { hr: '/hr/software-za-pracenje-klijenata', en: '/en/client-tracking-software' },
    },
    openGraph: {
      title: 'Client Tracking Software for Personal Trainers | UnitLift',
      description: 'Automatic weekly check-ins — measurements, photos and progress on one screen.',
      url: 'https://unitlift.com/en/client-tracking-software',
      type: 'website',
    },
  }
}

export default async function ClientTrackingSoftwarePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/hr/software-za-pracenje-klijenata')
  return <SeoLandingPage namespace="seoPageTracking" />
}

import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') return {}
  return {
    title: 'Online Coaching Software | UnitLift',
    description: 'UnitLift is a coaching platform that automates onboarding, check-ins and payment tracking. From your first clients to a full practice — without switching tools.',
    keywords: ['online coaching software', 'coaching platform for trainers', 'personal trainer platform', 'coach management software'],
    alternates: {
      canonical: '/en/online-coaching-software',
      languages: { hr: '/coaching-platforma-za-trenere', en: '/en/online-coaching-software', 'x-default': '/coaching-platforma-za-trenere' },
    },
    openGraph: {
      title: 'Online Coaching Software | UnitLift',
      description: 'A system that automates admin and scales with your business.',
      url: 'https://unitlift.com/en/online-coaching-software',
      type: 'website',
    },
  }
}

export default async function OnlineCoachingSoftwarePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/coaching-platforma-za-trenere')
  return <SeoLandingPage namespace="seoPageCoaching" />
}

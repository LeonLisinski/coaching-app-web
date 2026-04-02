import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') return {}
  return {
    title: 'Personal Trainer App | UnitLift',
    description: 'UnitLift gives every client their own mobile app with plans, check-ins and chat. Professional personal training without PDFs and WhatsApp.',
    keywords: ['personal trainer app', 'trainer app for clients', 'coaching app', 'client management app'],
    alternates: {
      canonical: '/en/personal-trainer-app',
      languages: { hr: '/aplikacija-za-personal-trenere', en: '/en/personal-trainer-app', 'x-default': '/aplikacija-za-personal-trenere' },
    },
    openGraph: {
      title: 'Personal Trainer App | UnitLift',
      description: 'Give clients a real app — plans, check-ins and chat on one screen.',
      url: 'https://unitlift.com/en/personal-trainer-app',
      type: 'website',
    },
  }
}

export default async function PersonalTrainerAppPage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/aplikacija-za-personal-trenere')
  return <SeoLandingPage namespace="seoPageApp" />
}

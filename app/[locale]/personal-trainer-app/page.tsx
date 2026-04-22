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
    pathname: '/en/personal-trainer-app',
    title: 'Personal trainer app - all clients in one place | UnitLift',
    description:
      'Fitness coaching platform for online clients: plans, weekly check-ins, chat, payments. Less inbox chaos, clearer work. 14-day free trial.',
    keywords: [
      'personal trainer app',
      'online coaching software',
      'fitness coaching platform',
      'client management for personal trainers',
    ],
    languages: {
      hr: '/aplikacija-za-personal-trenere',
      en: '/en/personal-trainer-app',
      'x-default': '/aplikacija-za-personal-trenere',
    },
  })
}

export default async function PersonalTrainerAppPage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/aplikacija-za-personal-trenere')
  return <SeoLandingPage namespace="seoPageApp" />
}

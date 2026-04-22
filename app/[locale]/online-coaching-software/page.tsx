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
    pathname: '/en/online-coaching-software',
    title: 'Online coaching software - one workflow for your clients',
    description:
      'Onboarding, check-ins, and payment status without spreadsheet ping-pong. Built for personal trainers with remote clients. Try 14 days free.',
    keywords: [
      'online coaching software',
      'fitness coaching platform',
      'personal trainer client tracking',
      'client check-ins',
    ],
    languages: {
      hr: '/coaching-platforma-za-trenere',
      en: '/en/online-coaching-software',
      'x-default': '/coaching-platforma-za-trenere',
    },
  })
}

export default async function OnlineCoachingSoftwarePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/coaching-platforma-za-trenere')
  return <SeoLandingPage namespace="seoPageCoaching" />
}

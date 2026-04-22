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
    pathname: '/en/online-personal-trainer-software',
    title: 'Online personal trainer software - plans, payments | UnitLift',
    description:
      'One place for training and meal plans, weekly check-ins, messages, and who paid. Stop living in five tabs. 14 days free to try it properly.',
    keywords: [
      'online personal trainer software',
      'workout plan app',
      'online fitness coach tools',
      'personal trainer client tracking',
    ],
    languages: {
      hr: '/software-za-online-fitness-trenere',
      en: '/en/online-personal-trainer-software',
      'x-default': '/software-za-online-fitness-trenere',
    },
  })
}

export default async function OnlinePersonalTrainerSoftwarePage({ params }: Props) {
  const { locale } = await params
  if (locale === 'hr') permanentRedirect('/software-za-online-fitness-trenere')
  return <SeoLandingPage />
}

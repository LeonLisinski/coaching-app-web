import { permanentRedirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'en') return {}
  return {
    title: 'Online Personal Trainer Software | UnitLift',
    description: 'UnitLift is a platform for online personal trainers that replaces WhatsApp, Excel and PDFs. Training plans, nutrition, check-ins and payments — all in one place. Try free for 14 days.',
    keywords: ['online personal trainer software', 'fitness trainer app', 'coaching platform', 'personal trainer software', 'client management for trainers', 'unitlift'],
    alternates: {
      canonical: '/en/online-personal-trainer-software',
      languages: {
        hr: '/hr/software-za-online-fitness-trenere',
        en: '/en/online-personal-trainer-software',
      },
    },
    openGraph: {
      title: 'Online Personal Trainer Software | UnitLift',
      description: 'Replace WhatsApp and Excel with one platform. Plans, check-ins, payments — all on one screen.',
      url: 'https://unitlift.com/en/online-personal-trainer-software',
      type: 'website',
    },
  }
}

export default async function OnlinePersonalTrainerSoftwarePage({ params }: Props) {
  const { locale } = await params
  // Redirect HR visitors to the HR-keyword URL
  if (locale === 'hr') permanentRedirect('/hr/software-za-online-fitness-trenere')
  return <SeoLandingPage />
}

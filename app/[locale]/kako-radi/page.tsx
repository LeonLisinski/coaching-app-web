import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import HowItWorksPage from '@/components/legal/HowItWorksPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/kako-radi' : '/en/kako-radi',
    title: isHr
      ? 'Kako radi UnitLift - postavi coaching za 5 minuta'
      : 'How UnitLift works - go live in 5 minutes',
    description: isHr
      ? 'Ti: web i profil, planovi, plaćanja. Klijent: besplatna aplikacija, check-ini, poruke. Jedan pristup, bez Excela i WhatsAppa kao glavnog alata.'
      : 'You: web dashboard, plans, money. Your client: free app, check-ins, messages. One place to work - not Excel and chat threads.',
    languages: { hr: '/kako-radi', en: '/en/kako-radi', 'x-default': '/kako-radi' },
  })
}

export default function KakoRadiPage() {
  return <HowItWorksPage />
}

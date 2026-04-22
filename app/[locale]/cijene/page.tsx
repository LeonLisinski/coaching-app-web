import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import PricingPage from '@/components/legal/PricingPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/cijene' : '/en/cijene',
    title: isHr
      ? 'Cijene - UnitLift coaching aplikacija | 14 dana besplatno'
      : 'Pricing - UnitLift coaching app | 14 days free',
    description: isHr
      ? 'Starter, Pro i Scale: iste stvari, drugačiji broj mjesta za klijente. 14 dana besplatno, kartica za aktivaciju. Možeš otkazati kad hoćeš.'
      : 'Starter, Pro and Scale: same features, different client limits. 14 days free, card to start. Cancel anytime.',
    languages: { hr: '/cijene', en: '/en/cijene', 'x-default': '/cijene' },
  })
}

export default function CijenePage() {
  return <PricingPage />
}

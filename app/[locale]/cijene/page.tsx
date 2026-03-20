import PricingPage from '@/components/legal/PricingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Cijene | UnitLift' : 'Pricing | UnitLift',
    description: isHr
      ? 'Jednostavne cijene bez iznenađenja. 14 dana besplatno na svim planovima. Starter €29/mj, Pro €59/mj, Scale €99/mj.'
      : 'Simple pricing, no surprises. 14 days free on all plans. Starter €29/mo, Pro €59/mo, Scale €99/mo.',
    alternates: { canonical: `/${locale}/cijene`, languages: { hr: '/hr/cijene', en: '/en/cijene' } },
  }
}

export default function CijenePage() {
  return <PricingPage />
}

import { getLocale } from 'next-intl/server'
import HowItWorksPage from '@/components/legal/HowItWorksPage'

export async function generateMetadata() {
  const locale = await getLocale()
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Kako radi | UnitLift' : 'How it works | UnitLift',
    description: isHr
      ? 'Saznaj kako UnitLift funkcionira za trenere i klijente. Jedna platforma za planove treninga, check-ine, financije i komunikaciju.'
      : 'Learn how UnitLift works for coaches and clients. One platform for training plans, check-ins, finances and communication.',
    alternates: { canonical: `/${locale}/kako-radi` },
  }
}

export default function KakoRadiPage() {
  return <HowItWorksPage />
}

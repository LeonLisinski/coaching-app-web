import HowItWorksPage from '@/components/legal/HowItWorksPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Kako radi | UnitLift' : 'How it works | UnitLift',
    description: isHr
      ? 'Saznaj kako UnitLift funkcionira za trenere i klijente. Jedna platforma za planove treninga, check-ine, financije i komunikaciju.'
      : 'Learn how UnitLift works for coaches and clients. One platform for training plans, check-ins, finances and communication.',
    alternates: { canonical: `/${locale}/kako-radi`, languages: { hr: '/hr/kako-radi', en: '/en/kako-radi' } },
  }
}

export default function KakoRadiPage() {
  return <HowItWorksPage />
}

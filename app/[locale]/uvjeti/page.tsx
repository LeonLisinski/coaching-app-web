import LegalPage from '@/components/legal/LegalPage'
import { termsHr } from '@/lib/legal/terms-hr'
import { termsEn } from '@/lib/legal/terms-en'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Uvjeti korištenja – UnitLift' : 'Terms of Service – UnitLift',
    description: isHr
      ? 'Uvjeti korištenja platforme UnitLift za online fitness trenere.'
      : 'Terms of Service for the UnitLift online fitness coaching platform.',
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/uvjeti`, languages: { hr: '/hr/uvjeti', en: '/en/uvjeti' } },
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const doc = locale === 'hr' ? termsHr : termsEn
  return <LegalPage doc={doc} docType="terms" />
}

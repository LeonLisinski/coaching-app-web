import { getLocale } from 'next-intl/server'
import LegalPage from '@/components/legal/LegalPage'
import { termsHr } from '@/lib/legal/terms-hr'
import { termsEn } from '@/lib/legal/terms-en'

export async function generateMetadata() {
  const locale = await getLocale()
  const isHr = locale === 'hr'
  return {
    title: isHr
      ? 'Uvjeti korištenja – UnitLift'
      : 'Terms of Service – UnitLift',
    description: isHr
      ? 'Uvjeti korištenja platforme UnitLift za online fitness trenere.'
      : 'Terms of Service for the UnitLift online fitness coaching platform.',
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/uvjeti` },
  }
}

export default async function TermsPage() {
  const locale = await getLocale()
  const doc = locale === 'hr' ? termsHr : termsEn
  return <LegalPage doc={doc} docType="terms" />
}

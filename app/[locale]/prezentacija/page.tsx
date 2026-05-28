import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import BookingPage from '@/components/legal/BookingPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'demo' })
  return {
    title: `${t('pageTitle')} — UnitLift`,
    description: t('pageDesc'),
  }
}

export default function PrezentacijaPage() {
  return <BookingPage />
}

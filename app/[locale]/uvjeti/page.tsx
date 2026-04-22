import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import LegalPage from '@/components/legal/LegalPage'
import { termsHr } from '@/lib/legal/terms-hr'
import { termsEn } from '@/lib/legal/terms-en'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/uvjeti' : '/en/uvjeti',
    title: isHr ? 'Uvjeti korištenja - UnitLift' : 'Terms of service - UnitLift',
    description: isHr
      ? 'Kako se koristi UnitLift (app i web), plaćanje, sadržaj, odgovornost. Ukratko: pravila korištenja usluge za trenere i klijente.'
      : 'How to use UnitLift (app and web), billing, content, responsibility. The rules of the service for coaches and clients.',
    robots: { index: true, follow: true },
    languages: { hr: '/uvjeti', en: '/en/uvjeti', 'x-default': '/uvjeti' },
  })
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const doc = locale === 'hr' ? termsHr : termsEn
  return <LegalPage doc={doc} docType="terms" />
}

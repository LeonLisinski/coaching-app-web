import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import FAQPage from '@/components/legal/FAQPage'
import { faqHr } from '@/lib/faq/faq-hr'
import { faqEn } from '@/lib/faq/faq-en'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/faq' : '/en/faq',
    title: isHr ? 'FAQ - UnitLift za trenere i klijente' : 'FAQ - UnitLift for coaches and clients',
    description: isHr
      ? 'Planovi, cijene, check-ini, klijentska aplikacija, branding, otkazivanje. Kratki odgovori na pitanja koja stvarno čujemo od trenera.'
      : 'Plans, pricing, check-ins, client app, branding, canceling. Straight answers to what trainers actually ask us.',
    robots: { index: true, follow: true },
    languages: { hr: '/faq', en: '/en/faq', 'x-default': '/faq' },
  })
}

export default async function FAQRoutePage({ params }: Props) {
  const { locale } = await params
  const data = locale === 'hr' ? faqHr : faqEn
  return <FAQPage data={data} />
}

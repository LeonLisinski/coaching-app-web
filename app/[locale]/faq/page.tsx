import { getLocale } from 'next-intl/server'
import FAQPage from '@/components/legal/FAQPage'
import { faqHr } from '@/lib/faq/faq-hr'
import { faqEn } from '@/lib/faq/faq-en'

export async function generateMetadata() {
  const locale = await getLocale()
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'FAQ – UnitLift' : 'FAQ – UnitLift',
    description: isHr
      ? 'Odgovori na najčešća pitanja o UnitLift platformi — cijene, postavljanje, klijenti i tehničke informacije.'
      : 'Answers to the most common questions about UnitLift — pricing, setup, clients and technical information.',
    robots: { index: true, follow: true },
  }
}

export default async function FAQRoutePage() {
  const locale = await getLocale()
  const data = locale === 'hr' ? faqHr : faqEn
  return <FAQPage data={data} />
}

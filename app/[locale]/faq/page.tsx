import FAQPage from '@/components/legal/FAQPage'
import { faqHr } from '@/lib/faq/faq-hr'
import { faqEn } from '@/lib/faq/faq-en'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: 'FAQ – UnitLift',
    description: isHr
      ? 'Odgovori na najčešća pitanja o UnitLift platformi — cijene, postavljanje, klijenti i tehničke informacije.'
      : 'Answers to the most common questions about UnitLift — pricing, setup, clients and technical information.',
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/faq`, languages: { hr: '/hr/faq', en: '/en/faq' } },
  }
}

export default async function FAQRoutePage({ params }: Props) {
  const { locale } = await params
  const data = locale === 'hr' ? faqHr : faqEn
  return <FAQPage data={data} />
}

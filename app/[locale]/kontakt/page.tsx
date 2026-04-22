import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import ContactPage from '@/components/legal/ContactPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/kontakt' : '/en/kontakt',
    title: isHr ? 'Kontakt - UnitLift | Podrška za fitness trenere' : 'Contact - UnitLift | Help for fitness coaches',
    description: isHr
      ? 'Pitaj za račun, tehničke stvari ili partnerstvo. Odgovaramo unutar jednog radnog dana na support@unitlift.com.'
      : 'Ask about billing, tech or partnerships. We reply within one business day at support@unitlift.com.',
    robots: { index: true, follow: true },
    languages: { hr: '/kontakt', en: '/en/kontakt', 'x-default': '/kontakt' },
  })
}

export default async function KontaktPage() {
  return <ContactPage />
}

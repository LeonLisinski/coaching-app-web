import LegalPage from '@/components/legal/LegalPage'
import { privacyHr } from '@/lib/legal/privacy-hr'
import { privacyEn } from '@/lib/legal/privacy-en'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Politika privatnosti – UnitLift' : 'Privacy Policy – UnitLift',
    description: isHr
      ? 'Politika privatnosti platforme UnitLift — kako prikupljamo i štitimo vaše osobne podatke.'
      : 'Privacy Policy of UnitLift — how we collect and protect your personal data.',
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/privatnost`, languages: { hr: '/hr/privatnost', en: '/en/privatnost' } },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const doc = locale === 'hr' ? privacyHr : privacyEn
  return <LegalPage doc={doc} docType="privacy" />
}

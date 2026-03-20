import { getLocale } from 'next-intl/server'
import LegalPage from '@/components/legal/LegalPage'
import { privacyHr } from '@/lib/legal/privacy-hr'
import { privacyEn } from '@/lib/legal/privacy-en'

export async function generateMetadata() {
  const locale = await getLocale()
  const isHr = locale === 'hr'
  return {
    title: isHr
      ? 'Politika privatnosti – UnitLift'
      : 'Privacy Policy – UnitLift',
    description: isHr
      ? 'Politika privatnosti platforme UnitLift — kako prikupljamo i štitimo vaše osobne podatke.'
      : 'Privacy Policy of UnitLift — how we collect and protect your personal data.',
    robots: { index: true, follow: true },
    alternates: { canonical: `/${locale}/privatnost` },
  }
}

export default async function PrivacyPage() {
  const locale = await getLocale()
  const doc = locale === 'hr' ? privacyHr : privacyEn
  return <LegalPage doc={doc} docType="privacy" />
}

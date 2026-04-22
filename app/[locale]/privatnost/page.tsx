import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import LegalPage from '@/components/legal/LegalPage'
import { privacyHr } from '@/lib/legal/privacy-hr'
import { privacyEn } from '@/lib/legal/privacy-en'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/privatnost' : '/en/privatnost',
    title: isHr ? 'Privatnost - UnitLift' : 'Privacy - UnitLift',
    description: isHr
      ? 'Koji podaci se prikupljaju, zašto, kako ih štitimo (GDPR). Ukratko: tvoji podaci su pod kontrolom i ne prodajemo ih trećima.'
      : 'What we collect, why, and how we protect it (GDPR). In short: your data stays yours; we do not sell it.',
    robots: { index: true, follow: true },
    languages: { hr: '/privatnost', en: '/en/privatnost', 'x-default': '/privatnost' },
  })
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const doc = locale === 'hr' ? privacyHr : privacyEn
  return <LegalPage doc={doc} docType="privacy" />
}

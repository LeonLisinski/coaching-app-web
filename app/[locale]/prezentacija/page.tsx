import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import BookingPage from '@/components/legal/BookingPage'
import { buildPageMetadata } from '@/lib/seo-metadata'
import { SITE_URL } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale !== 'en'
  const t = await getTranslations({ locale, namespace: 'demo' })

  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/prezentacija' : '/en/prezentacija',
    title: t('pageTitle'),
    description: t('pageDesc'),
    languages: {
      hr:          `${SITE_URL}/prezentacija`,
      en:          `${SITE_URL}/en/prezentacija`,
      'x-default': `${SITE_URL}/prezentacija`,
    },
  })
}

export default function PrezentacijaPage() {
  return <BookingPage />
}

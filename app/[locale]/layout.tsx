import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'UnitLift – Coaching platforma za online fitness trenere',
    template: '%s | UnitLift',
  },
  description:
    'Profesionalna coaching platforma za online fitness trenere. Planovi treninga, prehrana, check-ini, financije i komunikacija na jednom mjestu.',
  keywords: [
    'coaching platforma',
    'fitness trener app',
    'online personal trainer',
    'planovi treninga app',
    'check-in praćenje',
    'unitlift',
  ],
  metadataBase: new URL('https://unitlift.com'),
  alternates: {
    canonical: '/',
    languages: {
      hr: '/hr',
      en: '/en',
    },
  },
  openGraph: {
    title: 'UnitLift – Više klijenata. Manje kaosa.',
    description: 'Profesionalna coaching platforma za online fitness trenere.',
    url: 'https://unitlift.com',
    siteName: 'UnitLift',
    locale: 'hr_HR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitLift – Više klijenata. Manje kaosa.',
    description: 'Coaching platforma za online fitness trenere.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'hr' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

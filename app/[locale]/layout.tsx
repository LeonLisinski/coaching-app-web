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
    languages: {
      hr: '/hr',
      en: '/en',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'UnitLift – Više klijenata. Manje kaosa.',
    description:
      'Profesionalna coaching platforma za online fitness trenere. Planovi treninga, prehrana, check-ini i financije — sve na jednom mjestu.',
    url: 'https://unitlift.com',
    siteName: 'UnitLift',
    locale: 'hr_HR',
    type: 'website',
    images: [
      {
        url: 'https://unitlift.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UnitLift – Coaching platforma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitLift – Više klijenata. Manje kaosa.',
    description: 'Coaching platforma za online fitness trenere.',
    images: ['https://unitlift.com/og-image.jpg'],
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
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

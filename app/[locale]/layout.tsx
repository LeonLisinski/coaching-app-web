import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { routing } from '@/i18n/routing'
import '../globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: 'UnitLift – Coaching platforma za online fitness trenere',
    template: '%s | UnitLift',
  },
  description:
    'Coaching platforma za online fitness trenere. Planovi treninga, prehrana, check-ini, chat i financije — sve na jednom mjestu. 14 dana besplatno.',
  keywords: [
    'coaching platforma',
    'aplikacija za fitness trenere',
    'online personal trainer',
    'aplikacija za planove treninga',
    'check-in praćenje',
    'unitlift',
  ],
  metadataBase: new URL('https://unitlift.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
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
    <html lang={locale} className={plusJakarta.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

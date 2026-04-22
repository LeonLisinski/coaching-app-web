import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/site'
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
    default: 'Aplikacija za osobne trenere | UnitLift',
    template: '%s',
  },
  description:
    'Coaching aplikacija za online klijente: planovi treninga i prehrane, check-ini, poruke i plaćanja. Postavi u 5 minuta - 14 dana besplatno.',
  keywords: [
    'unitlift',
    'aplikacija za osobne trenere',
    'coaching aplikacija',
    'online fitness trener',
    'praćenje klijenata',
    'check-in klijenti',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    languages: {
      hr: '/',
      en: '/en',
      'x-default': '/',
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Aplikacija za osobne trenere - manje kaosa, više klijenata',
    description:
      'Planovi treninga i prehrane, tjedni check-ini, chat i plaćanja na jednom mjestu. Za trenere s online klijentima. 14 dana besplatno.',
    url: SITE_URL,
    siteName: 'UnitLift',
    locale: 'hr_HR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'UnitLift - coaching aplikacija za fitness trenere i online klijente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aplikacija za osobne trenere - manje kaosa, više klijenata',
    description: 'Check-ini, planovi, plaćanja i poruke u jednom alatu. 14 dana besplatno.',
    images: [`${SITE_URL}/og-image.jpg`],
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

import type { Metadata } from 'next'
import { SITE_URL, absoluteUrl } from './site'

const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
  languages,
  robots,
}: {
  locale: 'hr' | 'en'
  pathname: string
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  keywords?: string[]
  languages: { hr: string; en: string; 'x-default': string }
  robots?: Metadata['robots']
}): Metadata {
  return {
    title,
    description,
    keywords,
    ...(robots != null ? { robots } : {}),
    alternates: {
      canonical: pathname,
      languages,
    },
    openGraph: {
      title: ogTitle ?? title,
      description: (ogDescription ?? description).slice(0, 200),
      url: absoluteUrl(pathname),
      siteName: 'UnitLift',
      locale: locale === 'hr' ? 'hr_HR' : 'en_US',
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'UnitLift - aplikacija za osobne trenere i online klijente',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: (ogDescription ?? description).slice(0, 200),
      images: [OG_IMAGE],
    },
  }
}

export { OG_IMAGE }

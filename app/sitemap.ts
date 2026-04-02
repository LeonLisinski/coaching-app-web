import type { MetadataRoute } from 'next'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'

const BASE = 'https://unitlift.com'

// Croatian (default locale) — no /hr/ prefix (localePrefix: 'as-needed')
const staticRoutesHr = [
  '',
  '/kako-radi',
  '/cijene',
  '/blog',
  '/faq',
  '/kontakt',
  '/privatnost',
  '/uvjeti',
]

// English — always /en/ prefix (same Croatian slugs, different locale)
const staticRoutesEn = [
  '',
  '/kako-radi',
  '/cijene',
  '/blog',
  '/faq',
  '/kontakt',
  '/privatnost',
  '/uvjeti',
]

const seoRoutes: Array<{ url: string; priority: number }> = [
  { url: `${BASE}/software-za-online-fitness-trenere`,     priority: 0.85 },
  { url: `${BASE}/en/online-personal-trainer-software`,    priority: 0.85 },
  { url: `${BASE}/aplikacija-za-personal-trenere`,         priority: 0.85 },
  { url: `${BASE}/en/personal-trainer-app`,                priority: 0.85 },
  { url: `${BASE}/coaching-platforma-za-trenere`,          priority: 0.85 },
  { url: `${BASE}/en/online-coaching-software`,            priority: 0.85 },
  { url: `${BASE}/software-za-pracenje-klijenata`,         priority: 0.85 },
  { url: `${BASE}/en/client-tracking-software`,            priority: 0.85 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Croatian pages (no locale prefix)
  for (const route of staticRoutesHr) {
    entries.push({
      url: `${BASE}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route === '/cijene' ? 0.9 : 0.7,
      alternates: {
        languages: {
          'hr': `${BASE}${route}`,
          'en': `${BASE}/en${route === '' ? '' : route}`,
        },
      },
    })
  }

  // English pages (/en/ prefix)
  for (const route of staticRoutesEn) {
    entries.push({
      url: `${BASE}/en${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 0.9 : route === '/cijene' ? 0.85 : 0.65,
    })
  }

  // SEO landing pages
  for (const { url, priority } of seoRoutes) {
    entries.push({ url, lastModified: new Date(), changeFrequency: 'monthly', priority })
  }

  // Blog posts — Croatian
  for (const post of postsHr) {
    entries.push({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  // Blog posts — English
  for (const post of postsEn) {
    entries.push({
      url: `${BASE}/en/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return entries
}

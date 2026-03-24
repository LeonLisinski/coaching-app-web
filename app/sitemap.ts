import type { MetadataRoute } from 'next'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'

const BASE = 'https://unitlift.com'

const staticRoutes = [
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
  { url: `${BASE}/hr/software-za-online-fitness-trenere`,  priority: 0.85 },
  { url: `${BASE}/en/online-personal-trainer-software`,    priority: 0.85 },
  { url: `${BASE}/hr/aplikacija-za-personal-trenere`,      priority: 0.85 },
  { url: `${BASE}/en/personal-trainer-app`,                priority: 0.85 },
  { url: `${BASE}/hr/coaching-platforma-za-trenere`,       priority: 0.85 },
  { url: `${BASE}/en/online-coaching-software`,            priority: 0.85 },
  { url: `${BASE}/hr/software-za-pracenje-klijenata`,      priority: 0.85 },
  { url: `${BASE}/en/client-tracking-software`,            priority: 0.85 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of ['hr', 'en']) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/cijene' ? 0.9 : 0.7,
      })
    }
  }

  // SEO landing pages
  for (const { url, priority } of seoRoutes) {
    entries.push({ url, lastModified: new Date(), changeFrequency: 'monthly', priority })
  }

  // Blog posts
  for (const post of postsHr) {
    entries.push({
      url: `${BASE}/hr/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
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

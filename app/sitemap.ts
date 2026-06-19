import type { MetadataRoute } from 'next'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'
import { trainers } from '@/lib/trainers/trainers'

const BASE = 'https://www.unitlift.com'

// Croatian (default locale) - no /hr/ prefix (localePrefix: 'as-needed')
const staticRoutesHr = [
  '',
  '/kako-radi',
  '/cijene',
  '/prezentacija',
  '/treneri',
  '/blog',
  '/faq',
  '/kontakt',
  '/privatnost',
  '/uvjeti',
]

// English - always /en/ prefix (same Croatian slugs, different locale)
const staticRoutesEn = [
  '',
  '/kako-radi',
  '/cijene',
  '/prezentacija',
  '/treneri',
  '/blog',
  '/faq',
  '/kontakt',
  '/privatnost',
  '/uvjeti',
]

const routePriority: Record<string, number> = {
  '':             1.0,
  '/cijene':      0.9,
  '/prezentacija': 0.85,
  '/treneri':     0.8,
  '/kako-radi':   0.75,
}

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
      priority: routePriority[route] ?? 0.7,
      alternates: {
        languages: {
          hr: `${BASE}${route}`,
          en: `${BASE}/en${route}`,
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
      priority: (routePriority[route] ?? 0.7) - 0.05,
    })
  }

  // SEO landing pages
  for (const { url, priority } of seoRoutes) {
    entries.push({ url, lastModified: new Date(), changeFrequency: 'monthly', priority })
  }

  // Trainer profile pages
  for (const trainer of trainers.filter(t => !t.isPlaceholder)) {
    entries.push({
      url: `${BASE}/treneri/${trainer.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          hr: `${BASE}/treneri/${trainer.slug}`,
          en: `${BASE}/en/treneri/${trainer.slug}`,
        },
      },
    })
    entries.push({
      url: `${BASE}/en/treneri/${trainer.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Blog posts - Croatian (with hreflang alternates)
  // Build a lookup map so HR posts can point to their EN counterpart
  const enSlugSet = new Set(postsEn.map(p => p.slug))

  for (const post of postsHr) {
    const hasEn = enSlugSet.has(post.slug)
    entries.push({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      ...(hasEn && {
        alternates: {
          languages: {
            hr: `${BASE}/blog/${post.slug}`,
            en: `${BASE}/en/blog/${post.slug}`,
            'x-default': `${BASE}/blog/${post.slug}`,
          },
        },
      }),
    })
  }

  // Blog posts - English (with hreflang alternates)
  const hrSlugSet = new Set(postsHr.map(p => p.slug))

  for (const post of postsEn) {
    const hasHr = hrSlugSet.has(post.slug)
    entries.push({
      url: `${BASE}/en/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.55,
      ...(hasHr && {
        alternates: {
          languages: {
            hr: `${BASE}/blog/${post.slug}`,
            en: `${BASE}/en/blog/${post.slug}`,
            'x-default': `${BASE}/blog/${post.slug}`,
          },
        },
      }),
    })
  }

  return entries
}

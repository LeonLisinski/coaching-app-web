import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'
import { getMetaPageDescription, getMetaPageTitle } from '@/lib/blog/augment-post'
import BlogPostPage from '@/components/legal/BlogPostPage'
import { buildPageMetadata } from '@/lib/seo-metadata'
import { absoluteUrl } from '@/lib/site'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const HR_MONTHS: Record<string, string> = {
  'siječnja': '01', 'veljače': '02', 'ožujka': '03', 'travnja': '04',
  'svibnja': '05', 'lipnja': '06', 'srpnja': '07', 'kolovoza': '08',
  'rujna': '09', 'listopada': '10', 'studenog': '11', 'prosinca': '12',
}
const EN_MONTHS: Record<string, string> = {
  'January': '01', 'February': '02', 'March': '03', 'April': '04',
  'May': '05', 'June': '06', 'July': '07', 'August': '08',
  'September': '09', 'October': '10', 'November': '11', 'December': '12',
}

function toIsoDate(dateStr: string): string {
  const parts = dateStr.replace(/\./g, '').trim().split(/\s+/)
  if (parts.length < 3) return '2025-01-01'
  const day = parts[0].padStart(2, '0')
  const month = HR_MONTHS[parts[1]] ?? EN_MONTHS[parts[1]] ?? '01'
  const year = parts[2]
  return `${year}-${month}-${day}`
}

export async function generateStaticParams() {
  const hrSlugs = postsHr.map(p => ({ locale: 'hr', slug: p.slug }))
  const enSlugs = postsEn.map(p => ({ locale: 'en', slug: p.slug }))
  return [...hrSlugs, ...enSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const posts = locale === 'hr' ? postsHr : postsEn
  const post = posts.find(p => p.slug === slug)
  if (!post) return {}
  const pathname = locale === 'hr' ? `/blog/${slug}` : `/en/blog/${slug}`
  const metaTitle = getMetaPageTitle(post)
  const metaDesc = getMetaPageDescription(post)
  return buildPageMetadata({
    locale: locale === 'hr' ? 'hr' : 'en',
    pathname,
    title: `${metaTitle} | UnitLift`,
    description: metaDesc,
    languages: {
      hr: `/blog/${slug}`,
      en: `/en/blog/${slug}`,
      'x-default': `/blog/${slug}`,
    },
  })
}

export default async function BlogSlugPage({ params }: Props) {
  const { locale, slug } = await params
  const posts = locale === 'hr' ? postsHr : postsEn
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = posts
    .filter(p => p.slug !== slug)
    .slice(0, 3)

  const pagePath = locale === 'hr' ? `/blog/${slug}` : `/en/blog/${slug}`
  const pageUrl = absoluteUrl(pagePath)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: toIsoDate(post.publishedAt),
    dateModified: toIsoDate(post.publishedAt),
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'UnitLift',
      url: absoluteUrl('/'),
    },
    url: pageUrl,
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  )
}

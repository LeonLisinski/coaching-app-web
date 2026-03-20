import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'
import BlogPostPage from '@/components/legal/BlogPostPage'

interface Props {
  params: Promise<{ locale: string; slug: string }>
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
  return {
    title: `${post.title} | UnitLift Blog`,
    description: post.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}`, languages: { hr: `/hr/blog/${slug}`, en: `/en/blog/${slug}` } },
  }
}

export default async function BlogSlugPage({ params }: Props) {
  const { locale, slug } = await params
  const posts = locale === 'hr' ? postsHr : postsEn
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = posts
    .filter(p => p.slug !== slug)
    .slice(0, 3)

  return <BlogPostPage post={post} relatedPosts={relatedPosts} />
}

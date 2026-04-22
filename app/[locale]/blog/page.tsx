import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'
import BlogListPage from '@/components/legal/BlogListPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/blog' : '/en/blog',
    title: isHr ? 'Blog - savjeti za online fitness trenere' : 'Blog - tips for online fitness coaches',
    description: isHr
      ? 'Članci o klijentima, alatima, check-inima i poslu. Bez praznih fraza - stvari koje koristimo sami.'
      : 'Posts on clients, tools, check-ins, and the day-to-day. No filler - what we use ourselves.',
    languages: { hr: '/blog', en: '/en/blog', 'x-default': '/blog' },
  })
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const posts = locale === 'hr' ? postsHr : postsEn
  return <BlogListPage posts={posts} />
}

import type { Metadata } from 'next'
import { postsHr } from '@/lib/blog/posts-hr'
import { postsEn } from '@/lib/blog/posts-en'
import BlogListPage from '@/components/legal/BlogListPage'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Blog | UnitLift' : 'Blog | UnitLift',
    description: isHr
      ? 'Savjeti, vodiči i novosti za online fitness trenere. Više klijenata, manje kaosa.'
      : 'Tips, guides and news for online fitness coaches. More clients, less chaos.',
    alternates: { canonical: `/${locale}/blog` },
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const posts = locale === 'hr' ? postsHr : postsEn
  return <BlogListPage posts={posts} />
}

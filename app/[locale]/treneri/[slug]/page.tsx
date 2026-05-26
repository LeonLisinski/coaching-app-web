import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildPageMetadata } from '@/lib/seo-metadata'
import TrainerProfilePage from '@/components/legal/TrainerProfilePage'
import { trainers, getTrainerBySlug } from '@/lib/trainers/trainers'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const active = trainers.filter(t => !t.isPlaceholder)
  return ['hr', 'en'].flatMap(locale =>
    active.map(t => ({ locale, slug: t.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const trainer = getTrainerBySlug(slug)
  if (!trainer) return {}
  const isHr = locale === 'hr'
  const title = isHr
    ? `${trainer.name} - osobni trener | UnitLift`
    : `${trainer.name} - personal trainer | UnitLift`
  const description = isHr
    ? trainer.shortBio
    : (trainer.en?.shortBio ?? trainer.shortBio)
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? `/treneri/${slug}` : `/en/treneri/${slug}`,
    title,
    description,
    robots: { index: true, follow: true },
    languages: {
      hr: `/treneri/${slug}`,
      en: `/en/treneri/${slug}`,
      'x-default': `/treneri/${slug}`,
    },
  })
}

export default async function TrainerPage({ params }: Props) {
  const { slug } = await params
  const trainer = getTrainerBySlug(slug)
  if (!trainer) notFound()
  return <TrainerProfilePage trainer={trainer} />
}

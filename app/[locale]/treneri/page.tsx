import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-metadata'
import TrainersListPage from '@/components/legal/TrainersListPage'
import { trainers } from '@/lib/trainers/trainers'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isHr = locale === 'hr'
  return buildPageMetadata({
    locale: isHr ? 'hr' : 'en',
    pathname: isHr ? '/treneri' : '/en/treneri',
    title: isHr
      ? 'Naši treneri - certificirani osobni treneri | UnitLift'
      : 'Our trainers - certified personal trainers | UnitLift',
    description: isHr
      ? 'Upoznaj UnitLift trenere. Certificirani osobni treneri dostupni online i uživo, specijalizirani za trening snage, mišićnu masu i tjelesnu kompoziciju.'
      : 'Meet the UnitLift trainers. Certified personal trainers available online and in person, specialising in strength training, muscle building and body composition.',
    robots: { index: true, follow: true },
    languages: { hr: '/treneri', en: '/en/treneri', 'x-default': '/treneri' },
  })
}

export default async function TreneriPage() {
  return <TrainersListPage trainers={trainers} />
}

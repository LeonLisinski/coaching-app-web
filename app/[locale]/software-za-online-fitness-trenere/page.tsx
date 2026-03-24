import { redirect } from 'next/navigation'
import SeoLandingPage from '@/components/landing/SeoLandingPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (locale !== 'hr') return {}
  return {
    title: 'Software za Online Fitness Trenere | UnitLift',
    description: 'UnitLift je platforma za online fitness trenere koja zamjenjuje WhatsApp, Excel i PDF-ove. Planovi treninga, prehrane, check-ini i plaćanja — sve na jednom mjestu. Isprobaj 14 dana besplatno.',
    keywords: ['software za fitness trenere', 'aplikacija za personal trenere', 'online coaching platforma', 'program za trenere', 'trenerska aplikacija hrvatska', 'unitlift'],
    alternates: {
      canonical: '/hr/software-za-online-fitness-trenere',
      languages: {
        hr: '/hr/software-za-online-fitness-trenere',
        en: '/en/online-personal-trainer-software',
      },
    },
    openGraph: {
      title: 'Software za Online Fitness Trenere | UnitLift',
      description: 'Zamijeni WhatsApp i Excel jednom platformom. Planovi, check-ini, plaćanja — sve na jednom ekranu.',
      url: 'https://unitlift.com/hr/software-za-online-fitness-trenere',
      type: 'website',
    },
  }
}

export default async function SoftwareZaFitnessTrenerePage({ params }: Props) {
  const { locale } = await params
  // Redirect EN visitors to the EN-keyword URL
  if (locale === 'en') redirect('/en/online-personal-trainer-software')
  return <SeoLandingPage />
}

import ContactPage from '@/components/legal/ContactPage'

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Kontakt – UnitLift' : 'Contact – UnitLift',
    description: isHr
      ? 'Kontaktiraj UnitLift tim. Odgovaramo unutar jednog radnog dana.'
      : 'Contact the UnitLift team. We respond within one business day.',
    robots: { index: true, follow: true },
    alternates: { canonical: locale === 'hr' ? '/kontakt' : '/en/kontakt', languages: { hr: '/kontakt', en: '/en/kontakt', 'x-default': '/kontakt' } },
  }
}

export default async function KontaktPage() {
  return <ContactPage />
}

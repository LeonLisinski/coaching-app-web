import { getLocale } from 'next-intl/server'
import ContactPage from '@/components/legal/ContactPage'

export async function generateMetadata() {
  const locale = await getLocale()
  const isHr = locale === 'hr'
  return {
    title: isHr ? 'Kontakt – UnitLift' : 'Contact – UnitLift',
    description: isHr
      ? 'Kontaktiraj UnitLift tim. Odgovaramo unutar jednog radnog dana.'
      : 'Contact the UnitLift team. We respond within one business day.',
    robots: { index: true, follow: true },
  }
}

export default async function KontaktPage() {
  return <ContactPage />
}

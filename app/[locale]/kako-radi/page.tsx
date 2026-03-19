import type { Metadata } from 'next'
import HowItWorksPage from '@/components/legal/HowItWorksPage'

export const metadata: Metadata = {
  title: 'Kako radi | UnitLift',
  description: 'Saznaj kako UnitLift funkcionira za trenere i klijente. Jedna platforma za planove treninga, check-ine, financije i komunikaciju.',
}

export default function KakoRadiPage() {
  return <HowItWorksPage />
}

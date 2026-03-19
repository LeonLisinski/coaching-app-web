import type { Metadata } from 'next'
import PricingPage from '@/components/legal/PricingPage'

export const metadata: Metadata = {
  title: 'Cijene | UnitLift',
  description: 'Jednostavne cijene bez iznenađenja. 14 dana besplatno na svim planovima. Starter €29/mj, Pro €59/mj, Scale €99/mj.',
}

export default function CijenePage() {
  return <PricingPage />
}

export interface QuickInfoItem {
  label: string
  value: string
}

export interface TrainerContent {
  title?: string
  shortBio?: string
  fullBio?: string[]
  specialties?: string[]
  certifications?: string[]
  contactIntro?: string
  quickInfo?: QuickInfoItem[]
}

export interface Trainer {
  slug: string
  name: string
  title: string
  shortBio?: string
  fullBio?: string[]
  image?: string
  specialties?: string[]
  certifications?: string[]
  quickInfo?: QuickInfoItem[]
  contactIntro?: string
  isFounder?: boolean
  isPlaceholder?: boolean
  /** Name in Croatian instrumental case — used in "Želiš trenirati s ___?" */
  instrumentalName?: string
  /** English first name — used in "Want to train with ___?" */
  firstName?: string
  /** CSS object-position for circle avatar and hero — defaults to "center center" */
  imagePosition?: string
  instagram?: string
  whatsapp?: string
  email?: string
  coachingLink?: string
  /** English overrides — merged over HR base when locale === 'en' */
  en?: TrainerContent
}

/** Returns trainer data merged with locale-specific overrides */
export function resolveTrainer(trainer: Trainer, locale: string): Trainer {
  if (locale === 'en' && trainer.en) {
    return { ...trainer, ...trainer.en }
  }
  return trainer
}

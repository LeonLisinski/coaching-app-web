export interface FAQQuestion {
  q: string
  a: string
}

export interface FAQCategory {
  id: string
  title: string
  questions: FAQQuestion[]
}

export interface FAQData {
  title: string
  subtitle: string
  lastUpdated: string
  categories: FAQCategory[]
}

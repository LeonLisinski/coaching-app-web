export interface LegalItem {
  text?: string
  items?: string[]
  note?: string
  subsection?: string
  emphasis?: string
}

export interface LegalSection {
  id: string
  title: string
  content: LegalItem[]
}

export interface LegalDocument {
  title: string
  lastUpdated: string
  version: string
  intro: string
  callout: string
  sections: LegalSection[]
}

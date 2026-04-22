export interface BlogBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'internal-link'
  text?: string
  items?: string[]
  href?: string
}

export interface BlogPostCta {
  text: string
  btn: string
  href: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categorySlug: string
  readTime: number
  publishedAt: string
  author: string
  authorRole: string
  content: BlogBlock[]
  /** Replaces default `<title> | UnitLift` when set (SEO) */
  metaTitle?: string
  /** Replaces `excerpt` in meta tags when set */
  metaDescription?: string
  /** When set, overrides default blog CTA copy and button href */
  cta?: BlogPostCta
}

export interface BlogData {
  posts: BlogPost[]
}

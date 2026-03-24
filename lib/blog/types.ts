export interface BlogBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'internal-link'
  text?: string
  items?: string[]
  href?: string
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
}

export interface BlogData {
  posts: BlogPost[]
}

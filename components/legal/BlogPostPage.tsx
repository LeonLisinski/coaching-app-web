'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import type { BlogPost } from '@/lib/blog/types'

const categoryColors: Record<string, string> = {
  vodic: '#2233ee',
  guide: '#2233ee',
  alati: '#e17055',
  tools: '#e17055',
  klijenti: '#6c5ce7',
  clients: '#6c5ce7',
  rast: '#00b894',
  growth: '#00b894',
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

interface Props {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostPage({ post, relatedPosts }: Props) {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = locale === 'hr' ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const catColor = categoryColors[post.categorySlug] || '#2233ee'

  const navLabels = t.raw('nav') as string[]
  const navLinks = [
    [t('common.navBack'), `/${locale}`],
    [navLabels[0], `/${locale}/kako-radi`],
    [navLabels[1], `/${locale}#funkcije`],
    [navLabels[2], `/${locale}/cijene`],
    ['Blog', `/${locale}/blog`],
    ['FAQ', `/${locale}/faq`],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLang() {
    try { localStorage.setItem('unitlift_locale', otherLocale) } catch {}
    router.push(`/${otherLocale}/blog`)
  }

  return (
    <div className="legal-root">
      {/* Navbar */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${locale}`} className="nl">
          <LogoSvg height={28} />
          <span className="nw">UnitLift</span>
        </Link>
        <ul className="navlinks">
          {navLinks.map(([label, href]) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="navact">
          <button className="langbtn navlang" onClick={switchLang}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <a href="https://app.unitlift.com/login" className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('login')}
          </a>
          <a href={`/${locale}/cijene`} className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {t('common.tryFree')}
          </a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label={t('common.menuAria')}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <button className="langbtn mobc" onClick={() => { switchLang(); setMenuOpen(false) }}>
          {t('common.langSwitchLabel')} {otherLocale.toUpperCase()}
        </button>
      </div>

      {/* Hero */}
      <div className="legal-hero blog-post-hero" style={{ '--post-color': catColor } as React.CSSProperties}>
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          {/* Breadcrumb */}
          <nav className="blog-breadcrumb" aria-label="breadcrumb">
            <Link href={`/${locale}`}>UnitLift</Link>
            <span className="blog-breadcrumb-sep">›</span>
            <Link href={`/${locale}/blog`}>Blog</Link>
            <span className="blog-breadcrumb-sep">›</span>
            <span>{post.category}</span>
          </nav>

          <div className="blog-post-hero-cat" style={{ background: catColor }}>
            {post.category.toUpperCase()}
          </div>
          <h1 className="legal-title" style={{ maxWidth: '720px' }}>{post.title}</h1>

          {/* Author row */}
          <div className="blog-post-hero-meta">
            <div className="blog-post-author-row">
              <div className="blog-author-avatar blog-author-avatar--lg" style={{ background: catColor }}>
                {getInitials(post.author)}
              </div>
              <span className="blog-post-author-name">{post.author}</span>
            </div>
            <div className="blog-post-meta-right">
              <span className="blog-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {post.publishedAt}
              </span>
              <span className="blog-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                {post.readTime} min {t('blogPage.readTime')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body">
        <div className="legal-body-inner">
          {/* Article content */}
          <main className="legal-main blog-post-main">
            {post.content.map((block, i) => {
              if (block.type === 'heading') {
                return <h2 key={i} className="blog-post-h2">{block.text}</h2>
              }
              if (block.type === 'subheading') {
                return <h3 key={i}>{block.text}</h3>
              }
              if (block.type === 'paragraph') {
                return <p key={i}>{block.text}</p>
              }
              if (block.type === 'list') {
                return (
                  <ul key={i} className="legal-list">
                    {block.items?.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={i} className="blog-post-quote">
                    {block.text}
                  </blockquote>
                )
              }
              if (block.type === 'internal-link' && block.href && block.text) {
                return (
                  <p key={i} className="blog-internal-link-note">
                    <a href={block.href}>{block.text}</a>
                  </p>
                )
              }
              return null
            })}

            <div className="blog-post-cta">
              <div className="blog-post-cta-inner">
                <div className="blog-post-cta-icon">🚀</div>
                <div>
                  <div className="blog-post-cta-title">{t('blogPage.ctaTitle')}</div>
                  <div className="blog-post-cta-text">{t('blogPage.ctaText')}</div>
                </div>
                <a href={`/${locale}/cijene`} className="btn btn-p" style={{ whiteSpace: 'nowrap', fontSize: '.85rem' }}>
                  {t('blogPage.ctaBtn')}
                </a>
              </div>
            </div>

            <div className="legal-footer-note">
              <Link href={`/${locale}/blog`} style={{ color: 'var(--ba)', textDecoration: 'none', fontWeight: 600 }}>
                ← {t('blogPage.backToAll')}
              </Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="legal-toc">
            <div className="legal-toc-sticky">
              {/* Author card */}
              <div className="blog-sidebar-author">
                <div className="blog-author-avatar blog-author-avatar--lg" style={{ background: catColor }}>
                  {getInitials(post.author)}
                </div>
                <div className="blog-sidebar-author-name">{post.author}</div>
                <div className="blog-sidebar-author-role">{post.authorRole}</div>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="blog-sidebar-related">
                  <div className="legal-toc-title">{t('blogPage.moreToRead')}</div>
                  <div className="legal-toc-nav">
                    {relatedPosts.map(p => (
                      <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="blog-sidebar-post">
                        <span
                          className="blog-sidebar-post-dot"
                          style={{ background: categoryColors[p.categorySlug] || '#2233ee' }}
                        />
                        <span>{p.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="legal-toc-back">
                <Link href={`/${locale}/blog`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M6 2L1 7l5 5M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('blogPage.backToAll')}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="legal-footer-bar">
        <div className="con">
          <div className="legal-footer-row">
            <a href={`/${locale}`} className="fl-logo">
              <LogoSvg height={20} />
              <span>UnitLift</span>
            </a>
            <div className="legal-footer-links">
              <Link href={`/${locale}/blog`}>Blog</Link>
              <Link href={`/${locale}/faq`}>FAQ</Link>
              <Link href={`/${locale}/kontakt`}>{t('common.contact')}</Link>
              <Link href={`/${locale}/uvjeti`}>{t('common.termsShort')}</Link>
              <Link href={`/${locale}/privatnost`}>{t('common.privacy')}</Link>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

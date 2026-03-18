'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
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

const categoryIcons: Record<string, string> = {
  vodic: '📖',
  guide: '📖',
  alati: '🔧',
  tools: '🔧',
  klijenti: '👥',
  clients: '👥',
  rast: '📈',
  growth: '📈',
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

interface Props {
  posts: BlogPost[]
}

export default function BlogListPage({ posts }: Props) {
  const locale = useLocale()
  const router = useRouter()
  const isHr = locale === 'hr'
  const otherLocale = isHr ? 'en' : 'hr'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const navLinks = isHr
    ? [['Kako radi', '#kako-radi'], ['Mobilna app', '#funkcije'], ['Cijene', '#cijene'], ['FAQ', '#faq']]
    : [['How it works', '#kako-radi'], ['Mobile app', '#funkcije'], ['Pricing', '#cijene'], ['FAQ', '#faq']]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const allCategories = Array.from(
    new Map(posts.map(p => [p.categorySlug, p.category])).entries()
  )

  const filtered = activeFilter === 'all' ? posts : posts.filter(p => p.categorySlug === activeFilter)

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
            <li key={label}><a href={`/${locale}${href}`}>{label}</a></li>
          ))}
        </ul>
        <div className="navact">
          <button className="langbtn" onClick={() => router.push(`/${otherLocale}/blog`)}>
            {otherLocale.toUpperCase()} ↕
          </button>
          <a href={`/${locale}`} className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
          <a href="https://app.unitlift.com/login" className="btn btn-g" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Prijava' : 'Login'}
          </a>
          <a href="https://app.unitlift.com/register" className="btn btn-p" style={{ fontSize: '.82rem', padding: '7px 16px' }}>
            {isHr ? 'Isprobaj besplatno' : 'Try for free'}
          </a>
          <button className="hburg" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobmenu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={`/${locale}${href}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="mobc">
          <a href={`/${locale}`} className="btn btn-g btn-fw" onClick={() => setMenuOpen(false)}>
            {isHr ? '← Na web' : '← Back to site'}
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="legal-hero blog-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner">
          <div className="legal-badge">
            <span className="bdot" />
            Blog
          </div>
          <h1 className="legal-title">
            {isHr ? 'Savjeti, novosti i vodiči' : 'Tips, news and guides'}
          </h1>
          <p className="legal-date">
            {isHr
              ? 'Sve što trebaš znati o online fitness coachingu — iz prve ruke.'
              : 'Everything you need to know about online fitness coaching — from the source.'}
          </p>
          <div className="legal-tabs">
            <Link href={`/${locale}/blog`} className="legal-tab active">Blog</Link>
            <Link href={`/${locale}/faq`} className="legal-tab">FAQ</Link>
            <Link href={`/${locale}/kontakt`} className="legal-tab">
              {isHr ? 'Kontakt' : 'Contact'}
            </Link>
          </div>
          <div className="faq-stats">
            <span><strong>{posts.length}</strong> {isHr ? 'objava' : 'posts'}</span>
            <span className="faq-stats-sep">·</span>
            <span><strong>{allCategories.length}</strong> {isHr ? 'kategorija' : 'categories'}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="blog-list-body">
        {/* Category filter */}
        <div className="blog-filter-row">
          <button
            className={`blog-filter-btn${activeFilter === 'all' ? ' active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {isHr ? 'Sve' : 'All'}
            <span className="blog-filter-count">{posts.length}</span>
          </button>
          {allCategories.map(([slug, label]) => (
            <button
              key={slug}
              className={`blog-filter-btn${activeFilter === slug ? ' active' : ''}`}
              onClick={() => setActiveFilter(slug)}
              style={activeFilter === slug ? { '--cat-color': categoryColors[slug] || '#2233ee' } as React.CSSProperties : {}}
            >
              {label}
              <span className="blog-filter-count">
                {posts.filter(p => p.categorySlug === slug).length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="blog-grid">
          {filtered.map((post) => {
            const color = categoryColors[post.categorySlug] || '#2233ee'
            const icon = categoryIcons[post.categorySlug] || '📄'
            return (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="blog-card">
                {/* Card top */}
                <div className="blog-card-top" style={{ background: color }}>
                  <div className="blog-card-circles">
                    <span /><span /><span />
                  </div>
                  <div className="blog-card-icon">{icon}</div>
                  <div className="blog-card-meta-top">
                    <span className="blog-cat-badge">{post.category}</span>
                    <span className="blog-read-time">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                      </svg>
                      {post.readTime} min
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-author">
                      <div
                        className="blog-author-avatar"
                        style={{ background: color }}
                      >
                        {getInitials(post.author)}
                      </div>
                      <div>
                        <div className="blog-author-name">{post.author}</div>
                        <div className="blog-author-date">{post.publishedAt}</div>
                      </div>
                    </div>
                    <span className="blog-card-read">
                      {isHr ? 'Čitaj' : 'Read'}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="blog-empty">
            {isHr ? 'Nema objava u ovoj kategoriji.' : 'No posts in this category.'}
          </div>
        )}
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
              <Link href={`/${locale}/kontakt`}>{isHr ? 'Kontakt' : 'Contact'}</Link>
              <Link href={`/${locale}/uvjeti`}>{isHr ? 'Uvjeti' : 'Terms'}</Link>
              <Link href={`/${locale}/privatnost`}>{isHr ? 'Privatnost' : 'Privacy'}</Link>
            </div>
            <span className="legal-footer-copy">© 2026 UnitDuo, vl. Leon Lišinski</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

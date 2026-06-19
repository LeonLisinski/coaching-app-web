import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',     value: 'nosniff' },
  { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js inline scripts + Google Analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net",
      // Next.js image optimization + external images
      "img-src 'self' data: blob: https://*.googletagmanager.com https://www.google-analytics.com",
      // Styles: inline (Next.js CSS-in-JS) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // API calls to Supabase + Stripe + our app
      "connect-src 'self' https://*.supabase.co https://api.resend.com https://www.google-analytics.com https://analytics.google.com wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error'] }
      : false,
  },
  experimental: {
    optimizePackageImports: ['next-intl'],
  },
  images: {
    formats: ['image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1920],
    imageSizes: [260, 320, 640],
    minimumCacheTTL: 2592000,
  },
}

export default withNextIntl(nextConfig)

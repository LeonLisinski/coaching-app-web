import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  compiler: {
    // Remove console.* calls in production (except errors)
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error'] }
      : false,
  },
  experimental: {
    // Tree-shake heavy packages more aggressively
    optimizePackageImports: ['next-intl'],
  },
  images: {
    formats: ['image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1920],
    imageSizes: [260, 320, 640],
    minimumCacheTTL: 2592000, // 30 days
  },
}

export default withNextIntl(nextConfig)

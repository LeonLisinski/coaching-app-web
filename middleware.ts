import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Exclude api, _next, static assets, and /admin (no locale routing needed there)
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
}

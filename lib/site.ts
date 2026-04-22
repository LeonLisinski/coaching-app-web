/** Canonical public origin for the marketing site (use www; matches live redirect + SEO). */
export const SITE_URL = 'https://www.unitlift.com'

export function absoluteUrl(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (p === '') return SITE_URL
  return `${SITE_URL}${p}`
}

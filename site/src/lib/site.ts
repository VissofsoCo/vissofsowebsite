/**
 * The site's canonical origin, used for absolute URLs in metadata, the
 * sitemap and robots.txt.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment to override it — a
 * preview or staging deploy should point at its own domain so its pages are
 * not advertised as the production ones.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vissofso.com'
).replace(/\/$/, '')

/** Every route on the site, in nav order. Keep in step with the Navbar. */
export const routes = [
  '/',
  '/services',
  '/solutions',
  '/about',
  '/team',
  '/careers',
  '/contact',
] as const

/**
 * The Open Graph image, shared by every page.
 *
 * Next replaces the whole `openGraph` object when a page defines one, rather
 * than merging it with the root layout's, so any page that sets its own
 * `openGraph.url` has to restate the image or it loses its link preview.
 */
export const shareImage = {
  url: '/images/share.jpg',
  width: 1200,
  height: 630,
  alt: 'VISSOFSO — Think . Build . Evolve',
} as const

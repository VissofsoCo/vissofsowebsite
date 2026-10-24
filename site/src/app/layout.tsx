import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { company } from '@/data/company'
import { siteUrl } from '@/lib/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  // Absolute URLs are built from this, so Open Graph images and canonical
  // links resolve correctly. A preview or staging deploy can point somewhere
  // else by setting NEXT_PUBLIC_SITE_URL.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s — ${company.name}`,
  },
  description: company.intro,
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.intro,
    url: '/',
    locale: 'en_IN',
    images: [
      {
        url: '/images/share.jpg',
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} — ${company.tagline}`,
    description: company.intro,
    images: ['/images/share.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning: the inline script in <head> strips the no-js
  // class before React hydrates, so the server and client class lists
  // legitimately differ on this one element.
  return (
    <html lang="en" className={`${inter.variable} no-js`} suppressHydrationWarning>
      <head>
        {/* Runs before paint: removes the no-js flag so the scroll reveals
            arm. If scripting is off the flag stays and the CSS shows every
            revealed element outright. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body className="bg-soft-white text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

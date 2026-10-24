'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu whenever the route changes, including on back/forward.
  // Adjusting state during render rather than in an effect: React re-runs
  // this component immediately without committing the stale open menu, so
  // there is no flash of the old state and no cascading extra render.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-24 w-full max-w-[var(--container-width)] items-center justify-between px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className="group relative py-1 text-sm font-medium text-slate transition-colors duration-300 hover:text-ink aria-[current=page]:text-ink"
            >
              {link.label}
              {/* Underline grows from the centre on hover, and stays for the
                  current page. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-ink transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* The wrapper carries the breakpoint, not the Button: Button's own
            base classes include inline-flex, and a `hidden` passed through
            className loses to it because Tailwind orders utilities by
            stylesheet position rather than attribute order. */}
        <span className="hidden xl:block">
          <Button href="/contact">
            Get in Touch <ArrowUpRight size={15} aria-hidden="true" />
          </Button>
        </span>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink xl:hidden"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-y border-line bg-white/95 backdrop-blur xl:hidden"
        >
          <ul className="mx-auto max-w-[var(--container-width)] px-6 sm:px-10 lg:px-14 py-3">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line/60 last:border-0">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block py-4 text-base ${isActive(link.href) ? 'text-ink' : 'text-slate'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Button href="/contact" className="w-full">
                Get in Touch <ArrowUpRight size={15} aria-hidden="true" />
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

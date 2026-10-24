import Link from 'next/link'
import { company } from '@/data/company'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid w-full max-w-[var(--container-width)] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate">{company.intro}</p>
          <p className="tracking-brand mt-6 text-[0.75rem] uppercase text-gunmetal">{company.tagline}</p>
        </div>

        <nav aria-label="Site">
          <h2 className="tracking-brand text-[0.75rem] uppercase text-gunmetal">Company</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate">
            {[
              { href: '/services', label: 'Services' },
              { href: '/solutions', label: 'Solutions' },
              { href: '/about', label: 'About' },
              { href: '/team', label: 'Team' },
              { href: '/careers', label: 'Careers' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="tracking-brand text-[0.75rem] uppercase text-gunmetal">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate">
            <li>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-ink">
                {company.email}
              </a>
            </li>
            {company.phone && company.phoneHref && (
              <li>
                <a href={`tel:${company.phoneHref}`} className="transition-colors hover:text-ink">
                  {company.phone}
                </a>
              </li>
            )}
          </ul>
          {/* The whole row is omitted while there are no social accounts set,
              rather than leaving an empty list and its spacing behind. */}
          {company.social.length > 0 && (
            <ul className="tracking-brand mt-6 flex flex-wrap gap-4 text-[0.75rem] uppercase text-gunmetal">
              {company.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-[var(--container-width)] px-6 sm:px-10 lg:px-14 py-6 text-xs text-gunmetal">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

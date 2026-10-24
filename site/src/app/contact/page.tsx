import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { company } from '@/data/company'
import { shareImage } from '@/lib/site'
import Section from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Contact',
  description: company.phone
    ? `Get in touch with ${company.name} by email or phone.`
    : `Get in touch with ${company.name} by email.`,
  // Each page states its own canonical URL; without this they all
  // inherit the root layout's and claim to be the home page.
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', images: [shareImage] },
}

// The phone card only appears once a real number is set in company.ts.
const cards = [
  {
    icon: Mail,
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
    note: 'We reply within one working day.',
  },
  ...(company.phone && company.phoneHref
    ? [
        {
          icon: Phone,
          label: 'Phone',
          value: company.phone,
          href: `tel:${company.phoneHref}`,
          note: 'Call during business hours.',
        },
      ]
    : []),
]

export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Section
        eyebrow="Contact"
        title="Tell us what you want to build."
        // The copy follows the channels that are actually offered: it only
        // invites a call while a phone number is set in company.ts.
        lead={
          company.phone
            ? 'Email or call — whichever suits you. A short note about the problem, your timeline and any budget range is enough to get started.'
            : 'Send us a short note about the problem, your timeline and any budget range — that is enough to get started.'
        }
        titleAs="h1"
        className="studio pb-28 pt-40 sm:pt-44"
      >
        {/* Two columns only when there is a second card to fill them. */}
        <div className={`grid gap-6 ${cards.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="group rounded-[var(--card-radius)] border border-line bg-white/70 p-8 transition-colors hover:border-gunmetal hover:bg-white"
            >
              <card.icon size={24} strokeWidth={1.25} aria-hidden="true" className="text-ink" />
              <p className="tracking-brand mt-7 text-[0.75rem] uppercase text-gunmetal">{card.label}</p>
              {/* break-all rather than break-words: an email address has no
                  break opportunity, so on a very narrow screen it has to be
                  split mid-word or it pushes the card past the viewport. */}
              <p className="font-display mt-2 break-all text-lg text-ink group-hover:underline sm:text-xl">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-slate">{card.note}</p>
            </a>
          ))}
        </div>

        {/* Office sits beside Hours when there is an address, and the grid
            drops to a single column when there is not. */}
        <dl
          className={`mt-6 grid gap-px overflow-hidden rounded-[var(--card-radius)] border border-line bg-line ${
            company.address ? 'sm:grid-cols-2' : ''
          }`}
        >
          {company.address && (
            <div className="bg-white/70 p-8">
              <dt className="flex items-center gap-3 text-ink">
                <MapPin size={20} strokeWidth={1.25} aria-hidden="true" />
                <span className="tracking-brand text-[0.75rem] uppercase text-gunmetal">
                  Office
                </span>
              </dt>
              <dd className="mt-4 text-sm leading-relaxed text-slate">{company.address}</dd>
            </div>
          )}
          <div className="bg-white/70 p-8">
            <dt className="flex items-center gap-3 text-ink">
              <Clock size={20} strokeWidth={1.25} aria-hidden="true" />
              <span className="tracking-brand text-[0.75rem] uppercase text-gunmetal">Hours</span>
            </dt>
            <dd className="mt-4 text-sm leading-relaxed text-slate">{company.hours}</dd>
          </div>
        </dl>
      </Section>
    </main>
  )
}

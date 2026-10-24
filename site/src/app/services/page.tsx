import type { Metadata } from 'next'
import { services } from '@/data/company'
import { shareImage } from '@/lib/site'
import Section from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'IT consulting, product development, AI automation and business solutions from VISSOFSO.',
  // Each page states its own canonical URL; without this they all
  // inherit the root layout's and claim to be the home page.
  alternates: { canonical: '/services' },
  openGraph: { url: '/services', images: [shareImage] },
}

export default function ServicesPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Section
        eyebrow="Services"
        title="What we build, and how far we take it."
        lead="Four practices that work together. Most projects start in one and end up drawing on the others."
        titleAs="h1"
        className="studio pt-40 sm:pt-44"
      >
        <ol className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-gunmetal">
          {services.map((service) => (
            <li key={service.id}>
              <a href={`#${service.id}`} className="transition-colors hover:text-ink">
                {service.index} — {service.title}
              </a>
            </li>
          ))}
        </ol>
      </Section>

      {services.map((service) => (
        <Section key={service.id} id={service.id} className="border-t border-line bg-white">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <div className="flex items-center gap-4">
                <Icon name={service.icon} size={28} strokeWidth={1.25} className="text-ink" />
                <span className="tracking-brand text-[0.75rem] uppercase text-gunmetal">
                  {service.index}
                </span>
              </div>
              <h2 className="font-display mt-6 text-3xl leading-tight tracking-tight sm:text-4xl">
                {service.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate">{service.detail}</p>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-[var(--card-radius)] border border-line bg-line sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="bg-soft-white p-6 text-sm leading-relaxed text-slate">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <CTABand
        title="Not sure which of these you need?"
        body="Describe the problem rather than the solution — we will tell you what it actually takes."
      />
    </main>
  )
}

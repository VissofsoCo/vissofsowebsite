import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '@/data/company'
import { shareImage } from '@/lib/site'
import Section from '@/components/ui/Section'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Digital presence, operations and automation, customer platforms and modernisation — what VISSOFSO delivers for businesses.',
  // Each page states its own canonical URL; without this they all
  // inherit the root layout's and claim to be the home page.
  alternates: { canonical: '/solutions' },
  openGraph: { url: '/solutions', images: [shareImage] },
}

export default function SolutionsPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Section
        eyebrow="Solutions"
        title="What this actually delivers for your business."
        lead="Services describe what we do. These describe what you end up with — and which practices combine to get there."
        titleAs="h1"
        className="studio pt-40 sm:pt-44"
      />

      <Section className="border-t border-line bg-white">
        <div className="grid gap-6 lg:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.id}
              id={solution.id}
              className="glass flex scroll-mt-28 flex-col rounded-[var(--card-radius)] p-8 transition-transform duration-300 hover:-translate-y-0.5 sm:p-10"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                {solution.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">{solution.body}</p>

              <ul className="mt-7 space-y-3 border-t border-line pt-7">
                {solution.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-slate">
                    <ArrowUpRight size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gunmetal" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <p className="tracking-brand mt-8 text-[0.75rem] uppercase text-gunmetal">
                {solution.services.join(' · ')}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <CTABand
        title="Not sure which of these fits?"
        body="Describe the problem rather than the solution — we will tell you what it actually takes."
      />
    </main>
  )
}

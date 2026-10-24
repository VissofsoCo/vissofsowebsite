import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { company } from '@/data/company'
import { shareImage } from '@/lib/site'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Careers',
  description: `Work with ${company.name}. How we hire and how to get in touch about a role.`,
  // Each page states its own canonical URL; without this they all
  // inherit the root layout's and claim to be the home page.
  alternates: { canonical: '/careers' },
  openGraph: { url: '/careers', images: [shareImage] },
}

/**
 * No roles are listed here, because listing invented openings would waste
 * applicants' time. Add a `roles` array to company.ts and render it above the
 * open application when there are real vacancies.
 */
export default function CareersPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Section
        eyebrow="Careers"
        title="We hire in small numbers, and carefully."
        lead="We work in senior teams on a handful of projects at a time, so openings are occasional rather than constant."
        titleAs="h1"
        className="studio pt-40 sm:pt-44"
      />

      <Section className="border-t border-line bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              No open roles right now
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate">
              There are no vacancies listed at the moment. We do keep good applications on file,
              and we would rather hear from you early than miss you when something opens.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate">
              Send us what you have built — a repository, a live site, an app in a store, a case
              study. We care considerably more about work we can look at than about a CV.
            </p>

            <Button href={`mailto:${company.email}`} className="mt-9">
              Send an open application <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <div className="glass rounded-[var(--card-radius)] p-8 sm:p-10">
            <h2 className="tracking-brand text-[0.75rem] uppercase text-gunmetal">
              How we work
            </h2>
            <dl className="mt-7 space-y-7">
              <div>
                <dt className="font-display text-lg text-ink">Small, senior teams</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate">
                  The people who scope a project build it. No handing work down a chain.
                </dd>
              </div>
              <div>
                <dt className="font-display text-lg text-ink">Work you can point at</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate">
                  Projects ship. You will have things you can show in your own portfolio.
                </dd>
              </div>
              <div>
                <dt className="font-display text-lg text-ink">Honest scoping</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate">
                  We quote what work actually takes, which means fewer weekends spent recovering
                  from an optimistic estimate.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>
    </main>
  )
}

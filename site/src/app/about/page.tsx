import type { Metadata } from 'next'
import { company, pillars, process, strengths } from '@/data/company'
import { shareImage } from '@/lib/site'
import Section from '@/components/ui/Section'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'About',
  description: `${company.name} is a software studio building websites, apps, automation and cloud infrastructure.`,
  // Each page states its own canonical URL; without this they all
  // inherit the root layout's and claim to be the home page.
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', images: [shareImage] },
}

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Section
        eyebrow="About us"
        title="A software studio for businesses that want to build properly."
        lead={`${company.name} designs and builds digital products for companies who would rather have one team handle strategy, design, engineering and the infrastructure underneath.`}
        titleAs="h1"
        className="studio pt-40 sm:pt-44"
      >
        <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-2">
          <p className="text-base leading-relaxed text-slate">
            We work in small, senior teams. The people who scope your project are the people who
            build it, so nothing is lost in a handover between departments.
          </p>
          <p className="text-base leading-relaxed text-slate">
            Our name sits on three ideas — think, build, evolve. We spend real time understanding
            the problem, ship working software early, and keep improving it once it is live.
          </p>
        </div>
      </Section>

      <Section eyebrow="What that means" title="Think. Build. Evolve." className="border-t border-line bg-white">
        <dl className="grid gap-px overflow-hidden rounded-[var(--card-radius)] border border-line bg-line sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.word} className="bg-soft-white p-8 sm:p-10">
              <dt className="font-display text-2xl tracking-tight text-ink">{pillar.word}.</dt>
              <dd className="mt-4 text-sm leading-relaxed text-slate">{pillar.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="How we work" title="Five stages, no surprises." className="border-t border-line">
        <ol className="grid gap-px overflow-hidden rounded-[var(--card-radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {process.map((stage) => (
            <li key={stage.step} className="bg-white p-8">
              <span className="tracking-brand text-[0.75rem] uppercase text-gunmetal">{stage.step}</span>
              <h3 className="font-display mt-5 text-lg text-ink">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="What we hold to" title="The parts we refuse to cut." className="border-t border-line bg-white">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {strengths.map((item) => (
            <div key={item.title} className="border-t border-line pt-6">
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand title="Want to work with us?" body="We take on a small number of projects at a time, so the earlier we talk the better." />
    </main>
  )
}

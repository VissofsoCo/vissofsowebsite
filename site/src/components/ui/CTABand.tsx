import { ArrowUpRight } from 'lucide-react'
import { company } from '@/data/company'
import Button from './Button'
import Reveal from './Reveal'

export default function CTABand({
  title = 'Have an idea? Let’s make it real.',
  body = 'Tell us what you are trying to build and we will come back with an honest view of scope, timeline and cost.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-6 sm:px-10 lg:px-14 py-24 text-center lg:py-[var(--section-spacing)]">
        {/* Centred band, so it settles upward rather than from a side. */}
        <Reveal direction="up">
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-[3.25rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate">{body}</p>
        </Reveal>

        <Reveal direction="up" delay={2} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/contact">
            Start your project <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button href={`mailto:${company.email}`} variant="secondary">
            Email us
          </Button>
        </Reveal>

        <p className="tracking-brand mt-14 text-[0.75rem] uppercase text-gunmetal">
          {company.partnerLine}
        </p>
      </div>
    </section>
  )
}

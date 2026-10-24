import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { team, teamPrinciples } from '@/data/company'
import { shareImage } from '@/lib/site'
import Section from '@/components/ui/Section'
import CTABand from '@/components/ui/CTABand'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'The people behind VISSOFSO — how the team is structured and who you work with on a project.',
  // Each page states its own canonical URL; without this they all
  // inherit the root layout's and claim to be the home page.
  alternates: { canonical: '/team' },
  openGraph: { url: '/team', images: [shareImage] },
}

/** First letters of the first and last words, e.g. "Kavin S" → "KS". */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

// The grid only opens up to as many columns as there are people, so a single
// card is not left stranded in a third of a row.
const gridClass = [
  'grid gap-6',
  team.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md',
  team.length > 2 ? 'lg:grid-cols-3' : '',
]
  .filter(Boolean)
  .join(' ')

export default function TeamPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Section
        eyebrow="Team"
        title="The people you actually work with."
        lead="Projects here are run by small, senior teams. You deal with the people doing the work, not a layer in front of them."
        titleAs="h1"
        className="studio pt-40 sm:pt-44"
      />

      <Section className="border-t border-line bg-white">
        <div className="grid gap-6 lg:grid-cols-3">
          {teamPrinciples.map((principle) => (
            <article
              key={principle.title}
              className="glass flex flex-col rounded-[var(--card-radius)] p-8 sm:p-10"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                {principle.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">{principle.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Profiles"
        title={team.length ? 'Who you will meet.' : 'Profiles are on the way.'}
        lead={
          team.length
            ? team.length > 1
              ? 'The people most likely to be on your project.'
              : 'Who you will be dealing with directly.'
            : 'We would rather leave this blank than fill it with stock faces. Individual profiles are being added — in the meantime, get in touch and you will speak to the team directly.'
        }
        className="border-t border-line"
      >
        {team.length > 0 ? (
          <ul className={gridClass}>
            {team.map((member) => (
              <li
                key={member.id}
                className="glass flex flex-col rounded-[var(--card-radius)] p-8 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt=""
                    aria-hidden="true"
                    width={160}
                    height={160}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="tracking-brand flex h-20 w-20 items-center justify-center rounded-full border border-line bg-soft-white text-lg text-gunmetal"
                  >
                    {initials(member.name)}
                  </span>
                )}

                <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-ink">
                  {member.name}
                </h3>
                <p className="tracking-brand mt-2 text-[0.75rem] uppercase text-gunmetal">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-4 text-base leading-relaxed text-slate">{member.bio}</p>
                )}

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-gunmetal"
                  >
                    {/* The name is in the label so the link makes sense out of context. */}
                    <span>LinkedIn</span>
                    <span className="sr-only">— {member.name}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="glass rounded-[var(--card-radius)] p-10 sm:p-12">
            <p className="text-lg leading-relaxed text-slate">
              Want to know who would be on your project? Ask — we will tell you before you
              commit to anything.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 text-base text-ink transition-colors hover:text-gunmetal"
            >
              Talk to the team
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </Section>

      <CTABand
        title="Work with us, or join us."
        body="Tell us about your project, or ask what it is like to build here."
      />
    </main>
  )
}

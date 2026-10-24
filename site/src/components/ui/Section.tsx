import Reveal from './Reveal'

/** Consistent vertical rhythm and max width for every block on the site. */
export default function Section({
  id,
  eyebrow,
  title,
  /**
   * Heading level for `title`. The opening section of a page passes "h1" so
   * the page has exactly one top-level heading; every later section keeps
   * the default "h2". Styling is identical either way — this only affects
   * the document outline that search engines and screen readers read.
   */
  titleAs: Heading = 'h2',
  lead,
  children,
  className = '',
}: {
  id?: string
  eyebrow?: string
  title?: string
  titleAs?: 'h1' | 'h2'
  lead?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 py-20 sm:py-[calc(var(--section-spacing)*0.8)] lg:py-[var(--section-spacing)] ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--container-width)] px-6 sm:px-10 lg:px-14">
        {(eyebrow || title || lead) && (
          <Reveal direction="left" className="max-w-2xl" as="header">
            {eyebrow && (
              <p className="tracking-brand text-[0.75rem] uppercase text-gunmetal">{eyebrow}</p>
            )}
            {title && (
              <Heading className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-[3.25rem]">
                {title}
              </Heading>
            )}
            {lead && <p className="mt-5 text-lg leading-relaxed text-slate">{lead}</p>}
          </Reveal>
        )}
        {children && (
          <Reveal direction="right" delay={1} className={title || lead ? 'mt-14' : ''}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}

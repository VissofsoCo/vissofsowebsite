import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { company, highlights } from '@/data/company'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/ui/Icon'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="studio relative overflow-hidden pt-28 sm:pt-32" aria-label="Introduction">
      {/*
        The architectural environment: its own layer, entirely separate from
        the navigation, copy and buttons above it. The CSS `studio` gradient
        stays underneath as the fallback if the image is slow or missing.
      */}
      <Image
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center"
      />

      {/*
        Legibility scrim. The plate's left side is a dark structural column,
        which dark copy cannot sit on, so this washes the left third toward
        white and leaves the bright centre and right visible.
      */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(250,250,250,0.72)_0%,rgba(250,250,250,0.52)_32%,rgba(250,250,250,0.2)_56%,transparent_80%)]"
        aria-hidden="true"
      />
      {/* Softens the top so the navigation reads against the sky */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(250,250,250,0.55),transparent)]"
        aria-hidden="true"
      />
      {/* Fades the plate out before the feature strip begins */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-[linear-gradient(180deg,transparent,rgba(245,245,244,0.85)_78%,var(--color-soft-white))]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[var(--container-width)] px-6 sm:px-10 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-6">
          {/* Copy */}
          <div className="max-w-xl">
            <p className="tracking-brand text-[0.8rem] uppercase text-gunmetal sm:text-xs">
              {company.tagline}
            </p>

            {/* 64–96px on desktop per the type scale. Fluid above lg so the
                longest word still fits its column at mid widths instead of
                running under the lockup. */}
            <h1 className="font-display mt-7 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-[clamp(3rem,5.2vw,5.5rem)]">
              <span className="block text-ink">{company.headlineTop}</span>
              <span className="text-fade block">{company.headlineBottom}</span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-relaxed text-slate sm:text-lg">
              {company.intro}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/contact">
                Get Started <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
              <Button href="/services" variant="secondary">
                Explore Services <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Mark + wordmark lockup.

              This is the brand's own chrome artwork rather than live text,
              because the wordmark's metal depth and bevels cannot be
              reproduced with a webfont. The source render came on an opaque
              studio backing; that was keyed out to real transparency, so no
              blend mode is needed and it composites cleanly over the plate. */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <Image
              src="/images/lockup.png"
              alt=""
              aria-hidden="true"
              width={2400}
              height={696}
              priority
              /* Without this, next/image cannot know the rendered width and
                 serves a candidate far smaller than the slot — the lockup was
                 arriving at 850px for a 966px box. These mirror the max-w
                 steps on the class below. */
              sizes="(min-width: 1280px) 62rem, (min-width: 1024px) 48rem, (min-width: 640px) 40rem, 90vw"
              className="w-full max-w-[30rem] drop-shadow-[0_18px_44px_rgba(16,17,20,0.18)] sm:max-w-[40rem] lg:max-w-[48rem] xl:max-w-[62rem]"
            />
          </div>
        </div>

        {/* Strapline, right-aligned as in the brand layout */}
        <Reveal direction="right" className="mt-14 hidden justify-end lg:flex">
          <div className="border-l border-line pl-6">
            {company.strapline.map((word) => (
              <span
                key={word}
                className="tracking-brand block text-[0.75rem] uppercase leading-6 text-gunmetal"
              >
                {word}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Feature strip */}
        <ul className="mt-12 grid gap-y-8 border-t border-line pt-10 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {highlights.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              direction="up"
              delay={(i + 1) as 1 | 2 | 3 | 4}
              className={`flex items-start gap-4 lg:px-8 ${
                i === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-line'
              }`}
            >
              <Icon name={item.icon} size={26} strokeWidth={1.25} className="mt-0.5 shrink-0 text-ink" />
              <div>
                <h2 className="text-sm font-semibold text-ink">{item.title}</h2>
                <p className="mt-1 text-sm text-slate">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal direction="right" className="hidden lg:block">
          <p className="tracking-brand pb-12 text-right text-[0.75rem] uppercase text-gunmetal">
            {company.partnerLine}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

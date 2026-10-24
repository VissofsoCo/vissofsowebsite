# VISSOFSO — website

Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Seven pages:
Home, Services, Solutions, About, Team, Careers, Contact, plus a 404. Every
route prerenders as static content.

Built to the VISSOFSO design style guide: Inter throughout, a monochrome
palette and pill buttons.

No 3D. Motion is limited to two things: sections settle into place as they
scroll into view (`Reveal`), and buttons show a highlight travelling around
their border on hover. Both are dropped entirely under
`prefers-reduced-motion`.

Requires Node 20.9 or newer; built and tested on Node 24.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Still to fill in

In `src/data/company.ts` these are `null` or empty, and anything unset is
simply not rendered — no placeholder ever reaches a visitor:

- `phone` / `phoneHref` — display number, and the `tel:` version (digits and `+` only).
  Setting these makes the phone card appear on Contact and adds the number to
  the footer; the Contact page's own wording switches from "send us a note" to
  "email or call".
- `address` — adds the Office block on Contact.
- `social` — adds the row of links in the footer. Entries look like
  `{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/…' }`.
- `team` — the Team page shows an honest "profiles are on the way" state until
  this array has entries. `bio`, `photo` and `linkedin` are each optional.

`email` is set to `vissofso@gmail.com` — change it if that isn't the address to
list publicly.

## Change the copy

All site text lives in `src/data/company.ts`: the headline, tagline, intro, the
hero feature strip, the four services with their bullet points, the
Think/Build/Evolve pillars, the five process stages and the strengths. Edit that
one file; the components read from it.

## The hero background

`public/images/hero.jpg` is the architectural plate — symmetrical structures,
distant mountains, reflective floor. It sits in its own layer in
`src/components/home/Hero.tsx`, completely separate from the navigation, copy
and buttons drawn above it.

Three scrims sit between the image and the UI, all marked in that file:

- a left-to-right wash, because the plate's left side is a dark structural
  column that dark copy cannot sit on (measured contrast behind the headline is
  16:1, and 5.9:1 for body text);
- a short top fade so the navigation reads against the sky;
- a bottom fade that returns to the page colour before the feature strip.

The `.studio` CSS gradient in `globals.css` stays underneath as the fallback if
the image is slow or missing.

To swap the plate, save a new wide image over `public/images/hero.jpg` — JPEG,
around 2000px across and under ~300KB. Originals live in `../brand-assets/`.

After replacing it, restart the dev server: Next caches optimised images under
`.next/cache`, so the old plate keeps being served otherwise.

If you change the plate's brightness much, re-check the scrim opacities. The
current values keep body text at 5.0:1 and the headline at 14.8:1 against the
darkest pixel beneath them.

## The logo

- `public/images/logo.png` — the mark alone, used in the header and footer.
- `public/images/lockup.png` — the full chrome mark-and-wordmark, used in the
  hero. This is the brand's own 3D artwork rather than live text, because the
  wordmark's metal depth cannot be reproduced with a webfont.
- `favicon.png` and `apple-touch-icon.png` — generated from the mark.

The lockup's source render (`brand-assets/vissofso-logo-8k.png`) came on an
opaque studio backing. That backing was keyed out to real transparency by
modelling it per column — interpolating between the clean strips at the top and
bottom of the frame — and setting each pixel's alpha from how much darker it is
than its local background. The scripts that did it are not part of the app; if
you need to redo it with new artwork, ask and they can be regenerated.

## Colours, type and spacing

All design tokens live at the top of `src/app/globals.css`:

- `@theme` holds the greyscale ramp (`--color-charcoal` through
  `--color-soft-white`) plus the semantic roles `--color-ink` (#101114 primary
  text and filled buttons), `--color-slate` (#555B63 secondary text) and
  `--color-line` (#D1D5DB borders).
- `:root` holds layout rhythm: `--container-width` (1600px),
  `--section-spacing` (120px), `--button-radius` (pill) and `--card-radius`.

One face loads through `next/font` in `src/app/layout.tsx`: Inter. The
`--font-display` and `--font-brand` tokens point at it too, so headings and the
wide-tracked labels (`.brand-mark`, `.tracking-brand`) differ by weight and
letter-spacing rather than by typeface.

The type scale is redefined in `@theme` on a 1.2 ratio anchored at an 18px
body, one step up from Tailwind's defaults — change `--text-*` there and every
`text-` utility moves together.

## Buttons

Every CTA goes through `src/components/ui/Button.tsx` — including the navbar
and the 404, which were once hand-written copies that drifted on padding,
weight and hover treatment. Use it rather than restyling a `Link`.

```tsx
<Button href="/contact">Get Started</Button>
<Button href="/services" variant="secondary">Explore Services</Button>
<Button href="/contact" sheen={false}>No highlight</Button>
```

The travelling highlight is on by default and runs only while hovered or
keyboard-focused. It is pure CSS (`.sheen-track` in `globals.css`), so Button
stays a server component and costs no JavaScript.

Its colour must contrast with the button's own fill: the default head is
gunmetal-to-ink for light buttons, and `.sheen-dot--on-ink` inverts it to white
for ink-filled ones. A light highlight on a light button animates perfectly and
is invisible — that bug shipped once already.

One trap when wrapping Button: its base classes include `inline-flex`, so a
`hidden` passed through `className` will not hide it. Tailwind orders utilities
by stylesheet position, not attribute order. Put responsive display on a
wrapper element instead, as the navbar does.

## Careers page

No roles are listed, because listing invented openings would waste applicants'
time. When you have real vacancies, add a `roles` array to
`src/data/company.ts` and render it above the open-application block in
`src/app/careers/page.tsx`.

Note that Tailwind 4 renamed the important modifier: it is `absolute!`, not
`!absolute`. The old form fails silently.

## A gotcha with this folder path

The parent folder is named `KAVIN'S`, and the apostrophe breaks Next's metadata
loader for `src/app/favicon.ico` — it produces a confusing "File size for Open
Graph image exceeds 8MB" parse error. The `.ico` was removed and the icons are
declared as PNGs in `layout.tsx` instead, which avoids that path entirely.

If you hit other tooling oddities, moving the project to a path without an
apostrophe is the reliable fix.

## Deploy

```bash
npm run build
```

Every page prerenders as static content. On Vercel, import the repo and it
builds with no configuration. Elsewhere, `npm run build && npm run start`.

## Domain, sitemap and link previews

The canonical domain is `https://vissofso.com`. Override it per environment by
setting `NEXT_PUBLIC_SITE_URL` (a staging deploy should point at its own
domain so its pages are not advertised as the production ones).

`public/sitemap.xml` and `public/robots.txt` are generated by
`scripts/generate-seo-files.mjs`, which runs automatically before
`npm run build`. Run it by hand after changing the routes or the domain:

```
npm run seo
```

They are generated rather than written as Next's `app/sitemap.ts` and
`app/robots.ts` because this project sits under a folder with an apostrophe
in its name (`KAVIN'S`). Next's metadata-route loader embeds the absolute
project path in a single-quoted string, and the apostrophe terminates it, so
those routes fail to parse. The same bug previously broke `app/favicon.ico`.
If the project is ever moved to a path without an apostrophe, the standard
Next metadata routes can be used instead.

The link-preview image is `public/images/share.jpg` (1200x630), composited
from the studio plate and the chrome lockup in `brand-assets/`. Every page
restates it in its own `openGraph.images` — Next replaces the whole
`openGraph` object when a page defines one, so a page that sets its own
`openGraph.url` loses the image unless it names it again.

Each page sets its own `alternates.canonical`; without that they all inherit
the root layout's and claim to be the home page.

## Images

`sharp` is installed, so Next resizes images and serves WebP automatically.
Keep source files in `public/images` at full resolution — the optimiser
produces the sizes that are actually needed, so a large source costs build
time rather than bandwidth.

Measured on the home page at 1x: logo 2.7KB, hero 19KB, lockup 74KB, about
96KB in total. Before `sharp` was installed those same three files shipped
at their original sizes, 549KB in all.

This needs Node 20.9 or newer (the project is on Node 24). On an older Node
`sharp` cannot load, Next silently falls back to serving originals, and
nothing warns you — check with `node -e "require('sharp')"` if
images suddenly look heavy.

Note: Next caches optimised images aggressively. After replacing a file in
`public/images`, stop the dev server and delete the whole `.next` directory
before restarting — clearing only `.next/cache/images` is not enough, and
the old image keeps being served with no warning. The giveaway is that the
served file still has the previous dimensions.

The hero lockup is regenerated from `brand-assets/vissofso-logo-8k.png`,
which still carries its opaque studio backing. Keying it needs two passes:
difference-from-background per column, then discarding connected components
that contain no dark pixels — otherwise the plate's lens flares, light
streaks and floor reflection survive the key, since they differ from the
backing just as much as the logo does.

## Dependency advisories

`npm audit` reports 5 high-severity advisories. All of them are in dev-only
lint tooling and none reaches the built site:

```
npm audit --omit=dev     # found 0 vulnerabilities
```

They come from one chain — `eslint-config-next` → `@next/eslint-plugin-next`
→ `fast-glob` → `micromatch` → `braces` — and the advisory covers every
published version of `braces`, including the newest (3.0.3), so there is
nothing to upgrade to.

**Do not run `npm audit fix --force` here.** Its only suggestion is to
downgrade `eslint-config-next` to v14, which breaks the flat ESLint config
this project uses and still leaves `braces` in the tree. The advisory is a
denial of service triggered by deeply nested glob patterns, which would mean
someone already controlling the lint configuration in this repository.

Re-check after an `eslint-config-next` release that moves off `fast-glob`.

## Upgrading Next

Two things to know, both learned the hard way:

- **Delete `.next` after a major upgrade.** A stale build directory from the
  previous major silently produced a build containing only `/` and a
  pages-router 404, with no error. `rm -rf .next` restored all routes.
- **`next lint` was removed in 16.** The `lint` script now calls `eslint src`
  directly, and `eslint.config.mjs` imports the flat configs from
  `eslint-config-next` instead of bridging them through `FlatCompat`.

React Hooks 7, which ships with the v16 lint config, forbids calling
`setState` synchronously inside an effect. Two places were rewritten: the
navbar now closes its menu by adjusting state during render when the
pathname changes, and `Reveal` defers its reduced-motion fallback to the
next frame.

import Link from 'next/link'

/**
 * Pill buttons per the brand guide.
 * Primary: ink fill, white text, lifts and picks up a silver edge on hover.
 * Secondary: transparent with a hairline border, warming to white on hover.
 *
 * `sheen` adds a highlight that travels around the border while hovered or
 * keyboard-focused. It is drawn entirely in CSS (see .sheen-track in
 * globals.css), so this stays a server component and costs no JavaScript.
 */
const styles = {
  primary:
    'bg-ink text-white hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(201,205,210,0.9),0_8px_24px_rgba(16,17,20,0.18)]',
  secondary:
    'border border-[#bfc3c8] text-ink hover:bg-white hover:shadow-[0_6px_20px_rgba(16,17,20,0.08)]',
} as const

export default function Button({
  href,
  variant = 'primary',
  sheen = true,
  children,
  className = '',
}: {
  href: string
  variant?: keyof typeof styles
  /** Travelling border highlight on hover and focus. On by default; pass
      sheen={false} to opt a button out. */
  sheen?: boolean
  children: React.ReactNode
  className?: string
}) {
  const classes =
    'inline-flex items-center justify-center gap-2 rounded-[var(--button-radius)] px-7 py-3.5 text-sm font-semibold transition-all duration-300 ' +
    `${styles[variant]} ${sheen ? 'group relative' : ''} ${className}`

  // The label sits above the masked ring so the highlight never crosses it.
  const content = sheen ? (
    <>
      <span className="sheen-track" aria-hidden="true">
        <span className={`sheen-dot ${variant === 'primary' ? 'sheen-dot--on-ink' : ''}`} />
      </span>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  ) : (
    children
  )

  // mailto/tel links are plain anchors; internal routes use the router.
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

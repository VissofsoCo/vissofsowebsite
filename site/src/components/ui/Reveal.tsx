'use client'

import { useEffect, useRef, useState } from 'react'

type Direction = 'left' | 'right' | 'up'

/**
 * Settles its children into place when they scroll into view: a small slide
 * from the given direction plus a fade. Uses IntersectionObserver rather than
 * a scroll listener, so nothing runs on the main thread between crossings.
 *
 * The reveal only ever plays once — re-animating on every pass makes a page
 * feel restless when the reader scrolls back up.
 *
 * Elements render hidden, so anyone whose observer never fires would be left
 * with blank sections. Two guards prevent that: the effect reveals outright
 * when IntersectionObserver is missing or motion is reduced, and anything
 * already on screen at mount is revealed on the first callback.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode
  direction?: Direction
  /** Stagger step, 1–4. Each is 80ms later than the one before. */
  delay?: 1 | 2 | 3 | 4
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      // Reduced motion is already handled in CSS, which shows every
      // [data-reveal] outright, so nothing here affects what is painted.
      // The class is still set so the DOM state matches, but on the next
      // frame rather than synchronously — a setState in the effect body
      // would cascade a second render for every element on the page.
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // An element can be scrolled straight past without ever being
        // reported as intersecting — a jump to an anchor, a restored scroll
        // position, or a hard flick on a trackpad. Treating "already above
        // the viewport" as revealed stops those cases leaving gaps behind.
        const scrolledPast = entry.boundingClientRect.bottom < 0

        if (entry.isIntersecting || scrolledPast) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // Starts a little before the element reaches the fold, so the motion
      // has finished by the time it is properly in view.
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={direction}
      data-reveal-delay={delay}
      className={`${visible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}

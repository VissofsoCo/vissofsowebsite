'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/**
 * Gives the brand lockup a shallow sense of depth that follows the cursor.
 *
 * Two things move: the mark tilts a few degrees towards the pointer, and a
 * specular glint slides across it. The glint is masked to the lockup's own
 * alpha channel, so it only ever lights the chrome letterforms and never the
 * empty box around them — which is what makes a flat PNG read as metal.
 *
 * Deliberately not a WebGL scene. There is no geometry to orbit here, the
 * artwork is already a render, and a canvas would cost a few hundred KB plus
 * a second paint path for an effect that three CSS transforms produce.
 *
 * The pointer is tracked across the whole hero rather than just the image,
 * so the mark responds while the reader is still reading the headline.
 */
export default function TiltLockup() {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    // A tilt that answers the cursor is meaningless without one, and on a
    // phone every touch would snap the mark to a corner. Reduced motion opts
    // out for the same reason the scroll reveals do.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    // The hero is the tracking area; fall back to the frame itself if the
    // markup around this component ever changes.
    const area = frame.closest('section') ?? frame

    let pending = 0

    const apply = (x: number, y: number) => {
      frame.style.setProperty('--tilt-y', `${x * 7}deg`)
      frame.style.setProperty('--tilt-x', `${-y * 5}deg`)
      // Shifts against the tilt, so the mark feels like it sits in front of
      // the plate rather than painted on it.
      frame.style.setProperty('--shift-x', `${x * -14}px`)
      frame.style.setProperty('--shift-y', `${y * -10}px`)
      // Glint position, as a percentage across the artwork.
      frame.style.setProperty('--glint-x', `${50 + x * 46}%`)
      frame.style.setProperty('--glint-y', `${50 + y * 60}%`)
      frame.style.setProperty('--glint-opacity', '1')
    }

    const onMove = (event: PointerEvent) => {
      // One update per frame at most: pointermove fires far faster than the
      // display refreshes, and every extra write is a wasted style recalc.
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        const rect = area.getBoundingClientRect()
        // -1 … 1 from the centre of the hero.
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
        apply(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)))
      })
    }

    const onLeave = () => {
      if (pending) cancelAnimationFrame(pending)
      pending = 0
      frame.style.setProperty('--tilt-x', '0deg')
      frame.style.setProperty('--tilt-y', '0deg')
      frame.style.setProperty('--shift-x', '0px')
      frame.style.setProperty('--shift-y', '0px')
      frame.style.setProperty('--glint-opacity', '0')
    }

    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      if (pending) cancelAnimationFrame(pending)
    }
  }, [])

  return (
    <div className="lockup-stage">
      {/* The width steps live on the frame, not the image: the glint
          overlay is absolutely positioned against this box, so the two have
          to resolve to exactly the same rectangle. */}
      <div
        ref={frameRef}
        className="lockup-tilt w-full max-w-[30rem] sm:max-w-[40rem] lg:max-w-[48rem] xl:max-w-[62rem]"
      >
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
             steps on the frame above. */
          sizes="(min-width: 1280px) 62rem, (min-width: 1024px) 48rem, (min-width: 640px) 40rem, 90vw"
          className="w-full drop-shadow-[0_18px_44px_rgba(16,17,20,0.18)]"
        />
        <span className="lockup-glint" aria-hidden="true" />
      </div>
    </div>
  )
}

import { ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="studio flex min-h-screen items-center outline-none">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-6 sm:px-10 lg:px-14 text-center">
        <p className="font-display text-7xl tracking-tight text-ink sm:text-8xl">404</p>
        <h1 className="font-display mt-6 text-2xl tracking-tight text-ink sm:text-3xl">
          This page does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate">
          The link may be out of date, or the address mistyped.
        </p>
        {/* Uses the shared Button so the 404 matches every other CTA on the
            site; it was previously hand-rolled with its own padding, weight
            and hover treatment. */}
        <Button href="/" className="mt-10">
          <ArrowLeft size={16} aria-hidden="true" /> Back home
        </Button>
      </div>
    </main>
  )
}

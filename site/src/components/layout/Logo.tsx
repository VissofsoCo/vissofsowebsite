import Image from 'next/image'
import Link from 'next/link'
import { company } from '@/data/company'

/** Mark + wordmark lockup. Replace public/images/logo.png to change the mark. */
export default function Logo() {
  return (
    <Link href="/" aria-label={`${company.name} home`} className="flex items-center gap-2.5">
      <Image src="/images/logo.png" alt="" aria-hidden width={72} height={72} className="h-9 w-9" priority />
      <span className="brand-mark text-xl text-ink sm:text-2xl">{company.name}</span>
    </Link>
  )
}

import Link from 'next/link'

import type { MemberBookRating } from '@/types/member'
import { type Tone, toneStyles } from '@/styles/tones'

interface Props {
  label: string
  rating: MemberBookRating
  tone: 'highest' | 'lowest'
}

const toneByKind: Record<Props['tone'], Tone> = {
  highest: 'emerald',
  lowest: 'rose'
}

export const RatingHighlight = ({ label, rating, tone }: Props) => {
  const styles = toneStyles[toneByKind[tone]]

  return (
    <Link href={`/books/${rating.book.slug}`} className='group rounded-[1.35rem] border border-white bg-white p-4 transition duration-200 lg:hover:-translate-y-0.5 lg:hover:border-violet-200 lg:hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:lg:hover:border-violet-400/30'>
      <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${styles.title}`}>{label}</p>
      <div className='mt-2 flex items-center justify-between gap-2'>
        <p className='truncate text-sm font-bold text-slate-800 lg:group-hover:text-violet-700 dark:text-slate-100 dark:lg:group-hover:text-violet-300'>{rating.book.title}</p>
        <span className={`shrink-0 rounded-lg px-2 py-1 text-sm font-extrabold ${styles.score}`}>{rating.rating.label || rating.rating.value}</span>
      </div>
    </Link>
  )
}

import Link from 'next/link'

import type { MemberBookRating } from '@/types/member'

interface Props {
  label: string
  rating: MemberBookRating
  tone: 'highest' | 'lowest'
}

const toneStyles = {
  highest: {
    label: 'text-emerald-600 dark:text-emerald-300',
    score: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
  },
  lowest: {
    label: 'text-rose-500 dark:text-rose-300',
    score: 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300',
  },
}

export const RatingHighlight = ({ label, rating, tone }: Props) => {
  const styles = toneStyles[tone]

  return (
    <Link href={`/books/${rating.book.slug}`} className='group rounded-[1.35rem] border border-white bg-white p-4 transition duration-200 lg:hover:-translate-y-0.5 lg:hover:border-violet-200 lg:hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:lg:hover:border-violet-400/30'>
      <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${styles.label}`}>{label}</p>
      <div className='mt-2 flex items-center justify-between gap-2'>
        <p className='truncate text-sm font-bold text-slate-800 lg:group-hover:text-violet-700 dark:text-slate-100 dark:lg:group-hover:text-violet-300'>{rating.book.title}</p>
        <span className={`shrink-0 rounded-lg px-2 py-1 text-sm font-extrabold ${styles.score}`}>{rating.rating.label || rating.rating.value}</span>
      </div>
    </Link>
  )
}

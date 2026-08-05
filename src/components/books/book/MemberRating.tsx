import Image from 'next/image'
import Link from 'next/link'

import type { Rating } from '@/types/rating'
import { Member } from '@/types/member'

interface Props {
  rating: Rating,
  currentMember?: Member 
}
export const MemberRating = ({ rating, currentMember }: Props) => {
  return (
    <div>
      <Link
        key={rating.memberId}
        href={`/members/${currentMember?.slug}`}
        className='group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 transition duration-200 lg:hover:-translate-y-0.5 lg:hover:border-violet-200 lg:hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:lg:hover:border-violet-400/30'>
        <div className='h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-900/5 dark:ring-white/10'>
          <Image
            className='h-full w-full object-cover object-top'
            src={currentMember?.pic || ''}
            width={100}
            height={100}
            loading='lazy'
            alt={currentMember?.name || 'Учасник'}
          />
        </div>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-bold text-slate-800 transition-colors lg:group-hover:text-violet-700 dark:text-slate-100 dark:lg:group-hover:text-violet-300'>
            {currentMember?.name || rating.memberId}
          </p>
        </div>
        <span className='flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-extrabold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300'>
          <svg viewBox='0 0 20 20' fill='currentColor' className='h-3.5 w-3.5'>
            <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
          </svg>
          {rating.label || rating.value}
        </span>
      </Link>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'

import type { MemberBookRating } from '@/types/member'

interface Props {
  memberRatings: MemberBookRating[]
}
export const RatedBooks = ({ memberRatings }: Props) => {
  return (
    <div className='mt-10'>
      <div className='relative mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-linear-to-br from-violet-50/80 via-white to-amber-50/60 p-3 shadow-[0_18px_42px_-34px_rgba(49,46,129,0.5)] dark:border-white/10 dark:from-violet-950/25 dark:via-neutral-950 dark:to-amber-950/15 sm:p-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2'>
          {memberRatings.toReversed().map(({ book, rating }) => (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              className='group flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/85 p-3 lg:transition duration-200 lg:hover:border-violet-200 lg:hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:lg:hover:border-violet-400/30 w-full'>
              <div className='rounded-full w-6 mx-auto leading-6 text-center bg-indigo-100 aspect-square text-[10px] font-semibold uppercase text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'>
                {String(book.id).padStart(2, '0')}
              </div>
              <div className='relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-900/8 dark:bg-neutral-900 dark:ring-white/10'>
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={220}
                  height={280}
                  loading='lazy'
                  className='h-full w-full object-cover transition duration-500 lg:group-hover:scale-105'
                />
              </div>
              <div className=''>
                <div className='flex items-center gap-1 text-amber-500'>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-4 w-4 shrink-0'>
                    <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
                  </svg>
                  <span className='text-lg font-black leading-none tracking-tighter text-slate-800 dark:text-white'>
                    {rating.label || rating.value}
                  </span>
                </div>
                <h3 className='mt-2 line-clamp-2 text-sm font-bold leading-4 text-slate-800 transition-colors lg:group-hover:text-violet-700 dark:text-slate-100 dark:lg:group-hover:text-violet-300'>
                  {book.title}
                </h3>
                <p className='mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500'>
                  {book.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

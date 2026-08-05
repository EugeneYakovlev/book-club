import Image from "next/image";
import Link from "next/link";

import type { Book } from '@/types/book'
import { homeData } from "@/data/home";
import { getRatingsBreakdown } from "@/utils/books";

interface Props {
  book: Book,
  isLowestRated: boolean,
  isTopRated: boolean,
  grayscale?: boolean
}

export const BookCard = ({ book, isLowestRated, isTopRated, grayscale }: Props) => {
  const breakdown = getRatingsBreakdown(book.ratings ?? [], homeData.members);
  const hasRating = typeof book.average === 'number' && book.average > 0;

  return (
    <Link
      href={`/books/${book.slug}`}
      className='group flex max-w-48 w-full shrink-0 snap-start flex-col sm:w-48 lg:w-full lg:min-w-0'
      aria-label={`Відкрити: ${book.title}`}>
      <div className='relative'>
        <div className='relative aspect-2/3 overflow-hidden rounded-[1.4rem] bg-slate-100 shadow-[0_16px_28px_-18px_rgba(15,23,42,0.75)] ring-1 ring-slate-900/8 transition duration-300 ease-out lg:group-hover:-translate-y-1 lg:group-hover:shadow-[0_24px_36px_-18px_rgba(15,23,42,0.65)] dark:bg-neutral-900 dark:ring-white/10'>
          {book.cover && (
            <Image
              src={book.cover}
              alt={book.title}
              width={300}
              height={450}
              loading='lazy'
              className={`h-full w-full object-cover transition duration-500 ${grayscale ? 'lg:grayscale lg:group-hover:grayscale-0' : ''}`}
            />
          )}
          <div className='absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-950/55 to-transparent opacity-0 transition duration-300 lg:group-hover:opacity-100' />
          <span className='absolute left-3 top-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-white/90 px-2 text-[11px] font-bold tabular-nums text-slate-900 shadow-sm backdrop-blur-md dark:bg-slate-950/75 dark:text-white'>
            {String(book.id).padStart(2, '0')}
          </span>
          {isTopRated && (
            <span className='absolute bottom-3 left-3 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-950 shadow-sm'>
              найвища оцінка
            </span>
          )}
          {isLowestRated && (
            <span className='absolute bottom-3 left-3 rounded-full bg-rose-300 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-950 shadow-sm'>
              найнижча оцінка
            </span>
          )}
        </div>

        <div className='px-1 pb-1 pt-3'>
          <p className='truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500'>
            {book.author}
          </p>
          <h3 className='mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5 tracking-[-0.01em] text-slate-900 transition-colors lg:group-hover:text-violet-700 dark:text-neutral-50 dark:lg:group-hover:text-violet-300'>
            {book.title}
          </h3>
          <div className='mt-2 flex items-center justify-between gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400'>
            <span>{book.year}</span>
            {hasRating ? (
              <span className='flex items-center gap-1 text-slate-700 dark:text-slate-200' title={breakdown}>
                <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4 text-amber-400'>
                  <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
                </svg>
                <span className='font-bold text-[14px] tabular-nums'>{book.average?.toFixed(2)}</span>
              </span>
            ) : (
              <span className='text-slate-400'>без оцінок</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

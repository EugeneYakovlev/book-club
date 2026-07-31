import Image from "next/image";
import type { Book } from '@/types/book'

interface Props {
  book: Book,
  isLowestRated: boolean,
  isTopRated: boolean
}

export const BookCard = ({ book, isLowestRated, isTopRated }: Props) => {
  const breakdown = (book.ratings ?? []).map((r) => `${r.member}: ${r.rating.label ? r.rating.label : r.rating.value}`).join(', ')

  return (
    <div
      className='group flex flex-col justify-between w-36 shrink-0 snap-start sm:w-44 md:w-54'
      key={book.id}>
      <div>
        <div className='mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[11px] font-semibold text-amber-900 shadow-sm'>
          {book.id}
        </div>
        <div className='mt-2 mb-3 text-[12px] text-neutral-700 text-center dark:text-neutral-500'>
          {new Date(book.discussionDate).toLocaleDateString('en-GB')}
        </div>
        <div className='relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition grayscale group-hover:grayscale-0 group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-neutral-900 dark:ring-white/10'>
          {book.cover && (
            <Image
              src={book.cover}
              alt={book.title}
              width={300}
              height={450}
              className='aspect-2/3 w-full object-cover'
            />
          )}
        </div>

        <div className='mt-3 px-0.5'>
          <h3 className='line-clamp-2 text-sm leading-snug font-bold text-neutral-900 dark:text-neutral-50'>
            {book.title}
          </h3>
          <p className='mt-1 truncate text-xs font-medium text-neutral-500 dark:text-neutral-400'>
            {book.author} · {book.year}
          </p>
        </div>
      </div>
      <div className='mt-2 flex items-center gap-2 px-0.5' title={breakdown}>
        <svg
          viewBox='0 0 20 20'
          fill='currentColor'
          className='h-4.5 w-4.5 text-amber-400'>
          <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
        </svg>
        <span className='relative top-0.5 text-[14px] font-semibold text-neutral-700 dark:text-neutral-300'>
          {book.average && book.average.toFixed(2)}
        </span>
        {isTopRated && <span title='Найвищий рейтинг'>🔥</span>}
        {isLowestRated && <span title='Найвищий рейтинг'>💩</span>}
      </div>
    </div>
  )
}

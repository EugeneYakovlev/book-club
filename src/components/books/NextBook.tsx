import Image from 'next/image'
import type { Book } from '@/types/book'

interface Props {
  book: Book
}

export const NextBook = ({ book }: Props) => {
  return (
    <div className='mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 transition hover:shadow-2xl ring-black/5 md:flex dark:bg-neutral-900 dark:ring-white/10'>
      <div className='mx-auto w-48 shrink-0 p-6 sm:w-56 md:mx-0 md:w-72 md:p-8'>
        <Image
          src={book.cover}
          alt={book.title}
          width={296}
          height={496}
          className='w-full rounded-xl object-cover shadow-lg'
        />
      </div>

      <div className='flex flex-1 flex-col p-6 justify-between text-center md:p-8 md:text-left'>
        <div>
          <h3 className='text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-neutral-50'>
            {book.title}
          </h3>
          <p className='mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400'>
            {book.author} · {book.year}
          </p>
          <p className='mt-4 line-clamp-6 text-sm leading-relaxed text-neutral-600 md:line-clamp-7 dark:text-neutral-300'>
            {book.description}
          </p>
        </div>

        {book.discussionDate && (
          <div className='mt-6 flex items-center justify-center gap-3 border-t border-neutral-100 pt-6 md:justify-start dark:border-neutral-800'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                className='h-5 w-5'>
                <rect x='3' y='4' width='18' height='18' rx='2' />
                <path d='M16 2v4M8 2v4M3 10h18' />
              </svg>
            </div>
            <div className='text-left'>
              <div className='text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500'>
                Дата обговорення
              </div>
              <div className='text-base font-semibold text-neutral-900 dark:text-neutral-50'>
                {new Date(book.discussionDate).toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

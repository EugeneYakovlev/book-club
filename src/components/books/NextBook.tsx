import Image from 'next/image'
import type { Book } from '@/types/book'
import { DiscussionDateRow } from './book/DiscussionDateRow'

interface Props {
  book: Book
}

export const NextBook = ({ book }: Props) => {
  return (
    <div className='mt-10 max-w-5xl mx-auto overflow-hidden rounded-4xl bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.4)] ring-1 ring-black/5 transition duration-300 lg:hover:-translate-y-1 lg:hover:shadow-2xl md:flex dark:bg-neutral-950 dark:ring-white/10'>
      <div className='relative mx-auto w-full max-w-xs shrink-0 p-6 sm:max-w-sm md:mx-0 md:w-80 md:p-8'>
        <div className='absolute inset-x-0 -top-6 h-32 rounded-b-4xl bg-linear-to-r from-sky-500 to-indigo-500 opacity-20 blur-2xl' />
        <Image
          src={book.cover}
          alt={book.title}
          width={296}
          height={496}
          loading='eager'
          className='relative w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/80'
        />
      </div>

      <div className='flex flex-1 flex-col justify-between bg-linear-to-br from-white via-slate-50 to-slate-100 p-6 text-center md:p-8 md:text-left dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900'>
        <div>
          <h3 className='text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white'>
            {book.title}
          </h3>
          <p className='mt-3 text-sm font-medium text-slate-500 dark:text-slate-400'>
            {book.author} · {book.year}
          </p>
          <p className='mt-6 text-sm leading-6 text-slate-600 dark:text-slate-300'>
            {book.description}
          </p>
        </div>

        {book.discussionDate && (
          <div className='mt-8 md:max-w-70'>
            <DiscussionDateRow date={book.discussionDate} label='Дата обговорення' />
          </div>
        )}
      </div>
    </div>
  )
}

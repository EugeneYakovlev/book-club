import Image from 'next/image'
import Link from 'next/link'

import type { BookWithStats } from '@/types/book'
import { getColumnHighlight } from './columnHighlight'

interface Props {
  books: BookWithStats[]
  hideControls: boolean
  hoveredBookId: number | null
  isScrolled: boolean
  onHoverBook: (bookId: number | null) => void
}

export const BooksTableHeader = ({ books, hideControls, hoveredBookId, isScrolled, onHoverBook }: Props) => {
  return (
    <thead>
      <tr>
        {!hideControls && (
          <th
            scope='col'
            className={`sticky left-0 z-30 w-22 2xl:w-24 border-b border-r border-slate-200 bg-slate-100 p-3 transition-shadow dark:border-white/10 dark:bg-neutral-900 ${
              isScrolled ? 'shadow-[6px_0_10px_-6px_rgba(15,23,42,0.35)]' : ''
            }`}>
            <span className='sr-only'>Учасник</span>
          </th>
        )}
        {books.map((book) => {
          const isHovered = hoveredBookId === book.id

          return (
            <th
              key={book.id}
              scope='col'
              onMouseEnter={() => onHoverBook(book.id)}
              onMouseLeave={() => onHoverBook(null)}
              style={{ boxShadow: getColumnHighlight(isHovered, { top: true }) }}
              className='border-b border-r border-slate-200 bg-slate-100 p-3 align-top last:border-r-0 dark:border-white/10 dark:bg-neutral-900 w-26 min-w-26 2xl:w-30 2xl:min-w-30'>
              <Link href={`/books/${book.slug}`} className='group block'>
                { book.discussionDate && (
                  <span className='mb-1 block text-[9px] text-center font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                    {new Date(book.discussionDate).toLocaleDateString('uk')}
                  </span>
                )}
                <div className='relative mx-auto aspect-2/3 overflow-hidden rounded-xl bg-slate-200 shadow-sm ring-1 ring-slate-900/8 dark:bg-white/10 w-20 2xl:w-26'>
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={100}
                    height={150}
                    className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                  />
                  <span className='absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-slate-700 shadow-sm'>
                    {book.id}
                  </span>
                </div>
                <p
                  className={`mt-2 line-clamp-2 text-center text-[11px] font-bold leading-4 transition-colors group-hover:text-violet-700 dark:group-hover:text-violet-400 ${
                    isHovered
                      ? 'text-violet-700 dark:text-violet-400'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}>
                  {book.title}
                </p>
              </Link>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

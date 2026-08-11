import Image from 'next/image'
import Link from 'next/link'

import type { Book } from '@/types/book'

interface Props {
  books: Book[]
}

export const BooksTableHeader = ({ books }: Props) => {
  return (
    <thead>
      <tr>
        <th
          scope='col'
          className='sticky left-0 top-0 z-30 border-b border-r border-slate-200 bg-slate-100 p-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 '></th>
        {books.map((book) => (
          <th
            key={book.id}
            scope='col'
            className='top-0 z-20 min-w-34 w-34 2xl:min-w-44 2xl:w-44 border-b border-slate-200 bg-slate-100 p-3 align-top '>
            <Link href={`/books/${book.slug}`} className='group block'>
              <div className='relative mx-auto aspect-2/3 w-24 lg:w-28 2xl:w-28 overflow-hidden rounded-xl bg-slate-200 shadow-sm ring-1 ring-slate-900/8 '>
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
              <p className='mt-2 line-clamp-2 text-center text-[11px] font-bold leading-4 text-slate-700 transition-colors group-hover:text-violet-700'>
                {book.title}
              </p>
            </Link>
          </th>
        ))}
      </tr>
    </thead>
  )
}

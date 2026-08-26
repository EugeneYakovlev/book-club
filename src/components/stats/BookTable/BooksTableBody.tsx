import type { Member } from '@/types/member'
import type { Book } from '@/types/book'

import Image from 'next/image'
import Link from 'next/link'

import { getMemberRatings } from '@/utils/member'
import { getRatingLevel } from '@/utils/books'

interface Props {
  books: Book[]
  members: Member[],
  displayAverageRow: boolean,
  hideControls: boolean
}
export const BooksTableBody = ({ books, members, displayAverageRow, hideControls }: Props) => {
  return (
    <>
    <tbody>
      {members.map((member) => {
        const ratingsByBook = new Map(
          getMemberRatings(member.id, books).map(({ book, rating }) => [
            book.id,
            rating
          ])
        )

        return (
          <tr key={member.id} className='group'>
            {!hideControls &&
              <th
                scope='row'
                className='sticky left-0 z-10 border-b border-r border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0e0e0e] p-3 transition-colors group-hover:bg-violet-50 dark:group-hover:bg-[#1f1930]'>
                <Link
                  href={`/members/${member.slug}`}
                  className='flex items-center gap-2.5 mx-auto w-full justify-center'>
                  <Image
                    src={member.pic}
                    alt={member.name}
                    width={120}
                    height={120}
                    className='h-16 w-16 shrink-0 rounded-xl object-cover object-top ring-1 ring-slate-900/8 sm:h-20 sm:w-20'
                  />
                </Link>
              </th>
            }
            {books.map((book) => {
              const rating = ratingsByBook.get(book.id)

              return (
                <td
                  key={book.id}
                  className={`h-20 border-b border-slate-200 dark:border-white/10 p-3 text-center transition-colors group-hover:bg-violet-50/50 dark:group-hover:bg-violet-400/10 ${rating ? `rating-${getRatingLevel(rating.value)}` : ''}`}>
                  {rating ? (
                    <span className='inline-flex items-center font-bold text-base tabular-nums'>
                      {rating.label || rating.value}
                    </span>
                  ) : (
                    <span className='text-sm'>—</span>
                  )}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
    <tbody>
      <tr className={`${displayAverageRow ? '' : 'hidden'}`}>
        <th
          scope='col'
          className='sticky left-0 top-0 border-t-2 z-30 border-b border-r border-slate-200 border-t-slate-300 dark:border-white/10 dark:border-t-white/5 bg-slate-50 dark:bg-[#0e0e0e]'>
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className='mx-auto h-8 w-8 text-amber-400'>
            <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
          </svg>
        </th>
        {books.map((book) => {
          return (
            <td
              key={book.id}
              className={`h-20 border-b border-t-2 border-slate-200 border-t-slate-300 dark:border-white/10 dark:border-t-white/5 p-3 text-center transition-colors bg-violet-50/50 dark:bg-violet-400/10 rating-${getRatingLevel(book.average || 0)}`}>
              {book.average ? (
                <span className='inline-flex items-center font-bold text-xl tabular-nums'>
                  {book.average.toFixed(2)}
                </span>
              ) : (
                <span className='text-sm'>—</span>
              )}
            </td>
          )
        })}
      </tr>
    </tbody>
    </>
  )
}

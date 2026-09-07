import Image from 'next/image'
import Link from 'next/link'

import type { Member } from '@/types/member'
import type { BookWithStats } from '@/types/book'

import { getMemberRatings } from '@/utils/member'
import { getRatingLevel } from '@/utils/books'
import { StarIcon } from '@/components/ui/StarIcon'
import { getColumnHighlight } from './columnHighlight'

interface Props {
  books: BookWithStats[]
  members: Member[]
  displayAverageRow: boolean
  hideControls: boolean
  hoveredBookId: number | null
  isScrolled: boolean
  onHoverBook: (bookId: number | null) => void
}

/** Column separators keep equal ratings in neighbouring cells from merging into one block. */
const cellStyles =
  'h-20 border-b border-r border-slate-200/70 p-3 text-center transition-colors last:border-r-0 dark:border-white/10'

const stickyHeaderStyles =
  'sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 p-3 transition-shadow dark:border-white/10 dark:bg-neutral-900/95'

export const BooksTableBody = ({
  books,
  members,
  displayAverageRow,
  hideControls,
  hoveredBookId,
  isScrolled,
  onHoverBook
}: Props) => {
  const scrolledShadow = isScrolled ? 'shadow-[6px_0_10px_-6px_rgba(15,23,42,0.35)]' : ''

  return (
    <>
      <tbody>
        {members.map((member, memberIndex) => {
          // With the average row hidden, the last member row carries the column's bottom edge.
          const isBottomRow = memberIndex === members.length - 1 && !displayAverageRow

          const ratingsByBook = new Map(
            getMemberRatings(member.id, books).map(({ book, rating }) => [book.id, rating])
          )

          return (
            <tr key={member.id} className='group'>
              {!hideControls && (
                <th
                  scope='row'
                  className={`${stickyHeaderStyles} ${scrolledShadow} group-hover:bg-violet-50 dark:group-hover:bg-violet-950/40`}>
                  <Link
                    href={`/members/${member.slug}`}
                    className='mx-auto flex w-full flex-col items-center gap-1.5'>
                    <Image
                      src={member.pic}
                      alt={member.name}
                      width={120}
                      height={120}
                      className='h-14 w-14 shrink-0 rounded-xl object-cover object-top ring-1 ring-slate-900/8 sm:h-16 sm:w-16'
                    />
                    <span className='text-[11px] font-bold text-slate-700 transition-colors group-hover:text-violet-700 dark:text-slate-200 dark:group-hover:text-violet-300'>
                      {member.name}
                    </span>
                  </Link>
                </th>
              )}
              {books.map((book) => {
                const rating = ratingsByBook.get(book.id)
                const isHovered = hoveredBookId === book.id

                return (
                  <td
                    key={book.id}
                    onMouseEnter={() => onHoverBook(book.id)}
                    onMouseLeave={() => onHoverBook(null)}
                    style={{ boxShadow: getColumnHighlight(isHovered, { bottom: isBottomRow }) }}
                    className={`${cellStyles} group-hover:bg-violet-50/50 dark:group-hover:bg-violet-400/10 ${
                      rating ? `rating-${getRatingLevel(rating.value)}` : ''
                    }`}>
                    {rating ? (
                      <span className='inline-flex items-center text-base font-bold tabular-nums'>
                        {rating.label || rating.value}
                      </span>
                    ) : (
                      <span className='text-sm text-slate-400 dark:text-slate-500'>—</span>
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>

      <tbody className={displayAverageRow ? '' : 'hidden'}>
        <tr>
          {!hideControls && (
            <th
              scope='row'
              className={`${stickyHeaderStyles} ${scrolledShadow} z-20 border-t-2 border-t-slate-300 dark:border-t-white/10`}>
              <StarIcon className='mx-auto h-7 w-7 text-amber-400' />
              <span className='mt-1 text-center block text-[11px] font-bold text-slate-700 dark:text-slate-200'>
                Середня
              </span>
            </th>
          )}
          {books.map((book) => {
            const isHovered = hoveredBookId === book.id

            return (
              <td
                key={book.id}
                onMouseEnter={() => onHoverBook(book.id)}
                onMouseLeave={() => onHoverBook(null)}
                style={{ boxShadow: getColumnHighlight(isHovered, { bottom: true }) }}
                className={`${cellStyles} border-t-2 border-t-slate-300 bg-violet-50/50 dark:border-t-white/10 dark:bg-violet-400/10 rating-${getRatingLevel(
                  book.average
                )}`}>
                {book.average ? (
                  <span className='inline-flex items-center text-xl font-bold tabular-nums'>
                    {book.average.toFixed(2)}
                  </span>
                ) : (
                  <span className='text-sm text-slate-400 dark:text-slate-500'>—</span>
                )}
              </td>
            )
          })}
        </tr>
      </tbody>
    </>
  )
}

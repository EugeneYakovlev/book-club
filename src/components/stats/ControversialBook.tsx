'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { BookWithStats } from '@/types/book'
import type { Member } from '@/types/member'

import { getControversyLevel, getRatingAxis } from '@/utils/books'
import { getMemberColor } from '@/utils/member'
import { Panel } from '@/components/ui/Panel'
import { PillButton } from '@/components/ui/PillButton'
import { RatingSpread } from './RatingSpread'

interface Props {
  books: BookWithStats[]
  members: Member[]
}

const INITIAL_VISIBLE = 7
const LOAD_MORE_STEP = 6

type ControversialBookWithScore = BookWithStats & { controversy: number }

export const ControversialBook = ({ books, members }: Props) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const controversialBooks = books
    .filter((book): book is ControversialBookWithScore => book.controversy !== null)
    .sort((a, b) => b.controversy - a.controversy)

  const [featuredBook, ...otherBooks] = controversialBooks.slice(0, visibleCount)

  if (!featuredBook) return null

  const axis = getRatingAxis(controversialBooks)

  return (
    <Panel id='controversy-table' tone='rose' className='mt-8 @container'>
      <div className='border-b border-slate-200/70 pb-5 dark:border-white/10'>
        <p className='text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-300'>
          Рейтинг найсуперечливіших книг
        </p>
        <p className='mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400'>
          Чим ширше крапки розповзлися, тим сильніше розійшлися думки.
          Засічка - середня оцінка книги.
          Справа рейтинг суперечливості - чим вище, тим більше розбіжностей у оцінках учасників.
        </p>
        <div className='mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5'>
          {members.map((member) => (
            <span
              key={member.id}
              className='flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400'>
              <span
                aria-hidden='true'
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: getMemberColor(member.id, members) }}
              />
              {member.name}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-6 grid gap-3'>
        <Link
          href={`/books/${featuredBook.slug}`}
          className='group relative z-0 flex min-h-60 overflow-hidden rounded-[1.6rem] p-5 text-white shadow-[0_18px_35px_-24px_rgba(15,23,42,0.9)] sm:p-6'>
          <Image
            src={featuredBook.cover}
            alt={featuredBook.title}
            fill
            sizes='(min-width: 1024px) 44vw, 92vw'
            className='object-cover object-center opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-55'
          />
          <div className='absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/75 to-slate-950/20' />

          <div className='relative flex flex-1 flex-col justify-between gap-6'>
            <div className='flex items-start justify-between gap-3'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-black tabular-nums backdrop-blur'>
                1
              </span>
              <span
                className={`rounded-full bg-white px-2.5 py-1 text-2xl font-black tabular-nums dark:bg-black/90 controversy-${getControversyLevel(featuredBook.controversy)}`}>
                {featuredBook.controversy.toFixed(2)}
              </span>
            </div>

            <div>
              <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-white/60'>{featuredBook.author}</p>
              <h3 className='mt-2 max-w-xs text-2xl font-black leading-tight tracking-tight sm:text-3xl'>
                {featuredBook.title}
              </h3>
              <div className='mt-5 rounded-2xl bg-slate-950/40 px-4 py-3 backdrop-blur-[2px]'>
                <RatingSpread
                  ratings={featuredBook.ratings ?? []}
                  axis={axis}
                  average={featuredBook.average}
                  members={members}
                  showGrid={false}
                  inverted
                />
              </div>
            </div>
          </div>
        </Link>

        <div>
          <ol className='grid grid-cols-2 gap-3'>
            {otherBooks.map((book, index) => (
              <li key={book.id}>
                <Link
                  href={`/books/${book.slug}`}
                  className='group block rounded-2xl border border-slate-200/70 bg-white/70 p-3 shadow-sm transition duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md dark:border-white/10 dark:bg-white/5'>
                  <div className='flex items-center gap-3'>
                    <span className='w-3 shrink-0 text-center text-xs font-black tabular-nums text-slate-500 dark:text-slate-400'>
                      {index + 2}
                    </span>
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={64}
                      height={96}
                      className='h-15 w-10 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-slate-900/8 dark:ring-white/10'
                    />
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-baseline justify-between gap-2'>
                        <p className='truncate text-sm font-bold leading-5 text-slate-800 transition-colors group-hover:text-rose-700 dark:text-slate-100 dark:group-hover:text-rose-300'>
                          {book.title}
                        </p>
                        <span
                          className={`shrink-0 text-base font-black tabular-nums controversy-${getControversyLevel(book.controversy)}`}>
                          {book.controversy.toFixed(2)}
                        </span>
                      </div>
                      <p className='mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400'>
                        {book.author}
                      </p>
                    </div>
                  </div>

                  <div className='mt-2.5'>
                    <RatingSpread
                      ratings={book.ratings ?? []}
                      axis={axis}
                      average={book.average}
                      members={members}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {visibleCount < controversialBooks.length && (
          <div className='flex justify-center'>
            <PillButton onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}>
              Показати ще
            </PillButton>
          </div>
        )}
      </div>
    </Panel>
  )
}

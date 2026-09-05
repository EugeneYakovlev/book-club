'use client'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { BookWithStats } from '@/types/book'
import { getControversyLevel } from '@/utils/books'
import { Panel } from '@/components/ui/Panel'
import { PillButton } from '@/components/ui/PillButton'

interface Props {
  books: BookWithStats[]
}

const getRatingRange = (book: BookWithStats) => {
  const values = (book.ratings ?? []).map((rating) => rating.value)

  return values.length ? `${Math.min(...values).toFixed(2)} — ${Math.max(...values).toFixed(2)}` : '—'
}

export const ControversialBook = ({ books }: Props) => {
  const visibleIncrement = 7
  const [visibleCount, setVisibleCount] = useState(visibleIncrement)

  const controversialBooks = books
    .filter((book): book is BookWithStats & { controversy: number } => book.controversy !== null)
    .sort((a, b) => b.controversy - a.controversy)

  const visibleBooks = controversialBooks.slice(0, visibleCount)  
  const [featuredBook, ...otherBooks] = visibleBooks

  if (!featuredBook) return null

  return (
    <Panel id='controversy-table' tone='rose' className='mt-8'>
      <div className='flex items-end justify-between gap-4 border-b border-slate-200/70 pb-5 dark:border-white/10'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-300'>Рейтинг найсуперечливіших книг</p>
          <p className='mt-2 text-sm tracking-tighter leading-6 text-slate-500 dark:text-slate-400'>Чим більший показник, тим сильніше відрізняються оцінки учасників (від 0 до 2.5)</p>
        </div>
      </div>

      <div className='w-full h-1.5 rounded-full bg-linear-to-r to-red-700 via-60 via-red-400 via-40% via-yellow-400 via-24% via-emerald-300 via-16% via-emerald-500 via-8% from-emerald-600'></div>

      <div className='mt-6 grid gap-6'>
        <Link href={`/books/${featuredBook.slug}`} className='group relative z-0 flex min-h-70 overflow-hidden rounded-[1.6rem] p-5 text-white shadow-[0_18px_35px_-24px_rgba(15,23,42,0.9)] sm:p-6'>
          <Image src={featuredBook.cover} alt={featuredBook.title} fill className='object-cover object-center opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-55' />
          <div className='absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/75 to-slate-950/20' />
          <div className='relative flex flex-1 items-end justify-between'>
            <div>
              <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-white/60'>{featuredBook.author}</p>
              <h3 className='mt-2 max-w-xs text-2xl font-black leading-tight tracking-tight sm:text-3xl'>{featuredBook.title}</h3>
              <div className='mt-4 flex items-center gap-2 text-xs font-semibold text-white/75'>
                <span className='rounded-lg bg-white/10 px-2 py-1'>Діапазон: {getRatingRange(featuredBook)}</span>
              </div>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <span className={`rounded-full px-2.5 py-1 text-2xl tabular-nums font-black uppercase tracking-[0.14em] bg-white dark:bg-black/90 controversy-${getControversyLevel(featuredBook.controversy)}`}>{featuredBook.controversy.toFixed(2)}</span>
            </div>
          </div>
        </Link>

        <div className='relative rounded-[1.6rem] z-10 border border-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/5 grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3'>
          {otherBooks.map((book, index) => (
            <Link key={book.id} href={`/books/${book.slug}`} className='group flex items-center gap-3 px-3 rounded-3xl ring-1 ring-slate-900/5 shadow-[0_18px_35px_-24px_rgba(15,23,42,0.2)] transition hover:bg-white/80 dark:hover:bg-white/5 sm:gap-4 py-3'>
              <span className='w-2 text-center text-xs font-black tabular-nums text-slate-500 dark:text-slate-400'>{index + 2}</span>
              <Image src={book.cover} alt={book.title} width={64} height={96} className='h-15 w-10 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-slate-900/8 dark:ring-white/10' />
              <div className='min-w-0 flex-1'>
                <p className='text-sm line-clamp-3 leading-none font-bold text-slate-800 transition-colors group-hover:text-rose-700 dark:text-slate-100 dark:group-hover:text-rose-300'>{book.title}</p>
                <p className='mt-1 truncate text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400'>{book.author}</p>
              </div>
              <div className='text-right'>
                <p className={`text-lg font-black tabular-nums controversy-${getControversyLevel(book.controversy)}`}>{book.controversy.toFixed(2)}</p>
                <p className='text-[10px] font-semibold text-slate-500 dark:text-slate-400'>{getRatingRange(book)}</p>
              </div>
            </Link>
          ))}
        </div>
        {visibleCount < controversialBooks.length &&
          <div className='flex justify-center'>
            <PillButton onClick={() => setVisibleCount((prev) => prev + visibleIncrement)}>
              Показати ще
            </PillButton>
          </div>
        }
      </div>
    </Panel>
  )
}

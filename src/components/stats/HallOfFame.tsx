import Image from 'next/image'
import Link from 'next/link'

import type { BookWithStats } from '@/types/book'
import type { Member } from '@/types/member'

import { getMemberColor } from '@/utils/member'
import { Panel } from '@/components/ui/Panel'
import { StarIcon } from '@/components/ui/StarIcon'

interface Props {
  books: BookWithStats[]
  members: Member[]
}

interface Medal {
  label: string
  pedestal: string
  cover: string
  ring: string
  badge: string
  block: string
  score: string
}

const MEDALS: Record<number, Medal> = {
  1: {
    label: 'Золото',
    pedestal: 'h-20',
    cover: 'w-28 sm:w-36',
    ring: 'ring-2 ring-amber-300 dark:ring-amber-400/70',
    badge: 'bg-amber-300 text-amber-950',
    block: 'from-amber-200/90 to-amber-100/60 dark:from-amber-400/25 dark:to-amber-400/5',
    score: 'text-amber-600 dark:text-amber-300'
  },
  2: {
    label: 'Срібло',
    pedestal: 'h-12',
    cover: 'w-24 sm:w-28',
    ring: 'ring-2 ring-slate-300 dark:ring-slate-400/60',
    badge: 'bg-slate-300 text-slate-900',
    block: 'from-slate-200/90 to-slate-100/60 dark:from-white/15 dark:to-white/5',
    score: 'text-slate-600 dark:text-slate-300'
  },
  3: {
    label: 'Бронза',
    pedestal: 'h-8',
    cover: 'w-24 sm:w-28',
    ring: 'ring-2 ring-orange-300 dark:ring-orange-400/60',
    badge: 'bg-orange-300 text-orange-950',
    block: 'from-orange-200/80 to-orange-100/50 dark:from-orange-400/20 dark:to-orange-400/5',
    score: 'text-orange-700 dark:text-orange-300'
  }
}

const ScoreDots = ({ book, members }: { book: BookWithStats; members: Member[] }) => (
  <div className='mt-2.5 flex flex-wrap items-center justify-center gap-1'>
    {(book.ratings ?? []).map((rating) => {
      const member = members.find((item) => item.id === rating.memberId)

      return (
        <span
          key={rating.memberId}
          title={`${member?.name ?? 'Учасник'}: ${rating.label || rating.value}`}
          className='inline-flex items-center gap-1 rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-slate-600 ring-1 ring-slate-900/5 dark:bg-white/10 dark:text-slate-300 dark:ring-white/10'>
          <span
            aria-hidden='true'
            className='h-1.5 w-1.5 rounded-full'
            style={{ backgroundColor: getMemberColor(rating.memberId, members) }}
          />
          {rating.value}
        </span>
      )
    })}
  </div>
)

export const HallOfFame = ({ books, members }: Props) => {
  const ranked = [...books].sort((a, b) => b.average - a.average)

  if (ranked.length < 4) return null

  const podium = ranked.slice(0, 3)
  const worst = ranked[ranked.length - 1]

  const desktopOrder = ['sm:order-1', 'sm:order-2', 'sm:order-3']
  const podiumLayout = [podium[1], podium[0], podium[2]]

  return (
    <Panel className='mx-auto mt-10 max-w-4xl'>
      <div className='flex items-end justify-center gap-3 max-sm:flex-col max-sm:items-stretch sm:gap-4'>
        {podiumLayout.map((book, index) => {
          const rank = ranked.indexOf(book) + 1
          const medal = MEDALS[rank]

          return (
            <div
              key={book.id}
              className={`flex flex-1 flex-col items-center ${desktopOrder[index]} ${
                rank === 1 ? 'order-1' : rank === 2 ? 'order-2' : 'order-3'
              }`}>
              <span
                className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] shadow-sm ${medal.badge}`}>
                {medal.label}
              </span>

              <Link href={`/books/${book.slug}`} className='group flex flex-col items-center'>
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={260}
                  height={390}
                  className={`${medal.cover} aspect-2/3 rounded-xl object-cover shadow-[0_18px_30px_-18px_rgba(15,23,42,0.75)] transition duration-300 group-hover:-translate-y-1 ${medal.ring}`}
                />
                <p className='mt-3 line-clamp-2 text-center text-sm font-black leading-5 text-slate-800 transition-colors group-hover:text-violet-700 dark:text-slate-100 dark:group-hover:text-violet-300'>
                  {book.title}
                </p>
              </Link>

              <p className='mt-0.5 line-clamp-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400'>
                {book.author}
              </p>

              <p className={`mt-2 flex items-center gap-1.5 text-2xl font-black tabular-nums ${medal.score}`}>
                <StarIcon className='h-4 w-4' />
                {book.average.toFixed(2)}
              </p>

              <ScoreDots book={book} members={members} />

              <div
                className={`mt-3 flex w-full items-start justify-center rounded-t-xl bg-linear-to-b pt-2 text-lg font-black tabular-nums text-slate-500/80 max-sm:hidden dark:text-white/40 ${medal.pedestal} ${medal.block}`}>
                {rank}
              </div>
            </div>
          )
        })}
      </div>

      <div className='mt-8 border-t border-dashed border-slate-300 pt-6 dark:border-white/15'>
        <Link
          href={`/books/${worst.slug}`}
          className='group flex items-center gap-4 rounded-2xl border border-rose-200/70 bg-rose-50/60 p-3 transition duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md dark:border-rose-400/20 dark:bg-rose-400/5'>
          <Image
            src={worst.cover}
            alt={worst.title}
            width={120}
            height={180}
            className='h-20 w-14 shrink-0 rounded-lg object-cover opacity-80 shadow-sm ring-1 ring-slate-900/10 transition duration-300 group-hover:opacity-100 dark:ring-white/10'
          />
          <div className='min-w-0 flex-1'>
            <p className='text-[10px] font-bold uppercase tracking-[0.14em] text-rose-600 dark:text-rose-300'>
              Найгірша книга
            </p>
            <p className='mt-1 truncate text-sm font-black text-slate-800 dark:text-slate-100'>{worst.title}</p>
            <p className='truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400'>
              {worst.author}
            </p>
            <ScoreDots book={worst} members={members} />
          </div>
          <p className='shrink-0 text-2xl font-black tabular-nums text-rose-600 dark:text-rose-300'>
            {worst.average.toFixed(2)}
          </p>
        </Link>
      </div>
    </Panel>
  )
}

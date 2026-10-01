import Link from 'next/link'

import type { BookWithStats } from '@/types/book'
import { getEraSegments, getYearAxis, toYearPercent } from '@/utils/eras'
import { Panel } from '@/components/ui/Panel'

/** Dots closer than this (in % of the track) would overlap, so they stack upwards instead. */
const CLUSTER_THRESHOLD = 2.5
const CLUSTER_OFFSET = 15

/** A band narrower than this cannot hold its name, so it shows only the count. */
const LABEL_MIN_WIDTH = 7

interface Props {
  books: BookWithStats[]
}

interface DotPoint {
  book: BookWithStats
  position: number
}

function clusterByPosition(points: DotPoint[]): DotPoint[][] {
  const clusters: DotPoint[][] = []

  for (const point of points) {
    const currentCluster = clusters.at(-1)

    if (currentCluster && point.position - currentCluster[0].position <= CLUSTER_THRESHOLD) {
      currentCluster.push(point)
    } else {
      clusters.push([point])
    }
  }

  return clusters
}

export const BookTimeline = ({ books }: Props) => {
  const axis = getYearAxis(books)

  if (!axis) return null

  const segments = getEraSegments(books, axis)

  const clusters = clusterByPosition(
    books
      .map((book) => ({ book, position: toYearPercent(book.year, axis) }))
      .sort((a, b) => a.position - b.position)
  )

  const tallestCluster = Math.max(...clusters.map((cluster) => cluster.length))
  const trackHeight = 38 + (tallestCluster - 1) * CLUSTER_OFFSET

  return (
    <Panel className='@container mx-auto mt-10 max-w-5xl'>
      <p className='text-xs font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300'>
        Роки видання
      </p>
      <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400'>
        Розподіл прочитаних книг за усталеними епохами. Кожна крапка - книга.
      </p>

      <div className='relative mt-8'>
        <div className='relative mb-2 hidden h-5 @2xl:block'>
          {segments.map(({ era, count, start, width }) => (
            <span
              key={era.id}
              className='absolute flex items-center justify-center gap-1.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400'
              style={{ left: `${start}%`, width: `${width}%` }}>
              {width >= LABEL_MIN_WIDTH && <span>{era.label}</span>}
              <span className='rounded-full bg-violet-100 px-1.5 py-0.5 tabular-nums text-violet-700 dark:bg-violet-400/15 dark:text-violet-300'>
                {count}
              </span>
            </span>
          ))}
        </div>

        <div
          className='relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 dark:border-white/10 dark:bg-white/5'
          style={{ height: `${trackHeight}px` }}>
          {segments.map(({ era, start, width }, index) => (
            <span
              key={era.id}
              aria-hidden='true'
              className={`absolute inset-y-0 ${
                index % 2 === 0 ? 'bg-violet-100/70 dark:bg-violet-400/10' : 'bg-transparent'
              }`}
              style={{ left: `${start}%`, width: `${width}%` }}
            />
          ))}

          {axis.ticks.map((tick) => (
            <span
              key={tick}
              aria-hidden='true'
              className='absolute inset-y-0 w-px bg-slate-200/70 dark:bg-white/5'
              style={{ left: `${toYearPercent(tick, axis)}%` }}
            />
          ))}

          {segments.slice(1).map(({ era, start }) => (
            <span
              key={`divider-${era.id}`}
              aria-hidden='true'
              className='absolute inset-y-0 w-px bg-violet-300 dark:bg-violet-400/40'
              style={{ left: `${start}%` }}
            />
          ))}

          {clusters.flatMap((cluster) =>
            cluster.map(({ book, position }, indexInCluster) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                title={`${book.title} — ${book.year}`}
                className='absolute bottom-2.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-violet-500 shadow-sm transition duration-200 hover:scale-125 hover:bg-violet-700 dark:border-neutral-950 dark:bg-violet-400'
                style={{
                  left: `${position}%`,
                  transform: `translate(-50%, ${-indexInCluster * CLUSTER_OFFSET}px)`
                }}>
                <span className='sr-only'>
                  {book.title}, {book.year}
                </span>
              </Link>
            ))
          )}
        </div>

        <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1.5 @2xl:hidden'>
          {segments.map(({ era, count }) => (
            <span
              key={era.id}
              className='flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400'>
              {era.label}
              <span className='rounded-full bg-violet-100 px-1.5 py-0.5 tabular-nums text-violet-700 dark:bg-violet-400/15 dark:text-violet-300'>
                {count}
              </span>
            </span>
          ))}
        </div>

        <div className='relative mt-2 h-4 text-[10px] font-semibold tabular-nums text-slate-400 dark:text-slate-500'>
          {axis.ticks.map((tick) => {
            const position = toYearPercent(tick, axis)

            return (
              <span
                key={tick}
                className='absolute top-0'
                style={{ left: `${position}%`, transform: `translateX(-${position}%)` }}>
                {tick}
              </span>
            )
          })}
        </div>
      </div>
    </Panel>
  )
}

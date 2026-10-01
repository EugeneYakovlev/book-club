import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Section } from '@/components/layouts/Section'
import { Panel } from '@/components/ui/Panel'
import { StarIcon } from '@/components/ui/StarIcon'
import { StatBadge } from '@/components/ui/StatBadge'
import { toneStyles } from '@/styles/tones'
import { getBookBySlug, getBookSlugs, getBookSuperlatives, getMembers } from '@/data/selectors'

import { getAverageBookRating, getControversyBookRating, getControversyLevel } from '@/utils/books'
import { DiscussionDateRow } from '@/components/books/book/DiscussionDateRow'
import { MemberRating } from '@/components/books/book/MemberRating'
import { BookCoverWithRating } from '@/components/books/book/BookCoverWithRating'


type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getBookSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)

  if (!book) return {}

  const title = `${book.title} — ${book.author}`
  const description =
    book.description ?? `${book.title} (${book.year}) — обговорення у книжковому клубі «Чотири вальта».`

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: book.cover, width: 300, height: 450, alt: book.title }] }
  }
}

const BookPage = async ({ params }: Params) => {
  const { slug } = await params

  const book = getBookBySlug(slug)

  if (!book) {
    notFound()
  }

  const membersMap = new Map(getMembers().map((member) => [member.id, member]))
  const ratings = book.ratings ?? []
  const averageRating = getAverageBookRating(ratings)

  const controversyRating = getControversyBookRating(ratings)

  const records = ratings.length > 0 ? getBookSuperlatives() : null

  const hasAverageSpread = records !== null && records.highestAverage > records.lowestAverage
  const isBestRated = hasAverageSpread && averageRating === records.highestAverage
  const isWorstRated = hasAverageSpread && averageRating === records.lowestAverage

  const hasControversySpread =
    records !== null && controversyRating !== null && records.highestControversy > records.lowestControversy
  const isMostControversial = hasControversySpread && controversyRating === records.highestControversy
  const isMostUnanimous = hasControversySpread && controversyRating === records.lowestControversy

  const controversyBadgeTone =
    controversyRating !== null ? `controversy-badge-${getControversyLevel(controversyRating)}` : ''

  return (
    <>
      <Section eyebrow={`книга №${book.id}`} title={book.title}>
        <p className='mt-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300'>
          {book.author} · {book.year}
        </p>
        <Panel padding='roomy' className='mx-auto mt-10 max-w-5xl'>
          <div className='relative grid grid-cols-1 items-center gap-9 lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1fr)] lg:gap-12'>
            <BookCoverWithRating title={book.title} cover={book.cover} averageRating={averageRating} />
            <div>
              <DiscussionDateRow date={book.discussionDate} label='Дата обговорення' compact />
              <div className='mt-7 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Оцінки клубу</p>
                </div>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-200'>
                  <StarIcon className='h-5 w-5 text-amber-400' />
                  <span className='text-3xl font-black tracking-tight'>{averageRating.toFixed(2)}</span>
                </div>
              </div>
              {(isBestRated || isWorstRated) && (
                <div className='mt-3 flex flex-wrap gap-2'>
                  {isBestRated && (
                    <StatBadge
                      href='/books'
                      label='Найкраща книжка клубу'
                      tooltip={`Найвища середня оцінка серед усіх прочитаних книг: ${records.highestAverage.toFixed(2)}`}
                      toneClassName={toneStyles.emerald.badge}
                    />
                  )}
                  {isWorstRated && (
                    <StatBadge
                      href='/books'
                      label='Найгірша книжка клубу'
                      tooltip={`Найнижча середня оцінка серед усіх прочитаних книг: ${records.lowestAverage.toFixed(2)}`}
                      toneClassName={toneStyles.rose.badge}
                    />
                  )}
                </div>
              )}
              <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                { ratings.map((rating) => {
                  const currentMember = membersMap.get(rating.memberId)
                  return (
                    <MemberRating key={rating.memberId} rating={rating} currentMember={currentMember} />
                  )
                }) }
              </div>
              <Link href='/stats/#controversy-table' className='mt-7 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Рейтинг суперечливості</p>
                </div>
                <div className={`flex items-center gap-2 dark:text-slate-200 controversy-${getControversyLevel(controversyRating || 0)}`}>
                  <span className='text-2xl font-black tracking-tight'>{controversyRating?.toFixed(2)}</span>
                </div>
              </Link>
              {(isMostControversial || isMostUnanimous) && (
                <div className='mt-3 flex flex-wrap gap-2'>
                  {isMostControversial && (
                    <StatBadge
                      href='/stats/#controversy-table'
                      label='Найсуперечливіша книжка'
                      tooltip={`Найбільший розкид оцінок — думки учасників розійшлися найсильніше: ${records.highestControversy.toFixed(2)}`}
                      toneClassName={controversyBadgeTone}
                    />
                  )}
                  {isMostUnanimous && (
                    <StatBadge
                      href='/stats/#controversy-table'
                      label='Унісон клубу'
                      tooltip={`Найменший розкид оцінок — думки учасників зійшлися найсильніше: ${records.lowestControversy.toFixed(2)}`}
                      toneClassName={controversyBadgeTone}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Panel>
      </Section>
    </>
  )
}

export default BookPage

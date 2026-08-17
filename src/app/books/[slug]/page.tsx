import Link from 'next/link'
import { Section } from '@/components/layouts/Section'
import { homeData } from '@/data/home'

import { getAverageBookRating, getControversyBookRating, getControversyLevel } from '@/utils/books'
import { DiscussionDateRow } from '@/components/books/book/DiscussionDateRow'
import { MemberRating } from '@/components/books/book/MemberRating'
import { BookCoverWithRating } from '@/components/books/book/BookCoverWithRating'


const BookPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const book = homeData.books.find((book) => book.slug === slug)

  if (!book) {
    return <div className='text-center mt-8'>Такої книги немає</div>
  }

  const membersMap = new Map(homeData.members.map((member) => [member.id, member]))
  const ratings = book.ratings ?? []
  const averageRating = getAverageBookRating(ratings)

  const controversyRating = getControversyBookRating(ratings)

  return (
    <>
      <Section eyebrow={`книга №${book.id}`} title={book.title}>
        <p className='mt-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300'>
          {book.author} · {book.year}
        </p>
        <div className='relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br from-violet-100 via-white to-amber-50 p-5 shadow-[0_30px_70px_-48px_rgba(49,46,129,0.6)] dark:border-white/10 dark:from-violet-950/35 dark:via-neutral-950 dark:to-amber-950/20 sm:p-8 lg:p-10'>
          <div className='relative grid grid-cols-1 items-center gap-9 lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1fr)] lg:gap-12'>
            <BookCoverWithRating title={book.title} cover={book.cover} averageRating={averageRating} />
            <div>
              <DiscussionDateRow date={book.discussionDate} label='Дата обговорення' />
              <div className='mt-7 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>Оцінки клубу</p>
                </div>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-200'>
                  <svg viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5 text-amber-400'>
                    <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
                  </svg>
                  <span className='text-3xl font-black tracking-tight'>{averageRating.toFixed(2)}</span>
                </div>
              </div>
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
                  <p className='text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>Рейтинг суперечливості</p>
                </div>
                <div className={`flex items-center gap-2 dark:text-slate-200 controversy-${getControversyLevel(controversyRating || 0)}`}>
                  <span className='text-3xl font-black tracking-tight'>{controversyRating?.toFixed(2)}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default BookPage

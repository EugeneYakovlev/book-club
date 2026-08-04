import Image from 'next/image'

import { Section } from '@/components/layouts/Section'
import { homeData } from '@/data/home'

import { getAverageBookRating } from '@/utils/books'


const BookPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const book = homeData.readBooks.books.find((book) => book.slug === slug)

  if (!book) {
    return <>Такої книги немає</>
  }

  const membersMap = new Map(homeData.members.map((member) => [member.id, member]))

  return (
    <>
      <Section eyebrow={`книга №${book.id}`} title={book.title}>
        <p className='mt-1 truncate text-sm text-center font-medium text-neutral-500 dark:text-neutral-400'>
          {book.author} · {book.year}
        </p>
        <div className='mx-auto mt-12 max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-2'>
          <div>
            <div className='relative mx-auto max-w-60 lg:max-w-[320px] overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10'>
              {book.cover && (
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={300}
                  height={450}
                  loading='eager'
                  className='aspect-2/3 w-full object-cover'
                />
              )}
            </div>
          </div>
          <div className='flex flex-col justify-between gap-4 max-md:col-span-1 max-lg:col-span-2'>
            <div className='pt-4 mb-3 text-[18px] text-center text-neutral-700 dark:text-neutral-500'>
              Дата обговорення книги: {' '}
              <span className='underline'>{new Date(book.discussionDate).toLocaleDateString('en-GB')}</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              { book.ratings.map((rating) => {
                const currentMember = membersMap.get(rating.memberId)
                return (
                  <div key={rating.memberId} className='flex items-center gap-2 text-[18px] text-neutral-700 dark:text-neutral-500'>
                    <div className='rounded-full shrink-0 aspect-square w-20 h-20 overflow-hidden'>
                      <Image className='w-full h-full object-cover object-top' src={currentMember?.pic || ''} width={100} height={100} loading='lazy' alt={currentMember?.name || 'Учасник'} />
                    </div>
                    <div className='flex items-center flex-wrap gap-2'>
                      <div className='font-medium text-[16px] font-roboto text-neutral-700 dark:text-neutral-300'>
                        {currentMember?.name || rating.memberId}: {' '}
                      </div>
                      <div className='flex items-center flex-nowrap gap-1'>
                        <svg
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-4.5 w-4.5 text-amber-400'>
                          <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
                        </svg>
                        <span className='font-semibold text-neutral-700 dark:text-neutral-300'>
                          {rating.rating.label ? rating.rating.label : rating.rating.value}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }) }
            </div>
            <div className='mt-2 bg-amber-100 rounded-full p-4 px-8 flex items-center justify-center gap-2 text-[20px] text-neutral-700 dark:text-neutral-500'>
              Середня оцінка: {' '}
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-6 w-6 text-amber-400'>
                <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
              </svg>
              <span className='relative font-semibold text-neutral-700 dark:text-neutral-300'>
                {getAverageBookRating(book.ratings ?? []).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default BookPage

import Image from 'next/image'
import Link from 'next/link'

import { Section } from '@/components/layouts/Section'
import { homeData } from '@/data/home'
import { getMemberAverageRating, getMemberBooksCount, getMemberHighestRating, getMemberLowestRating, getMemberRatings } from '@/utils/member'

import { RatingStatRow } from '@/components/members/RatingStatRow'


const MemberPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const member = homeData.members.find((member) => member.slug === slug)

  if (!member) {
    return <>Такого учасника немає</>
  }

  const memberRatings = getMemberRatings(member.id, homeData.readBooks.books);

  const averageRating = getMemberAverageRating(memberRatings);
  const highestRating = getMemberHighestRating(memberRatings);
  const lowestRating = getMemberLowestRating(memberRatings);
  const booksCount = getMemberBooksCount(memberRatings);

  return (
    <Section eyebrow={member.role} title={member.name}>
      <div className='flex flex-col items-center gap-4 mt-8'>
        <Image
          src={member.pic}
          alt={member.name}
          width={500}
          height={500}
          className='aspect-3/4 object-top w-full max-w-md object-cover overflow-hidden rounded-xl'
        />
      </div>
      <div className="mt-12">
        <div className='max-w-md mx-auto'>
          <div className='px-4'>
            Прочитано книг: { booksCount }
          </div>
          <RatingStatRow label="Найвища оцінка" rating={highestRating} /> 
          <RatingStatRow label="Найнижча оцінка" rating={lowestRating} /> 
        </div>
        <div className='max-w-md mx-auto mt-8 bg-amber-100 rounded-full p-4 px-6 flex items-center justify-between gap-2 text-[16px] text-neutral-700 dark:text-neutral-500'>
          Середня оцінка: {' '}
          <span className="flex items-center gap-2">
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-6 w-6 text-amber-400'>
              <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
            </svg>
            <span className='font-semibold text-[24px]'>
              {averageRating ? averageRating.toFixed(2) : "немає оцінок"}
            </span>
          </span>
        </div>
        <div className='mt-12'>
          <div className='font-medium font-roboto text-center text-[32px] text-neutral-700 dark:text-neutral-300'>
            Всі оцінки:
          </div>
          <div className='divide-x border border-gray-200 divide-gray-200 flex gap-2 mt-2 rounded-2xl overflow-hidden'>
            {homeData.readBooks.books.toReversed().map((book) => {
              const rating = book.ratings.find((r) => r.memberId === member.id)
              if (!rating) return null
              return (
                <Link key={book.id} href={`/books/${book.slug}`} className='flex flex-col justify-between bg-white dark:bg-neutral-900 w-full text-center pr-2 py-2 first:pl-2'>
                  <div>
                    <div className='mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[11px] font-semibold text-amber-900 shadow-sm'>
                      {book.id}
                    </div>
                    <div className='aspect-2/3 w-full object-cover rounded-lg overflow-hidden'>
                      <Image
                        src={book.cover}
                        alt={book.title}
                        width={300}
                        height={450}
                        loading='lazy'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='py-3 font-roboto text-sm leading-snug font-bold text-neutral-900 dark:text-neutral-50'>{book.title}</div>
                  </div>
                  <div className='py-3 flex justify-center items-center'>
                    <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='h-7 w-7 text-amber-400'>
                      <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
                    </svg>
                    <span className='text-[18px] pl-2 font-roboto font-medium'>{rating.label ? rating.label : rating.value}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default MemberPage
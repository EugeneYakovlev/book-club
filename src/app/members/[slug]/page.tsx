import Image from 'next/image'

import { Section } from '@/components/layouts/Section'
import { homeData } from '@/data/home'
import { getMemberAverageRating, getMemberBooksCount, getMemberHighestRating, getMemberLowestRating, getMemberRatings } from '@/utils/member'
import { AverageRatingRow } from '@/components/members/member/AverageRatingRow'
import { RatingHighlight } from '@/components/members/member/RatingHighlight'
import { RatedBooks } from '@/components/members/member/RatedBooks'

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
    <>
      <Section eyebrow={member.role} title={member.name}>
        <div className='relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br from-violet-100 via-white to-amber-50 p-5 shadow-[0_30px_70px_-48px_rgba(49,46,129,0.6)] dark:border-white/10 dark:from-violet-950/35 dark:via-neutral-950 dark:to-amber-950/20 sm:p-8 lg:p-10'>
          <div className='relative grid items-center gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[255px_minmax(0,1fr)] lg:gap-12'>
            <div className='relative mx-auto w-full max-w-55 lg:max-w-64'>
              <div className='absolute -inset-4 rounded-4xl bg-violet-500/15 blur-2xl dark:bg-violet-400/10' />
              <div className='relative overflow-hidden rounded-[1.65rem] bg-slate-100 shadow-[0_24px_38px_-22px_rgba(15,23,42,0.75)] ring-1 ring-slate-900/10 dark:bg-neutral-900 dark:ring-white/10'>
                <Image src={member.pic} alt={member.name} width={500} height={650} className='aspect-3/4 w-full object-cover object-top' />
              </div>
              <span className='absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/90 px-4 py-2 text-xs font-bold text-slate-600 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-300'>
                {booksCount} {booksCount === 1 ? 'прочитана книга' : 'прочитаних книг'}
              </span>
            </div>
            <div className='pt-5 md:pt-0'>
              <AverageRatingRow label='Середня оцінка' averageRating={averageRating} />
              <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                {highestRating && (
                  <RatingHighlight label='Найвища оцінка' rating={highestRating} tone='highest' />
                )}
                {lowestRating && (
                  <RatingHighlight label='Найнижча оцінка' rating={lowestRating} tone='lowest' />
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section title='Усі оцінки'>
        <RatedBooks memberRatings={memberRatings} />
      </Section>
    </>
  )
}

export default MemberPage

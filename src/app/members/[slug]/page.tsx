import Image from 'next/image'
import Link from 'next/link'

import { Section } from '@/components/layouts/Section'
import { homeData } from '@/data/home'
import { getMemberAverageRating, getMemberBooksCount, getMemberHighestRating, getMemberLowestRating, getMemberRatings, getMemberRatingCounts, getLeadersFromMembers } from '@/utils/member'
import { AverageRatingRow } from '@/components/members/member/AverageRatingRow'
import { RatingHighlight } from '@/components/members/member/RatingHighlight'
import { BooksTable } from '@/components/stats/BooksTable'

const MemberPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const books = homeData.books.filter((book) => (book.ratings?.length ?? 0) > 0)

  const member = homeData.members.find((member) => member.slug === slug)

  if (!member) {
    return <>Такого учасника немає</>
  }

  const memberRatings = getMemberRatings(member.id, books);

  const averageRating = getMemberAverageRating(memberRatings);
  const highestRating = getMemberHighestRating(memberRatings);
  const lowestRating = getMemberLowestRating(memberRatings);
  const booksCount = getMemberBooksCount(memberRatings);

  const loyalMembers = getMemberRatingCounts(books, 'highest')
  const criticMembers = getMemberRatingCounts(books, 'lowest')
  const loyalLeader = getLeadersFromMembers(loyalMembers).find((leader) => leader.memberId === member.id)
  const criticLeader = getLeadersFromMembers(criticMembers).find((leader) => leader.memberId === member.id)

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
              {(loyalLeader || criticLeader) && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {loyalLeader && (
                    <Link href='/stats#critics' className='group relative inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'>
                      Найлояльніший читач
                      <span className='flex pl-px h-4 w-4 items-center text-center justify-center rounded-full border border-current text-[9px] normal-case leading-none'>i</span>
                      <span role='tooltip' className='pointer-events-none absolute max-md:bottom-full max-md:left-0 md:left-full md:ml-4 z-20 mb-2 w-58 rounded-xl bg-slate-900 px-3 py-2 text-left text-[11px] font-medium normal-case leading-4 tracking-normal text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus:opacity-100 dark:bg-white dark:text-slate-900'>
                        Поставив найбільшу кількість найвищих оцінок: {loyalLeader.count}
                      </span>
                    </Link>
                  )}
                  {criticLeader && (
                    <Link href='/stats#critics' className='group relative inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-700 dark:bg-rose-400/10 dark:text-rose-300'>
                      Найсуворіший критик
                      <span className='flex pl-px h-4 w-4 items-center justify-center rounded-full border border-current text-[9px] normal-case leading-none'>i</span>
                      <span role='tooltip' className='pointer-events-none absolute max-md:bottom-full max-md:left-0 md:left-full md:ml-4 z-20 mb-2 w-58 rounded-xl bg-slate-900 px-3 py-2 text-left text-[11px] font-medium normal-case leading-4 tracking-normal text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus:opacity-100 dark:bg-white dark:text-slate-900'>
                        Поставив найбільшу кількість найнижчих оцінок: {criticLeader.count}
                      </span>
                    </Link>
                  )}
                </div>
              )}
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
        <BooksTable members={[member]} books={books} hideControls />
      </Section>
    </>
  )
}

export default MemberPage

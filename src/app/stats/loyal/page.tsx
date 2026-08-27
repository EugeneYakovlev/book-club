import { Section } from '@/components/layouts/Section'
import { CriticsChart } from '@/components/stats/CriticsChart'
import { MemberLeaderSummary } from '@/components/stats/MemberLeaderSummary'

import { homeData } from '@/data/home'
import { getLeadersFromMembers, getMemberRatingCounts } from '@/utils/member'

const LoyalPage = () => {
  const onlyRatedBooks = homeData.books.filter((book) => (book.ratings?.length ?? 0) > 0)

  const books = onlyRatedBooks.toReversed().map((book) => ({
    ...book
  }))

  const members = homeData.members
  const results = [...getMemberRatingCounts(books, 'highest')].sort((a, b) => b.count - a.count)

  return (
    <>
      <Section eyebrow='Графік лояльних читачів'>
        <CriticsChart books={books} members={members} yLabel='К-сть найвищих оцінок' mode='highest' />
      </Section>

      <Section eyebrow='Рейтинг лояльних читачів'>
        <div className='max-w-5xl mx-auto'>
          <MemberLeaderSummary
            countLabel='найвищих оцінок'
            tone='emerald'
            members={members}
            results={results}
          />
        </div>
      </Section>
    </>
  )
}

export default LoyalPage
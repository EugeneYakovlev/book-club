import { Section } from '@/components/layouts/Section'
import { CriticsChart } from '@/components/stats/CriticsChart'
import { MemberLeaderSummary } from '@/components/stats/MemberLeaderSummary'

import { homeData } from '@/data/home'
import { getLeadersFromMembers, getMemberRatingCounts } from '@/utils/member'

const CriticPage = () => {
  const onlyRatedBooks = homeData.books.filter((book) => (book.ratings?.length ?? 0) > 0)

  const books = onlyRatedBooks.toReversed().map((book) => ({
    ...book
  }))

  const members = homeData.members
  const results = [...getMemberRatingCounts(books, 'lowest')].sort((a, b) => b.count - a.count)

  return (
    <>
      <Section eyebrow='Графік суворих критиків'>
        <CriticsChart books={books} members={members} yLabel='К-сть найнижчих оцінок' mode='lowest' />
      </Section>

      <Section eyebrow='Рейтинг критиків'>
        <div className='max-w-5xl mx-auto'>
          <MemberLeaderSummary
            countLabel='найнижчих оцінок'
            tone='rose'
            members={members}
            results={results}
          />
        </div>
      </Section>
    </>
  )
}

export default CriticPage
import { Section } from '@/components/layouts/Section'
import { CriticsChart } from '@/components/stats/CriticsChart'
import { MemberLeaderSummary } from '@/components/stats/MemberLeaderSummary'

import { getBooksWithStats, getMembers } from '@/data/selectors'
import { getMemberRatingCounts } from '@/utils/member'

const LoyalPage = () => {
  const books = getBooksWithStats()
  const members = getMembers()
  const results = getMemberRatingCounts(books, 'highest')

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

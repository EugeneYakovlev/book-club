import { Section } from '@/components/layouts/Section'
import { CriticsChart } from '@/components/stats/CriticsChart'
import { MemberLeaderSummary } from '@/components/stats/MemberLeaderSummary'

import { getBooksWithStats, getMembers } from '@/data/selectors'
import { getMemberRatingCounts } from '@/utils/member'

const CriticPage = () => {
  const books = getBooksWithStats()
  const members = getMembers()
  const results = getMemberRatingCounts(books, 'lowest')

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

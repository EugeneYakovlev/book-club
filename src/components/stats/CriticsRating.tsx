import type { Book } from '@/types/book'
import type { Member } from '@/types/member'

import { getMemberRatingCounts, getLeadersFromMembers } from '@/utils/member'
import { CriticCard } from './CriticCard'

interface Props {
  books: Book[],
  members: Member[]
}

export const CriticsRating = ({ books, members }: Props) => {
  const loyalMembers = getMemberRatingCounts(books, 'highest')
  const criticMembers = getMemberRatingCounts(books, 'lowest')

  const categories = [
    {
      leaders:  getLeadersFromMembers(loyalMembers),
      title: 'Найщедріший читач',
      description: 'Найчастіше ставив найвищу оцінку',
      countLabel: 'найвищих оцінок',
      tone: 'emerald'
    },
    {
      leaders: getLeadersFromMembers(criticMembers),
      title: 'Найсуворіший критик',
      description: 'Найчастіше ставив найнижчу оцінку',
      countLabel: 'найнижчих оцінок',
      tone: 'rose'
    },
  ]

  const membersById = new Map(
    members.map((member) => [member.id, member])
  )

  return (
    <div className='mx-auto mt-8 grid gap-3'>
      { categories.map(category => {
        const leaderMembers = category.leaders
          .map(({ memberId }) => membersById.get(memberId))
          .filter((member): member is Member => Boolean(member))

        if (leaderMembers.length === 0) return null

        return (
          <CriticCard key={category.tone} content={category} members={leaderMembers} />
        )
      }) }
    </div>
  )
}

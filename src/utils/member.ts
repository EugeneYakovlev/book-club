import type { Book } from '@/types/book'
import type { Member, MemberBookRating } from '@/types/member'

export const MEMBER_COLOR_PALETTE = ['#8b5cf6', '#f97316', '#10b981', '#facc15', '#60a5fa', '#f43f5e']

export function getMemberColor(memberId: number, members: Member[]) {
  const memberIndex = members.findIndex((member) => member.id === memberId)

  if (memberIndex === -1) {
    return MEMBER_COLOR_PALETTE[memberId % MEMBER_COLOR_PALETTE.length]
  }

  return MEMBER_COLOR_PALETTE[memberIndex % MEMBER_COLOR_PALETTE.length]
}

export function getMemberRatings(
  memberId: number,
  books: Book[]
): MemberBookRating[] {
  return books.flatMap((book) =>
    (book.ratings ?? [])
      .filter((rating) => rating.memberId === memberId)
      .map((rating) => ({
        book,
        rating
      }))
  )
}

export function getMemberAverageRating(memberRatings: MemberBookRating[]) {
  if (memberRatings.length === 0) {
    return null
  }

  const sum = memberRatings.reduce((sum, { rating }) => sum + rating.value, 0)

  return sum / memberRatings.length
}

export function getMemberBooksCount(memberRatings: MemberBookRating[]) {
  return memberRatings.length
}

export function getMemberHighestRating(memberRatings: MemberBookRating[]) {
  if (memberRatings.length === 0) {
    return null
  }

  return memberRatings.reduce((highest, current) =>
    current.rating.value > highest.rating.value ? current : highest
  )
}

export function getMemberLowestRating(memberRatings: MemberBookRating[]) {
  if (memberRatings.length === 0) {
    return null
  }

  return memberRatings.reduce((lowest, current) =>
    current.rating.value < lowest.rating.value ? current : lowest
  )
}

export function getMemberRatingCounts(books: Book[], position: 'highest' | 'lowest') {
  const countsByMemberId = new Map<number, number>()

  for (const book of books) {
    const ratings = book.ratings ?? []

    if (ratings.length === 0) continue

    const values = ratings.map((rating) => rating.value)

    const targetValue =
      position === 'highest' ? Math.max(...values) : Math.min(...values)

    const membersWithTargetRating = ratings.filter(
      (rating) => rating.value === targetValue
    )

    for (const rating of membersWithTargetRating) {
      const count = countsByMemberId.get(rating.memberId) ?? 0

      countsByMemberId.set(rating.memberId, count + 1)
    }
  }

  return [...countsByMemberId.entries()]
    .map(([memberId, count]) => ({ memberId, count }))
    .sort((a, b) => b.count - a.count)
}

export function getLeadersFromMembers(ranking: { memberId: number; count: number }[]) {
  const highestCount = ranking[0]?.count ?? 0

  return ranking.filter((item) => item.count === highestCount)
}

export function getCumulativeTopRatingsByMember(
  books: Book[],
  members: Member[],
  mode: 'highest' | 'lowest' = 'highest'
) {
  const orderedBooks = [...books].sort((a, b) =>
    new Date(a.discussionDate).getTime() - new Date(b.discussionDate).getTime()
  )

  const memberCounts = new Map<number, number>(
    members.map((member) => [member.id, 0])
  )

  const dataByMember = new Map<number, number[]>(
    members.map((member) => [member.id, []])
  )

  for (const book of orderedBooks) {
    const ratings = book.ratings ?? []

    if (ratings.length === 0) {
      for (const member of members) {
        const series = dataByMember.get(member.id) ?? []
        const nextValue = memberCounts.get(member.id) ?? 0
        series.push(nextValue)
        dataByMember.set(member.id, series)
        memberCounts.set(member.id, nextValue)
      }

      continue
    }

    const targetValue =
      mode === 'highest'
        ? Math.max(...ratings.map((rating) => rating.value))
        : Math.min(...ratings.map((rating) => rating.value))

    const currentCounts = new Map(memberCounts)

    const winners = ratings.filter((rating) => rating.value === targetValue)

    for (const winner of winners) {
      const current = currentCounts.get(winner.memberId) ?? 0
      currentCounts.set(winner.memberId, current + 1)
    }

    for (const member of members) {
      const series = dataByMember.get(member.id) ?? []
      const nextValue = currentCounts.get(member.id) ?? 0
      series.push(nextValue)
      dataByMember.set(member.id, series)
      memberCounts.set(member.id, nextValue)
    }
  }

  return {
    labels: orderedBooks.map((book) => book.title),
    datasets: members.map((member) => {
      const color = getMemberColor(member.id, members)

      return {
        label: member.name,
        data: dataByMember.get(member.id) ?? [],
        borderColor: color,
        backgroundColor: 'transparent',
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.3,
        fill: false
      }
    })
  }
}

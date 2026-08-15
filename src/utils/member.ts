import type { Book } from '@/types/book'
import type { MemberBookRating } from '@/types/member'

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
import { Book } from '@/types/book'
import { MemberBookRating } from '@/types/member'

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

import { Rating } from "./rating"
import { Book } from "./book"

export interface Member {
  id: number,
  slug: string,
  name: string,
  pic: string
}

export interface MemberBookRating {
  book: Book
  rating: Rating
}
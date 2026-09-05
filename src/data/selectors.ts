import type { Book, BookWithStats } from '@/types/book'
import type { Member } from '@/types/member'

import { homeData } from './home'
import { getAverageBookRating, getControversyBookRating } from '@/utils/books'

function getRatedBooks(): Book[] {
  return homeData.books.filter((book) => (book.ratings?.length ?? 0) > 0)
}

export function getMembers(): Member[] {
  return homeData.members
}

export function getCurrentBook(): Book | undefined {
  return homeData.books.find((book) => book.currentlyReading)
}

export function getBooksWithStats(): BookWithStats[] {
  return getRatedBooks()
    .toReversed()
    .map((book) => ({
      ...book,
      average: getAverageBookRating(book.ratings ?? []),
      controversy: getControversyBookRating(book.ratings ?? [])
    }))
}

export function getBookSlugs(): string[] {
  return homeData.books.map((book) => book.slug)
}

export function getMemberSlugs(): string[] {
  return homeData.members.map((member) => member.slug)
}

export function getBookBySlug(slug: string): Book | undefined {
  return homeData.books.find((book) => book.slug === slug)
}

export function getMemberBySlug(slug: string): Member | undefined {
  return homeData.members.find((member) => member.slug === slug)
}

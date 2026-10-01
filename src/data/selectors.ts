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

export interface BookSuperlatives {
  highestAverage: number
  lowestAverage: number
  highestControversy: number
  lowestControversy: number
}

export function getBookSuperlatives(): BookSuperlatives | null {
  const books = getBooksWithStats()

  const averages = books.map((book) => book.average)
  const controversies = books
    .map((book) => book.controversy)
    .filter((value): value is number => value !== null)

  if (averages.length < 2 || controversies.length < 2) return null

  return {
    highestAverage: Math.max(...averages),
    lowestAverage: Math.min(...averages),
    highestControversy: Math.max(...controversies),
    lowestControversy: Math.min(...controversies)
  }
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

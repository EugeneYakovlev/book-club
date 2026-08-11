import { homeData } from '@/data/home'

import { Section } from '@/components/layouts/Section'

import { BooksTable } from '@/components/stats/BooksTable'

import { getAverageBookRating } from '@/utils/books'

const StatsPage = () => {
  const books = homeData.readBooks.books.toReversed().map((book) => ({
    ...book,
    average: getAverageBookRating(book.ratings ?? []),
  }))

  const members = homeData.members

  return (
    <Section eyebrow='Статистика'>
      <BooksTable books={books} members={members} />
    </Section>
  )
}

export default StatsPage

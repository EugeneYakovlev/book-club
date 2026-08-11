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
      <div className='mx-auto mt-8 relative'>
        <BooksTable books={books} members={members} />
      </div>
    </Section>
  )
}

export default StatsPage

import { homeData } from '@/data/home'

import { Section } from '@/components/layouts/Section'

import { BooksTable } from '@/components/stats/BooksTable'
import { ControversialBook } from '@/components/stats/ControversialBook'

import { getAverageBookRating, getControversyBookRating } from '@/utils/books'

const StatsPage = () => {
  const books = homeData.readBooks.books.toReversed().map((book) => ({
    ...book,
    average: getAverageBookRating(book.ratings ?? []),
    controversy: getControversyBookRating(book.ratings ?? [])
  }))

  const members = homeData.members

  return (
    <>
      <Section eyebrow='Статистика'>
        <BooksTable books={books} members={members} />
      </Section>
      <div className='grid grid-cols-2 gap-8'>
        <Section eyebrow='Яблуко розбрату'>
          <ControversialBook books={books} />
        </Section>
      </div>
    </>
  )
}

export default StatsPage

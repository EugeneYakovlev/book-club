import { homeData } from '@/data/home'

import { Section } from '@/components/layouts/Section'

import { BooksTable } from '@/components/stats/BooksTable'
import { ControversialBook } from '@/components/stats/ControversialBook'
import { CriticsRating } from '@/components/stats/CriticsRating'

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
      <div className='lg:grid lg:grid-cols-2 mt-8'>
        <Section eyebrow='Яблуко розбрату'>
          <ControversialBook books={books} />
        </Section>
        <div id='critics'>
          <Section eyebrow='Оцінювання'>
            <CriticsRating books={books} members={members} />
          </Section>
        </div>
      </div>
    </>
  )
}

export default StatsPage

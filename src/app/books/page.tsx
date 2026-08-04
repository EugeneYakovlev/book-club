import { Section } from "@/components/layouts/Section"
import { BookCard } from "@/components/books/BookCard"

import { homeData } from '@/data/home'
import { getAverageBookRating } from "@/utils/books"

const BooksPage = () => {
  const booksWithAverage = homeData.readBooks.books.toReversed().map((book) => ({
      ...book,
      average: getAverageBookRating(book.ratings ?? []),
    }))
  
  const highestAverage = Math.max(...booksWithAverage.map((book) => book.average))
  const lowestAverage = Math.min(...booksWithAverage.map((book) => book.average))
    
  return (
    <>
      <Section eyebrow="Архів" title="Прочитані книги">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mx-auto mt-12">
          { booksWithAverage.map((book, index) => {
            const isTopRated = book.average === highestAverage
            const isLowestRated = book.average === lowestAverage

            return (
              <BookCard book={book} isLowestRated={isLowestRated} isTopRated={isTopRated} key={index} />
            )
          })}
        </div>
      </Section>
    </>
  )
}

export default BooksPage
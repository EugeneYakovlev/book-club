import type { Book } from "@/types/book";
import { BookCard } from "./BookCard";
import { getAverageBookRating } from "@/utils/books";

interface Props {
  books: Book[]
}

export const ReadBooks = ({books}: Props) => {

  const booksWithAverage = books.map((book) => ({
    ...book,
    average: getAverageBookRating(book.ratings ?? []),
  }))

  const highestAverage = Math.max(...booksWithAverage.map((book) => book.average))
  const lowestAverage = Math.min(...booksWithAverage.map((book) => book.average))

  return (
    <div className="mx-auto w-full pb-8">
      <div className="pt-8 relative w-screen -left-4 scroll-px-6 flex snap-x snap-proximity gap-6 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none px-6">
        { booksWithAverage.map((book, index) => {
          const isTopRated = book.average === highestAverage
          const isLowestRated = book.average === lowestAverage

          return (
            <BookCard book={book} isLowestRated={isLowestRated} isTopRated={isTopRated} key={index} grayscale={true} />
          )
        })}
      </div>
    </div>
  )
}
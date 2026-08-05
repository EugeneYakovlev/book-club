import type { Book } from "@/types/book";
import { BookCard } from "./BookCard";
import { getAverageBookRating } from "@/utils/books";
import Link from "next/link";

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
    <div className="relative mx-auto mt-10 w-full overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br from-violet-50 via-white to-amber-50/70 py-7 shadow-[0_24px_60px_-42px_rgba(49,46,129,0.55)] dark:border-white/10 dark:from-violet-950/40 dark:via-neutral-950 dark:to-amber-950/20 sm:rounded-[2.5rem] sm:py-9">
      <div className="pointer-events-none absolute -left-16 top-0 h-36 w-36 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/15" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-32 w-32 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-500/10" />
      <div className="relative mb-1 flex items-center justify-between px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {books.length} {books.length === 1 ? "книга" : "книг"}
        </p>
        <Link href='/books' className="link relative items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-slate-400 flex dark:text-slate-500">
          <span>всі книги</span>
          <svg className="w-1.25 h-auto" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12.5449L5.23067 7L0 1.45512L1.39644 0L8 7L1.39644 14L0 12.5449Z" fill="#333"/>
          </svg>
          <svg className="link__graphic link__graphic--stroke link__graphic--scribble" width="100%" height="9" viewBox="0 0 101 9"><path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"></path></svg>
        </Link>
      </div>
      <div className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-px-5 scroll-smooth px-5 pb-3 pt-5 scrollbar-none sm:gap-6 sm:px-8 sm:scroll-px-8">
        { booksWithAverage.map((book) => {
          const isTopRated = book.average === highestAverage
          const isLowestRated = book.average === lowestAverage

          return (
            <BookCard book={book} isLowestRated={isLowestRated} isTopRated={isTopRated} key={book.id} grayscale={true} />
          )
        })}
      </div>
    </div>
  )
}

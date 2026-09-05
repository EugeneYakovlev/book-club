import Link from "next/link";

import type { BookWithStats } from "@/types/book";
import type { Member } from "@/types/member";
import { BookCard } from "./BookCard";
import { Panel } from "@/components/ui/Panel";

interface Props {
  books: BookWithStats[]
  members: Member[]
}

export const ReadBooks = ({ books, members }: Props) => {
  const averages = books.map((book) => book.average)
  const highestAverage = averages.length ? Math.max(...averages) : Number.NaN
  const lowestAverage = averages.length ? Math.min(...averages) : Number.NaN

  const booksLabel = new Intl.PluralRules('uk-UA').select(books.length)
  const booksWord = booksLabel === 'one' ? 'книга' : booksLabel === 'few' ? 'книги' : 'книг'

  return (
    <Panel padding='none' className="mx-auto mt-10 w-full py-7 sm:rounded-[2.5rem] sm:py-9">
      <div className="pointer-events-none absolute -left-16 top-0 h-36 w-36 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/15" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-32 w-32 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-500/10" />
      <div className="relative mb-1 flex items-center justify-between px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
          {books.length} {booksWord}
        </p>
        <Link href='/books' className="link relative items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-slate-500 flex dark:text-slate-300">
          <span>всі книги</span>
          <svg className="w-1.25 h-auto" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 12.5449L5.23067 7L0 1.45512L1.39644 0L8 7L1.39644 14L0 12.5449Z" fill="currentColor"/>
          </svg>
          <svg className="link__graphic link__graphic--stroke link__graphic--scribble" width="100%" height="9" viewBox="0 0 101 9" aria-hidden="true"><path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"></path></svg>
        </Link>
      </div>
      <div className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-px-5 scroll-smooth px-5 pb-3 pt-5 scrollbar-none sm:gap-6 sm:px-8 sm:scroll-px-8">
        { books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            members={members}
            isTopRated={book.average === highestAverage}
            isLowestRated={book.average === lowestAverage}
            grayscale
          />
        ))}
      </div>
    </Panel>
  )
}

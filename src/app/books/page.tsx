import type { Metadata } from "next"

import { Section } from "@/components/layouts/Section"
import { BookCard } from "@/components/books/BookCard"
import { Panel } from "@/components/ui/Panel"
import { StarIcon } from "@/components/ui/StarIcon"

import { getBooksWithStats, getMembers } from "@/data/selectors"

export const metadata: Metadata = {
  title: "Прочитані книги",
  description: "Каталог усіх книг, прочитаних клубом «Чотири вальта», з оцінками учасників.",
}

const BooksPage = () => {
  const books = getBooksWithStats()
  const members = getMembers()

  const highestAverage = Math.max(...books.map((book) => book.average))
  const lowestAverage = Math.min(...books.map((book) => book.average))

  const collectionAverage = books.length
    ? books.reduce((total, book) => total + book.average, 0) / books.length
    : 0

  return (
    <Section eyebrow="Архів" title="Прочитані книги">
      <Panel className="mx-auto mt-10">
        <div className="relative">
          <div className="flex flex-col gap-5 border-b border-slate-200/70 pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Бібліотека клубу</p>
              <p className="mt-2 max-w-lg text-sm leading-none text-slate-500 dark:text-slate-400">Усі прочитані книги, оцінки та історії наших обговорень — в одному каталозі.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Книг</p>
                <p className="mt-0.5 text-xl font-black tabular-nums text-slate-800 dark:text-white">{books.length}</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Середня</p>
                <p className="mt-0.5 flex items-center justify-center gap-1 text-xl font-black tabular-nums text-slate-800 dark:text-white">
                  {collectionAverage.toFixed(2)}
                  <StarIcon className="h-4.5 w-4.5 text-amber-400" />
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-black tracking-tight text-slate-800 dark:text-white">Усі книги</h2>
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">Від найпершої до найновішої</p>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          { books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              members={members}
              isTopRated={book.average === highestAverage}
              isLowestRated={book.average === lowestAverage}
            />
          ))}
        </div>
      </Panel>
    </Section>
  )
}

export default BooksPage

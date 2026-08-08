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

  const collectionAverage = booksWithAverage.length
    ? booksWithAverage.reduce((total, book) => total + book.average, 0) / booksWithAverage.length
    : 0

  return (
    <>
      <Section eyebrow="Архів" title="Прочитані книги">
        <div className="relative mx-auto mt-10 overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br from-violet-50 via-white to-amber-50 p-5 shadow-[0_30px_70px_-48px_rgba(49,46,129,0.55)] dark:border-white/10 dark:from-violet-950/35 dark:via-neutral-950 dark:to-amber-950/20 sm:p-8">
          <div className="relative">
            <div className="flex flex-col gap-5 border-b border-slate-200/70 pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Бібліотека клубу</p>
                <p className="mt-2 max-w-lg text-sm leading-none text-slate-500 dark:text-slate-400">Усі прочитані книги, оцінки та історії наших обговорень — в одному каталозі.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">Книг</p>
                  <p className="mt-0.5 text-xl font-black tabular-nums text-slate-800 dark:text-white">{booksWithAverage.length}</p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">Середня</p>
                  <p className="mt-0.5 flex items-center justify-center gap-1 text-xl font-black tabular-nums text-slate-800 dark:text-white">
                    {collectionAverage.toFixed(2)}
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5 text-amber-400"><path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" /></svg>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-800 dark:text-white">Усі книги</h2>
                <p className="mt-0.5 text-xs font-medium text-slate-400 dark:text-slate-500">Новіші — на початку</p>
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/50 px-3 py-2 text-[11px] font-semibold text-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-slate-500">
                Фільтри — незабаром
              </div>
            </div>
          </div>
          <div className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            { booksWithAverage.map((book) => {
              const isTopRated = book.average === highestAverage
              const isLowestRated = book.average === lowestAverage

              return (
                <BookCard book={book} isLowestRated={isLowestRated} isTopRated={isTopRated} key={book.id} />
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}

export default BooksPage

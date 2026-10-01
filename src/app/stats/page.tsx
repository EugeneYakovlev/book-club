import type { Metadata } from 'next'

import { Section } from '@/components/layouts/Section'

import { BooksTable } from '@/components/stats/BooksTable'
import { ControversialBook } from '@/components/stats/ControversialBook'
import { CriticsRating } from '@/components/stats/CriticsRating'
import { RatingsChart } from '@/components/stats/RatingsChart'
import { BookTimeline } from '@/components/stats/BookTimeline'

import { getBooksWithStats, getMembers } from '@/data/selectors'

export const metadata: Metadata = {
  title: 'Статистика',
  description: 'Таблиця оцінок, найсуперечливіші книги та розподіл оцінок клубу «Чотири вальта».',
}

const StatsPage = () => {
  const books = getBooksWithStats()
  const members = getMembers()

  return (
    <>
      <Section eyebrow='Статистика' title='Таблиця оцінок'>
        <p className='mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-500 dark:text-slate-400'>
          Усі оцінки клубу в одній таблиці. Наведіть на книгу, щоб підсвітити колонку,
          або увімкніть теплову мапу, щоб побачити високі й низькі оцінки кольором.
        </p>
        <BooksTable books={books} members={members} />
      </Section>
      <div className='mt-8 mb-12 lg:grid lg:grid-cols-2 lg:gap-8'>
        <Section eyebrow='Яблуко розбрату'>
          <ControversialBook books={books} members={members} />
        </Section>
        <div className='stats--right-panel'>
          <Section eyebrow='Леґенди'>
            <CriticsRating books={books} members={members} />
          </Section>
          <Section eyebrow='Оцінювання' className='mt-16'>
            <RatingsChart books={books} />
          </Section>
          <Section eyebrow='Хронологія'>
            <BookTimeline books={books} />
          </Section>
        </div>
      </div>
    </>
  )
}

export default StatsPage

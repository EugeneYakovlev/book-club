import type { Metadata } from 'next'

import { Section } from '@/components/layouts/Section'

import { BooksTable } from '@/components/stats/BooksTable'
import { ControversialBook } from '@/components/stats/ControversialBook'
import { CriticsRating } from '@/components/stats/CriticsRating'
import { RatingsChart } from '@/components/stats/RatingsChart'

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
      <Section eyebrow='Статистика'>
        <BooksTable books={books} members={members} />
      </Section>
      <div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
        <Section eyebrow='Яблуко розбрату'>
          <ControversialBook books={books} />
        </Section>
        <div>
          <Section eyebrow='Леґенди'>
            <CriticsRating books={books} members={members} />
          </Section>
          <Section eyebrow='Оцінювання' className='mt-16'>
            <RatingsChart books={books} />
          </Section>
        </div>
      </div>
    </>
  )
}

export default StatsPage

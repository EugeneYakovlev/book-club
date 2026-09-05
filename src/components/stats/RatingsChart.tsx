import type { BookWithStats } from '@/types/book'
import { DoughnutCard } from './DoughnutCard'

import { countRatings } from '@/utils/ratings'

interface Props {
  books: BookWithStats[]
}

function countTotal(values: Record<number, number>) {
  return Object.values(values).reduce((sum, value) => sum + value, 0)
}

export const RatingsChart = ({ books }: Props) => {
  const allRatings = countRatings(
    books.flatMap((book) => (book.ratings ?? []).map((rating) => rating.value))
  )
  const averageRatings = countRatings(books.map((book) => book.average))

  return (
    <div className='mt-8 space-y-6'>
      <div className='grid gap-3 md:grid-cols-2'>
        <DoughnutCard 
          title='Розподіл усіх оцінок'
          totalLabel='оцінок'
          totalValue={countTotal(allRatings)}
          data={allRatings}
          chartKind='all'
        />

        <DoughnutCard 
          title='Розподіл по книгах'
          totalLabel='Книг'
          totalValue={countTotal(averageRatings)}
          data={averageRatings}
          chartKind='all'
        />
      </div>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'

import { homeData } from '@/data/home'

import { Section } from '@/components/layouts/Section'
import { getMemberRatings } from '@/utils/member'

const StatsPage = () => {
  const books = homeData.readBooks.books.toReversed()

  return (
    <Section eyebrow='Статистика'>
      <div className='mx-auto mt-10'>
        <div className='max-h-[calc(100dvh-7rem)] w-full overflow-auto scrollbar-none overscroll-none rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(49,46,129,0.5)]'>
          <table className='w-max min-w-full border-separate border-spacing-0 text-left'>
            <thead>
              <tr>
                <th scope='col' className='sticky left-0 top-0 z-30 border-b border-r border-slate-200 bg-slate-100 p-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 sm:p-4'>
                </th>
                {books.map((book) => (
                  <th key={book.id} scope='col' className='sticky top-0 z-20 min-w-36 w-36 2xl:min-w-44 2xl:w-44 border-b border-slate-200 bg-slate-100 p-3 align-top sm:p-4'>
                    <Link href={`/books/${book.slug}`} className='group block'>
                      <div className='relative mx-auto aspect-2/3 w-24 2xl:w-28 overflow-hidden rounded-xl bg-slate-200 shadow-sm ring-1 ring-slate-900/8 '>
                        <Image src={book.cover} alt={book.title} width={100} height={150} className='h-full w-full object-cover transition duration-300 group-hover:scale-105' />
                        <span className='absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-slate-700 shadow-sm'>{book.id}</span>
                      </div>
                      <p className='mt-2 line-clamp-2 text-center text-[11px] font-bold leading-4 text-slate-700 transition-colors group-hover:text-violet-700'>{book.title}</p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {homeData.members.map((member) => {
                const ratingsByBook = new Map(getMemberRatings(member.id, homeData.readBooks.books).map(({ book, rating }) => [book.id, rating]))

                return (
                  <tr key={member.id} className='group'>
                    <th scope='row' className='sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 p-3 transition-colors group-hover:bg-violet-50 sm:p-4'>
                      <Link href={`/members/${member.slug}`} className='flex items-center gap-2.5 mx-auto w-full justify-center'>
                        <Image src={member.pic} alt={member.name} width={120} height={120} className='h-16 w-16 shrink-0 rounded-xl object-cover object-top ring-1 ring-slate-900/8 sm:h-20 sm:w-20' />
                      </Link>
                    </th>
                    {books.map((book) => {
                      const rating = ratingsByBook.get(book.id)

                      return (
                        <td key={book.id} className='h-20 border-b border-slate-200 p-3 text-center transition-colors group-hover:bg-violet-50/50 sm:p-4'>
                          {rating ? (
                            <span className='inline-flex items-center font-bold text-base tabular-nums'>
                              {rating.label || rating.value}
                            </span>
                          ) : <span className='text-sm text-slate-300'>—</span>}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

export default StatsPage
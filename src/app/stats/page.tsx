'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { homeData } from '@/data/home'

import { Section } from '@/components/layouts/Section'
import { getMemberRatings } from '@/utils/member'
import { getRatingLevel } from '@/utils/books'

const StatsPage = () => {
  const books = homeData.readBooks.books.toReversed()

  const [isHeatMapActive, setIsHeatMapActive] = useState<boolean>(false)

  const [selectedMembers, setSelectedMembers] = useState<number[]>([])

  function toggleMember(memberId: number) {
    setSelectedMembers((prev) => {
      if(prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId)
      }

      return [...prev, memberId]
    })
  }

  function selectAllMembers() {
    setSelectedMembers([])
  }

  const visibleMembers = selectedMembers.length === 0 ? homeData.members : homeData.members.filter((member) => selectedMembers.includes(member.id))

  return (
    <Section eyebrow='Статистика'>
      <div className='mx-auto mt-8 relative'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
          <div className='flex flex-wrap items-center gap-1.5'>
            <button
              type='button'
              onClick={selectAllMembers}
              aria-pressed={selectedMembers.length === 0}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                selectedMembers.length === 0
                  ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-violet-400/30 dark:hover:text-violet-200'
              }`}
            >
              Всі
            </button>
            {homeData.members.map((member) => {
              const isSelected = selectedMembers.includes(member.id)

              return (
                <button
                  key={member.id}
                  type='button'
                  onClick={() => toggleMember(member.id)}
                  aria-pressed={isSelected}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                    isSelected
                      ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-violet-400/30 dark:hover:text-violet-200'
                  }`}
                >
                  {member.name}
                </button>
              )
            })}
          </div>
          <button
            type='button'
            onClick={() => setIsHeatMapActive(prev => !prev)}
            aria-pressed={isHeatMapActive}
            className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
              isHeatMapActive
                ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-violet-400/30 dark:hover:text-violet-200'
            }`}
          >
            Теплова мапа
          </button>
        </div>
        <div className='max-h-[calc(100dvh-7rem)] w-full overflow-auto scrollbar-none overscroll-none rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(49,46,129,0.5)]'>
          <table className={`w-max min-w-full border-separate border-spacing-0 text-left ${isHeatMapActive ? 'draw-heatmap' : ''}`}>
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
              {visibleMembers.map((member) => {
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
                        <td key={book.id} className={`h-20 border-b border-slate-200 p-3 text-center transition-colors group-hover:bg-violet-50/50 sm:p-4 rating-${getRatingLevel(rating?.value || 0)}`}>
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

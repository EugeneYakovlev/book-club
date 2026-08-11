'use client'

import { useState } from 'react'

import type { Book } from '@/types/book'
import { Member } from '@/types/member'

import { BooksTableHeader } from './BookTable/BooksTableHeader'
import { BooksTableBody } from './BookTable/BooksTableBody'
import { BookTableControls } from './BookTable/BookTableControls'

interface Props {
  books: Book[]
  members: Member[]
  hideControls?: boolean
}

export const BooksTable = ({ books, members, hideControls }: Props) => {
  const [isHeatMapActive, setIsHeatMapActive] = useState<boolean>(false)
  const [isAverageRowDisplayed, setAverageRowDisplay] = useState<boolean>(false)
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])

  function toggleMember(memberId: number) {
    setSelectedMembers((prev) => {
      if (prev.includes(memberId)) {
        return prev.filter((id) => id !== memberId)
      }

      return [...prev, memberId]
    })
  }

  function selectAllMembers() {
    setSelectedMembers([])
  }

  const visibleMembers =
    selectedMembers.length === 0
      ? members
      : members.filter((member) => selectedMembers.includes(member.id))
  return (
    <div className='mx-auto mt-8 relative'>
      {!hideControls && (
        <BookTableControls
          members={members}
          selectedMembers={selectedMembers}
          isHeatMapActive={isHeatMapActive}
          isAverageRowDisplayed={isAverageRowDisplayed}
          onToggleMember={toggleMember}
          onSelectAllMembers={selectAllMembers}
          onToggleHeatMap={() => setIsHeatMapActive((prev) => !prev)}
          onToggleAverageRow={() => setAverageRowDisplay((prev) => !prev)}
        />
      )}
      <div className='w-full overflow-x-auto scrollbar-none overscroll-x-none rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(49,46,129,0.5)]'>
        <table
          className={`w-max min-w-full border-separate border-spacing-0 text-left ${isHeatMapActive ? 'draw-heatmap' : ''}`}>
          <BooksTableHeader books={books} />
          <BooksTableBody books={books} members={visibleMembers} displayAverageRow={isAverageRowDisplayed} />
        </table>
      </div>
    </div>
  )
}

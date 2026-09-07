'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { BookWithStats } from '@/types/book'
import type { Member } from '@/types/member'

import { BooksTableHeader } from './BookTable/BooksTableHeader'
import { BooksTableBody } from './BookTable/BooksTableBody'
import { BookTableControls } from './BookTable/BookTableControls'

interface Props {
  books: BookWithStats[]
  members: Member[]
  hideControls?: boolean
}

export const BooksTable = ({ books, members, hideControls }: Props) => {
  const [isHeatMapActive, setIsHeatMapActive] = useState(false)
  const [isAverageRowDisplayed, setAverageRowDisplay] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [hoveredBookId, setHoveredBookId] = useState<number | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollEdges, setScrollEdges] = useState({ atStart: true, atEnd: true })

  const syncScrollEdges = useCallback(() => {
    const element = scrollRef.current

    if (!element) return

    const maxScroll = element.scrollWidth - element.clientWidth

    setScrollEdges({
      atStart: element.scrollLeft <= 1,
      atEnd: element.scrollLeft >= maxScroll - 1
    })
  }, [])

  useEffect(() => {
    const element = scrollRef.current

    if (!element) return

    syncScrollEdges()

    const observer = new ResizeObserver(syncScrollEdges)
    observer.observe(element)

    return () => observer.disconnect()
  }, [syncScrollEdges, books.length, members.length])

  function toggleMember(memberId: number) {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    )
  }

  function selectAllMembers() {
    setSelectedMembers([])
  }

  const visibleMembers =
    selectedMembers.length === 0
      ? members
      : members.filter((member) => selectedMembers.includes(member.id))

  return (
    <div className='relative mx-auto mt-8'>
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

      <div className='relative'>
        <div
          ref={scrollRef}
          onScroll={syncScrollEdges}
          className='w-full overflow-x-auto overscroll-x-none scrollbar-none rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(49,46,129,0.5)] dark:border-white/10 dark:bg-neutral-950'>
          <table
            className={`w-max min-w-full border-separate border-spacing-0 text-left ${isHeatMapActive ? 'draw-heatmap' : ''}`}>
            <caption className='sr-only'>Оцінки учасників клубу за кожну прочитану книгу</caption>
            <BooksTableHeader
              books={books}
              hideControls={!!hideControls}
              hoveredBookId={hoveredBookId}
              isScrolled={!scrollEdges.atStart}
              onHoverBook={setHoveredBookId}
            />
            <BooksTableBody
              books={books}
              members={visibleMembers}
              displayAverageRow={isAverageRowDisplayed}
              hideControls={!!hideControls}
              hoveredBookId={hoveredBookId}
              isScrolled={!scrollEdges.atStart}
              onHoverBook={setHoveredBookId}
            />
          </table>
        </div>

        {/* The scrollbar is hidden, so the cut-off edge is the only cue that there is more */}
        <div
          aria-hidden='true'
          className={`pointer-events-none absolute inset-y-px right-px w-14 rounded-r-[1.75rem] bg-linear-to-l from-white to-transparent transition-opacity duration-200 dark:from-neutral-950 ${
            scrollEdges.atEnd ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  )
}

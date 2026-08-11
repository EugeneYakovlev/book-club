'use client'

import { useEffect, useRef, useState } from 'react'

import type { Member } from '@/types/member'

interface Props {
  members: Member[]
  selectedMembers: number[]
  onToggleMember: (memberId: number) => void
  onSelectAllMembers: () => void
}

export const MemberMultiSelect = ({ members, selectedMembers, onToggleMember, onSelectAllMembers }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasCustomSelection = selectedMembers.length > 0

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
          isOpen || hasCustomSelection
            ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
            : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-violet-400/30 dark:hover:text-violet-200'
        }`}
      >
        {hasCustomSelection ? `Учасники: ${selectedMembers.length}` : 'Усі учасники'}
        <svg className='w-4 h-4 relative -top-px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="currentColor"/>
        </svg>
      </button>

      {isOpen && (
        <div className='absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-neutral-900'>
          <div role='listbox' aria-multiselectable='true' className='space-y-0.5'>
            <button
              type='button'
              role='option'
              aria-selected={!hasCustomSelection}
              onClick={onSelectAllMembers}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-bold transition ${
                !hasCustomSelection
                  ? 'bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-200'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'
              }`}
            >
              Усі учасники
              {!hasCustomSelection && <span aria-hidden='true'>✓</span>}
            </button>
            <div className='my-1 border-t border-slate-100 dark:border-white/10' />
            {members.map((member) => {
              const isSelected = selectedMembers.includes(member.id)

              return (
                <button
                  key={member.id}
                  type='button'
                  role='option'
                  aria-selected={isSelected}
                  onClick={() => onToggleMember(member.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-bold transition ${
                    isSelected
                      ? 'bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-200'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'
                  }`}
                >
                  {member.name}
                  {isSelected && <span aria-hidden='true'>✓</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

import { formatDiscussionDate } from '@/utils/date'

interface Props {
  date: string
  label: string
  compact?: boolean
}
export const DiscussionDateRow = ({ date, label, compact }: Props) => {
  const discussionDate = formatDiscussionDate(date)
  return (
    <div className={`${compact ? 'rounded-2xl shadow-sm backdrop-blur-sm flex items-center justify-between bg-white/70 dark:bg-white/5 px-6 py-3' : 'sm:p-6 rounded-3xl text-left border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 '}`}>
      <p className={'font-bold ' +(compact ? 'text-[10px]' : 'text-[11px]') + ' uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'}>
        {label}
      </p>
      <div className={'flex items-center gap-3' + (compact ? ' mt-0' : 'mt-3')}>
        <div className={'flex ' + (compact ? 'h-8 w-8' : 'h-10 w-10') + ' shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'}>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className={compact ? 'h-4 w-4' : 'h-5 w-5'}>
            <rect x='3' y='4' width='18' height='18' rx='2' />
            <path d='M16 2v4M8 2v4M3 10h18' />
          </svg>
        </div>
        <p className='text-base font-bold text-slate-800 dark:text-slate-100'>
          {discussionDate}
        </p>
      </div>
    </div>
  )
}

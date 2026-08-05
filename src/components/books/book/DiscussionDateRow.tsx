interface Props {
  date: string
  label: string
}
export const DiscussionDateRow = ({ date, label }: Props) => {
  const discussionDate = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
  return (
    <div className='rounded-3xl text-left border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-6'>
      <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>
        {label}
      </p>
      <div className='mt-3 flex items-center gap-3'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='h-5 w-5'>
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

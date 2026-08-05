interface Props {
  label?: string
  averageRating: number | null,
  additionalInfo?: string
}

export const AverageRatingRow = ({ averageRating, label }: Props) => {
  return (
    <div className='flex items-end justify-between gap-5'>
      <div>
        <p className='text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500'>
          {label}
        </p>
        <div className='mt-1 flex items-center gap-2'>
          <span className='text-5xl font-black tracking-tight text-slate-800 dark:text-white'>
            {averageRating ? averageRating.toFixed(2) : '—'}
          </span>
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className='mt-2 h-6 w-6 text-amber-400'>
            <path d='M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z' />
          </svg>
        </div>
      </div>
      {/* <p className='mb-1 text-right text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400'>
          {additionalInfo}
      </p> */}
    </div>
  )
}

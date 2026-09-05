import { StarIcon } from '@/components/ui/StarIcon'

interface Props {
  label?: string
  averageRating: number | null
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
          <StarIcon className='mt-2 h-6 w-6 text-amber-400' />
        </div>
      </div>
    </div>
  )
}

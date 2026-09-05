import Image from 'next/image'

import { StarIcon } from '@/components/ui/StarIcon'

interface Props {
  title: string
  cover: string
  averageRating: number
}
export const BookCoverWithRating = ({ title, cover, averageRating }: Props) => {
  return (
    <div className='relative mx-auto w-full max-w-65 lg:max-w-75'>
      <div className='relative overflow-hidden rounded-[1.65rem] bg-white shadow-[0_28px_40px_-22px_rgba(15,23,42,0.8)] ring-1 ring-slate-900/10 dark:bg-neutral-900 dark:ring-white/10'>
        {cover && (
          <Image
            src={cover}
            alt={title}
            width={300}
            height={450}
            loading='eager'
            className='aspect-2/3 w-full object-cover'
          />
        )}
      </div>
      <div className='absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-200'>
        <StarIcon className='h-6 w-6 text-amber-400' />
        {averageRating.toFixed(2)}{' '}
        <span className='font-medium text-slate-400'>/ 5</span>
      </div>
    </div>
  )
}

import type { Member } from '@/types/member'
import Image from 'next/image'
import Link from 'next/link'

type RatingCount = {
  memberId: number
  count: number
}

interface CriticCategory {
  leaders: RatingCount[]
  title: string
  description: string
  countLabel: string
  tone: string
}

interface Props {
  content: CriticCategory
  members: Member[]
}


const toneStyles = {
  emerald: {
    card: 'border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-400/15 dark:bg-emerald-400/5',
    image: 'ring-emerald-900/10 dark:ring-emerald-100/10',
    title: 'text-emerald-600 dark:text-emerald-300',
    count: 'text-emerald-700 dark:text-emerald-300',
    countLabel: 'text-emerald-600/70 dark:text-emerald-300/70'
  },
  rose: {
    card: 'border-rose-200/70 bg-rose-50/70 dark:border-rose-400/15 dark:bg-rose-400/5',
    image: 'ring-rose-900/10 dark:ring-rose-100/10',
    title: 'text-rose-600 dark:text-rose-300',
    count: 'text-rose-700 dark:text-rose-300',
    countLabel: 'text-rose-600/70 dark:text-rose-300/70'
  }
}

export const CriticCard = ({ content, members }: Props) => {
  return (
    <>
      {members.map((member) => (
        <Link
          key={member.id}
          href={`/members/${member.slug}`}
          className={`group flex items-center gap-3 rounded-2xl border p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${content.tone === 'rose' ? toneStyles.rose.card  : toneStyles.emerald.card }`}>
          <Image
            src={member.pic}
            width={112}
            height={112}
            className={`h-14 w-14 shrink-0 rounded-xl object-cover object-top ring-1 ${content.tone === 'rose' ? toneStyles.rose.image : toneStyles.emerald.image}`}
            alt={member.name}
          />
          <div className='min-w-0 flex-1'>
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.14em] ${content.tone === 'rose' ? toneStyles.rose.title : toneStyles.emerald.title}`}>
              {content.title}
            </p>
            <p className='mt-1 truncate text-base font-black text-slate-800 dark:text-slate-100'>
              {member.name}
            </p>
            <p className='mt-0.5 text-xs text-slate-500 dark:text-slate-400'>
              {content.description}
            </p>
          </div>
          <div
            className={`rounded-xl bg-white/80 px-3 py-2 text-center shadow-sm dark:bg-emerald-400/10 w-32`}>
            <p
              className={`text-xl font-black leading-none tabular-nums ${content.tone === 'rose' ? toneStyles.rose.count : toneStyles.emerald.count}`}>
              {content.leaders[0].count}
            </p>
            <p
              className={`mt-1 text-[9px] font-bold uppercase tracking-wider ${content.tone === 'rose' ? toneStyles.rose.countLabel : toneStyles.emerald.countLabel}`}>
              {content.countLabel}
            </p>
          </div>
        </Link>
      ))}
    </>
  )
}

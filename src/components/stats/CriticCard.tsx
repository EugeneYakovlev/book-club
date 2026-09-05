import Image from 'next/image'
import Link from 'next/link'

import type { Member } from '@/types/member'
import { type Tone, toneStyles } from '@/styles/tones'

type RatingCount = {
  memberId: number
  count: number
}

export interface CriticCategory {
  leaders: RatingCount[]
  title: string
  description: string
  countLabel: string
  tone: Tone
  href: string
}

interface Props {
  content: CriticCategory
  members: Member[]
}

export const CriticCard = ({ content, members }: Props) => {
  const styles = toneStyles[content.tone]

  return (
    <>
      {members.map((member) => {
        const count = content.leaders.find((leader) => leader.memberId === member.id)?.count ?? 0

        return (
          <Link
            key={member.id}
            href={content.href}
            className={`group flex items-center gap-3 rounded-2xl border p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}>
            <Image
              src={member.pic}
              width={112}
              height={112}
              className={`h-14 w-14 shrink-0 rounded-xl object-cover object-top ring-1 ${styles.ring}`}
              alt={member.name}
            />
            <div className='min-w-0 flex-1'>
              <p className={`text-[10px] font-bold uppercase tracking-[0.14em] ${styles.title}`}>
                {content.title}
              </p>
              <p className='mt-1 truncate text-base font-black text-slate-800 dark:text-slate-100'>
                {member.name}
              </p>
              <p className='mt-0.5 text-xs text-slate-500 dark:text-slate-400'>
                {content.description}
              </p>
            </div>
            <div className={`w-32 rounded-xl px-3 py-2 text-center shadow-sm ${styles.score}`}>
              <p className={`text-xl font-black leading-none tabular-nums ${styles.count}`}>
                {count}
              </p>
              <p className={`mt-1 text-[9px] font-bold uppercase tracking-wider ${styles.countLabel}`}>
                {content.countLabel}
              </p>
            </div>
          </Link>
        )
      })}
    </>
  )
}

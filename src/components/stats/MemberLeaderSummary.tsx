import type { Member } from '@/types/member'
import Image from 'next/image'
import Link from 'next/link'

import { getMemberColor } from '@/utils/member'

type LeaderSummaryProps = {
  countLabel: string
  tone: 'emerald' | 'rose'
  members: Member[]
  results: { memberId: number; count: number }[]
}

const toneStyles = {
  emerald: {
    card: 'border-emerald-200/80 bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-400/5',
    tag: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
    count: 'text-emerald-700 dark:text-emerald-300',
    label: 'text-emerald-600/80 dark:text-emerald-300/80',
    ring: 'ring-emerald-900/8 dark:ring-emerald-100/10'
  },
  rose: {
    card: 'border-rose-200/80 bg-rose-50/80 dark:border-rose-400/20 dark:bg-rose-400/5',
    tag: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
    count: 'text-rose-700 dark:text-rose-300',
    label: 'text-rose-600/80 dark:text-rose-300/80',
    ring: 'ring-rose-900/8 dark:ring-rose-100/10'
  }
}

export const MemberLeaderSummary = ({
  countLabel,
  tone,
  members,
  results
}: LeaderSummaryProps) => {
  const styles = toneStyles[tone]
  const memberMap = new Map(members.map((member) => [member.id, member]))
  const rankedMembers = [...results]
    .filter((result) => memberMap.has(result.memberId))
    .sort((a, b) => b.count - a.count)

  return (
    <div className={`mt-8 rounded-3xl border p-4 shadow-sm sm:p-5 ${styles.card}`}>
      <div className='grid gap-3 md:grid-cols-2'>
        {rankedMembers.map((result) => {
          const member = memberMap.get(result.memberId)

          if (!member) return null

          const memberColor = getMemberColor(member.id, members)

          return (
            <Link
              href={`/members/${member.slug}`}
              key={member.id}
              className='flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition duration-200 dark:border-white/10 dark:bg-slate-950/40'
              style={{ borderColor: `${memberColor}88` }}
            >
              <div className='flex items-center gap-2'>
                <span
                  className='h-2.5 w-2.5 rounded-full'
                  style={{ backgroundColor: memberColor }}
                />
                <Image
                  src={member.pic}
                  alt={member.name}
                  width={72}
                  height={72}
                  className='h-14 w-14 rounded-xl object-cover object-top border border-white/60 dark:border-slate-800'
                  style={{ boxShadow: `0 0 0 1px ${memberColor}66` }}
                />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='truncate text-base font-black text-slate-800 dark:text-slate-100'>
                  {member.name}
                </p>
                <p className='mt-0.5 text-xs text-slate-500 dark:text-slate-400'>
                  {countLabel}
                </p>
              </div>

              <div
                className='rounded-xl px-3 py-2 text-center'
                style={{
                  backgroundColor: `${memberColor}14`,
                  border: `1px solid ${memberColor}55`,
                  color: memberColor
                }}
              >
                <p className='text-xl font-black leading-none tabular-nums'>
                  {result.count}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

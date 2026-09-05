import Image from 'next/image'
import Link from 'next/link'

import type { Member } from '@/types/member'
import { type Tone, toneStyles } from '@/styles/tones'
import { getMemberColor } from '@/utils/member'
import { Panel } from '@/components/ui/Panel'
import { AwardIcon } from '@/components/ui/AwardIcon'

interface Props {
  leaderTitle: string
  leaderTitlePlural: string
  countLabel: string
  tone: Tone
  members: Member[]
  results: { memberId: number; count: number }[]
  totalBooks: number
}

interface RankedMember {
  member: Member
  count: number
  rank: number
}

function rankMembers(members: Member[], results: Props['results']): RankedMember[] {
  const countsByMemberId = new Map(results.map((result) => [result.memberId, result.count]))

  const sorted = members
    .map((member) => ({ member, count: countsByMemberId.get(member.id) ?? 0 }))
    .sort((a, b) => b.count - a.count)

  let rank = 0
  let previousCount = -1

  return sorted.map((row, index) => {
    if (row.count !== previousCount) {
      rank = index + 1
      previousCount = row.count
    }

    return { ...row, rank }
  })
}

export const LeaderboardSummary = ({
  leaderTitle,
  leaderTitlePlural,
  countLabel,
  tone,
  members,
  results,
  totalBooks
}: Props) => {
  const styles = toneStyles[tone]
  const ranked = rankMembers(members, results)

  const topCount = ranked[0]?.count ?? 0
  const leaders = topCount > 0 ? ranked.filter((row) => row.count === topCount) : []
  const hasTie = leaders.length > 1

  return (
    <div className='mx-auto mt-10 max-w-4xl space-y-4'>
      {leaders.length > 0 && (
        <div>
          <p className={`flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] ${styles.title}`}>
            <AwardIcon className='h-4 w-4' />
            {hasTie ? `${leaderTitlePlural} — порівну` : leaderTitle}
          </p>

          <div className={`mt-3 grid gap-4 ${hasTie ? 'sm:grid-cols-2' : ''}`}>
            {leaders.map(({ member, count }) => {
              const memberColor = getMemberColor(member.id, members)
              const share = totalBooks > 0 ? Math.round((count / totalBooks) * 100) : 0

              return (
                <Link
                  key={member.id}
                  href={`/members/${member.slug}`}
                  className={`group relative overflow-hidden rounded-3xl border p-5 pt-6 shadow-sm transition duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md ${styles.card}`}>
                  <span
                    aria-hidden='true'
                    className='absolute inset-x-0 top-0 h-1'
                    style={{ backgroundColor: memberColor }}
                  />

                  <div className='flex items-center gap-4'>
                    <Image
                      src={member.pic}
                      alt={member.name}
                      width={120}
                      height={120}
                      className='h-20 w-20 shrink-0 rounded-2xl object-cover object-top'
                      style={{ boxShadow: `0 0 0 2px ${memberColor}` }}
                    />
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-xl font-black text-slate-800 dark:text-slate-100'>{member.name}</p>
                      <p className='mt-2 text-xs text-slate-500 dark:text-slate-400'>
                        {share}% із {totalBooks} прочитаних книг
                      </p>
                    </div>
                    <div className='shrink-0 text-right'>
                      <p className={`text-5xl font-black leading-none tabular-nums ${styles.count}`}>{count}</p>
                      <p className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider ${styles.countLabel}`}>
                        {countLabel}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <Panel padding='none' className='p-4 sm:p-5'>
        <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
          Повний рейтинг
        </p>
        <ol className='space-y-2'>
          {ranked.map(({ member, count, rank }) => {
            const memberColor = getMemberColor(member.id, members)
            const barWidth = topCount > 0 ? (count / topCount) * 100 : 0
            const isLeader = count === topCount && topCount > 0

            return (
              <li key={member.id}>
                <Link
                  href={`/members/${member.slug}`}
                  className={`flex items-center gap-3 rounded-2xl border p-2.5 transition duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md sm:gap-4 sm:p-3 ${
                    isLeader
                      ? styles.card
                      : 'border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-slate-950/40'
                  }`}>
                  <span className='w-4 shrink-0 text-center text-sm font-black tabular-nums text-slate-500 dark:text-slate-400'>
                    {rank}
                  </span>
                  <Image
                    src={member.pic}
                    alt={member.name}
                    width={88}
                    height={88}
                    className='h-11 w-11 shrink-0 rounded-xl object-cover object-top'
                    style={{ boxShadow: `0 0 0 1px ${memberColor}88` }}
                  />
                  <p className='flex w-20 shrink-0 items-center gap-1 truncate text-sm font-bold text-slate-800 dark:text-slate-100 sm:w-28'>
                    <span className='truncate'>{member.name}</span>
                    {isLeader && <AwardIcon className={`h-3.5 w-3.5 shrink-0 ${styles.count}`} />}
                  </p>
                  <div
                    aria-hidden='true'
                    className='h-2 flex-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10'>
                    <div
                      className='h-full rounded-full'
                      style={{ width: `${barWidth}%`, backgroundColor: memberColor }}
                    />
                  </div>
                  <span className='w-6 shrink-0 text-right text-base font-black tabular-nums text-slate-800 dark:text-slate-100'>
                    {count}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </Panel>
    </div>
  )
}

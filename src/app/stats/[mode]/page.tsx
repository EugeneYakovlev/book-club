import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Section } from '@/components/layouts/Section'
import { CriticsChart } from '@/components/stats/CriticsChart'
import { MemberLeaderSummary } from '@/components/stats/MemberLeaderSummary'

import type { Tone } from '@/styles/tones'
import { getBooksWithStats, getMembers } from '@/data/selectors'
import { getMemberRatingCounts } from '@/utils/member'

interface Leaderboard {
  mode: 'highest' | 'lowest'
  tone: Tone
  pageTitle: string
  chartTitle: string
  listTitle: string
  yLabel: string
  countLabel: string
}

const leaderboards = {
  loyal: {
    mode: 'highest',
    tone: 'emerald',
    pageTitle: 'Найлояльніші читачі',
    chartTitle: 'Графік лояльних читачів',
    listTitle: 'Рейтинг лояльних читачів',
    yLabel: 'К-сть найвищих оцінок',
    countLabel: 'найвищих оцінок'
  },
  critic: {
    mode: 'lowest',
    tone: 'rose',
    pageTitle: 'Найсуворіші критики',
    chartTitle: 'Графік суворих критиків',
    listTitle: 'Рейтинг критиків',
    yLabel: 'К-сть найнижчих оцінок',
    countLabel: 'найнижчих оцінок'
  }
} satisfies Record<string, Leaderboard>

type LeaderboardMode = keyof typeof leaderboards

type Params = { params: Promise<{ mode: string }> }

/** Only /stats/loyal and /stats/critic exist; anything else under /stats/ is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(leaderboards).map((mode) => ({ mode }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { mode } = await params
  const leaderboard = leaderboards[mode as LeaderboardMode]

  if (!leaderboard) return {}

  return {
    title: leaderboard.pageTitle,
    description: `${leaderboard.listTitle} книжкового клубу «Чотири вальта».`
  }
}

const LeaderboardPage = async ({ params }: Params) => {
  const { mode } = await params
  const leaderboard = leaderboards[mode as LeaderboardMode]

  if (!leaderboard) {
    notFound()
  }

  const books = getBooksWithStats()
  const members = getMembers()
  const results = getMemberRatingCounts(books, leaderboard.mode)

  return (
    <>
      <Section eyebrow={leaderboard.chartTitle}>
        <CriticsChart books={books} members={members} yLabel={leaderboard.yLabel} mode={leaderboard.mode} />
      </Section>

      <Section eyebrow={leaderboard.listTitle}>
        <div className='max-w-5xl mx-auto'>
          <MemberLeaderSummary
            countLabel={leaderboard.countLabel}
            tone={leaderboard.tone}
            members={members}
            results={results}
          />
        </div>
      </Section>
    </>
  )
}

export default LeaderboardPage

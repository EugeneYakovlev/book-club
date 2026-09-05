import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Section } from '@/components/layouts/Section'
import { CriticsChart } from '@/components/stats/CriticsChart'
import { LeaderboardSummary } from '@/components/stats/LeaderboardSummary'
import { Panel } from '@/components/ui/Panel'

import type { Tone } from '@/styles/tones'
import { getBooksWithStats, getMembers } from '@/data/selectors'
import { getMemberRatingCounts } from '@/utils/member'

interface Leaderboard {
  mode: 'highest' | 'lowest'
  tone: Tone
  pageTitle: string
  eyebrow: string
  intro: string
  leaderTitle: string
  leaderTitlePlural: string
  yLabel: string
  countLabel: string
}

const leaderboards = {
  loyal: {
    mode: 'highest',
    tone: 'emerald',
    pageTitle: 'Найлояльніші читачі',
    eyebrow: 'Леґенди',
    intro: 'У кожної прочитаної книги є той, хто поставив їй найвищу оцінку. Тут рейтинг тих хто робив це найчастіше.',
    leaderTitle: 'Найлояльніший читач',
    leaderTitlePlural: 'Найлояльніші читачі',
    yLabel: 'К-сть найвищих оцінок',
    countLabel: 'найвищих оцінок'
  },
  critic: {
    mode: 'lowest',
    tone: 'rose',
    pageTitle: 'Найсуворіші критики',
    eyebrow: 'Леґенди',
    intro: 'У кожної прочитаної книги є той, хто поставив їй найнижчу оцінку. Тут рейтинг тих хто робив це найчастіше.',
    leaderTitle: 'Найсуворіший критик',
    leaderTitlePlural: 'Найсуворіші критики',
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
    description: leaderboard.intro
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
      <Section eyebrow={leaderboard.eyebrow} title={leaderboard.pageTitle}>
        <p className='mx-auto mt-4 max-w-lg text-center text-sm leading-6 text-slate-500 dark:text-slate-400'>
          {leaderboard.intro}
        </p>
        <LeaderboardSummary
          leaderTitle={leaderboard.leaderTitle}
          leaderTitlePlural={leaderboard.leaderTitlePlural}
          countLabel={leaderboard.countLabel}
          tone={leaderboard.tone}
          members={members}
          results={results}
          totalBooks={books.length}
        />
      </Section>

      <Section eyebrow='Динаміка' title='Як накопичувався рахунок' className='mt-16'>
        <Panel className='mx-auto mt-10'>
          <CriticsChart books={books} members={members} yLabel={leaderboard.yLabel} mode={leaderboard.mode} />
        </Panel>
      </Section>
    </>
  )
}

export default LeaderboardPage

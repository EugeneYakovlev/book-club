import type { Rating } from '@/types/rating'
import type { Member } from '@/types/member'

import { type RatingAxisScale, toAxisPercent } from '@/utils/books'
import { getMemberColor } from '@/utils/member'

const CLUSTER_THRESHOLD = 4
const CLUSTER_OFFSET = 7

const LABEL_MIN_GAP = 12

interface DotPoint {
  rating: Rating
  position: number
}

function clusterByPosition(points: DotPoint[]): DotPoint[][] {
  const clusters: DotPoint[][] = []

  for (const point of points) {
    const currentCluster = clusters.at(-1)

    if (currentCluster && point.position - currentCluster[0].position <= CLUSTER_THRESHOLD) {
      currentCluster.push(point)
    } else {
      clusters.push([point])
    }
  }

  return clusters
}

interface Props {
  ratings: Rating[]
  axis: RatingAxisScale
  average: number
  members: Member[]
  showGrid?: boolean
  inverted?: boolean
}

export const RatingSpread = ({ ratings, axis, average, members, showGrid = true, inverted = false }: Props) => {
  if (ratings.length === 0) return null

  const membersById = new Map(members.map((member) => [member.id, member]))

  const values = ratings.map((rating) => rating.value)
  const lowest = Math.min(...values)
  const highest = Math.max(...values)

  const lowestPosition = toAxisPercent(lowest, axis)
  const averagePosition = toAxisPercent(average, axis)
  const highestPosition = toAxisPercent(highest, axis)

  const showLowestLabel = averagePosition - lowestPosition >= LABEL_MIN_GAP
  const showHighestLabel = highestPosition - averagePosition >= LABEL_MIN_GAP

  const clusters = clusterByPosition(
    ratings
      .map((rating) => ({ rating, position: toAxisPercent(rating.value, axis) }))
      .sort((a, b) => a.position - b.position)
  )

  return (
    <div>
      <div className={`relative h-6 ${inverted ? 'text-white' : ''}`}>
        {showGrid && axis.ticks.map((tick) => (
          <span
            key={tick}
            aria-hidden='true'
            className={`absolute inset-y-1 w-px ${inverted ? 'bg-white/15' : 'bg-slate-200/90 dark:bg-white/10'}`}
            style={{ left: `${toAxisPercent(tick, axis)}%` }}
          />
        ))}

        <span
          aria-hidden='true'
          className={`absolute top-1/2 h-px w-full -translate-y-1/2 ${
            inverted ? 'bg-white/20' : 'bg-slate-200 dark:bg-white/10'
          }`}
        />

        <span
          title={`Середня оцінка: ${average.toFixed(2)}`}
          className={`absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full ${
            inverted ? 'bg-white/75' : 'bg-slate-500 dark:bg-white/55'
          }`}
          style={{ left: `${averagePosition}%` }}
        />

        {clusters.flatMap((cluster) =>
          cluster.map(({ rating, position }, indexInCluster) => {
            const member = membersById.get(rating.memberId)
            const offsetY = (indexInCluster - (cluster.length - 1) / 2) * CLUSTER_OFFSET

            return (
              <span
                key={rating.memberId}
                title={`${member?.name ?? 'Учасник'}: ${rating.label || rating.value}`}
                className={`absolute top-1/2 h-3 w-3 rounded-full border-2 ${
                  inverted ? 'border-slate-950' : 'border-white dark:border-neutral-950'
                }`}
                style={{
                  left: `${position}%`,
                  transform: `translate(-50%, calc(-50% + ${offsetY}px))`,
                  backgroundColor: getMemberColor(rating.memberId, members)
                }}
              />
            )
          })
        )}
      </div>

      {/* Anchored to the marks themselves; translateX by the position keeps them inside the track. */}
      <div
        className={`relative mt-1 h-4 text-[10px] font-semibold tabular-nums ${
          inverted ? 'text-white/55' : 'text-slate-400 dark:text-slate-500'
        }`}>
        {showLowestLabel && (
          <span
            className='absolute top-0'
            style={{ left: `${lowestPosition}%`, transform: `translateX(-${lowestPosition}%)` }}>
            {lowest.toFixed(2)}
          </span>
        )}
        <span
          className={`absolute top-0 ${inverted ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'}`}
          style={{ left: `${averagePosition}%`, transform: `translateX(-${averagePosition}%)` }}>
          {average.toFixed(2)}
        </span>
        {showHighestLabel && (
          <span
            className='absolute top-0'
            style={{ left: `${highestPosition}%`, transform: `translateX(-${highestPosition}%)` }}>
            {highest.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  )
}

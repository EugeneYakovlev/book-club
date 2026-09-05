'use client'

import { useState } from 'react'

import type { Book } from '@/types/book'
import type { Member } from '@/types/member'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Image from 'next/image'

import { getCumulativeTopRatingsByMember } from '@/utils/member'
import { useTheme } from '@/components/providers/ThemeProvider'

interface Props {
  books: Book[]
  members: Member[]
  yLabel: string
  mode?: 'highest' | 'lowest'
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const CriticsChart = ({ books, members, yLabel, mode = 'highest' }: Props) => {
  const { labels, datasets } = getCumulativeTopRatingsByMember(books, members, mode)
  const { isDark } = useTheme()
  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null)
  const [hiddenMemberIds, setHiddenMemberIds] = useState<number[]>([])

  const toggleMemberVisibility = (memberId: number) => {
    setHiddenMemberIds((current) =>
      current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId]
    )
  }

  const chartDatasets = datasets.map((dataset, index) => {
    const memberId = members[index]?.id
    const isHidden = memberId !== undefined && hiddenMemberIds.includes(memberId)
    const isActive = hoveredMemberId === memberId

    const baseColor = String(dataset.borderColor)
    const fadedColor = `${baseColor}66`

    return {
      ...dataset,
      hidden: isHidden,
      pointBackgroundColor: isActive || hoveredMemberId === null ? baseColor : fadedColor,
      pointBorderColor: isActive || hoveredMemberId === null ? baseColor : fadedColor,
      pointStyle: 'circle' as const,
      borderColor: isActive || hoveredMemberId === null ? baseColor : fadedColor,
      backgroundColor: 'transparent',
      borderWidth: isHidden ? 0 : isActive || hoveredMemberId === null ? 3 : 2,
      pointRadius: isHidden ? 0 : isActive || hoveredMemberId === null ? 5 : 3,
      pointHoverRadius: isHidden ? 0 : isActive || hoveredMemberId === null ? 7 : 5,
      pointBorderWidth: 1,
      borderDash: [0, 0],
      tension: 0.3,
      spanGaps: true
    }
  })

  const axisColor = isDark ? '#94a3b8' : '#475569'
  const gridColor = isDark ? 'rgba(148,163,184,0.16)' : 'rgba(15,23,42,0.08)'

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    transitions: {
      active: {
        animation: {
          duration: 0
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        cornerRadius: 10,
        padding: 12,
        callbacks: {
          title: (context) => {
            const index = context[0]?.dataIndex ?? 0
            return labels[index] ?? 'Книга'
          },
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`
        }
      }
    },
    elements: {
      line: {
        borderJoinStyle: 'round'
      },
      point: {
        hoverBorderWidth: 1
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Книги',
          color: axisColor
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          color: axisColor,
          callback: (_, index) => `${index + 1}`
        },
        grid: {
          color: gridColor
        },
        border: {
          color: gridColor
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(1, ...datasets.flatMap((dataset) => dataset.data)) + 1,
        title: {
          display: true,
          text: yLabel,
          color: axisColor
        },
        ticks: {
          color: axisColor
        },
        grid: {
          color: gridColor
        },
        border: {
          color: gridColor
        }
      }
    }
  }

  return (
    <div className='mt-6 space-y-4'>
      <div className='flex flex-wrap items-center justify-center gap-3 pb-4'>
        {members.map((member, index) => {
          const isHidden = hiddenMemberIds.includes(member.id)
          const isActive = hoveredMemberId === member.id
          const lineColor = chartDatasets[index]?.borderColor as string

          return (
            <button
              key={member.id}
              type='button'
              onMouseEnter={() => setHoveredMemberId(member.id)}
              onMouseLeave={() => setHoveredMemberId((current) => (current === member.id ? null : current))}
              onClick={() => toggleMemberVisibility(member.id)}
              className={[
                'flex items-center cursor-pointer gap-2 rounded-full border px-2.5 py-1.5 shadow-sm transition-all duration-200',
                isHidden
                  ? 'border-slate-200 bg-slate-100 text-slate-400 opacity-45 grayscale dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-500'
                  : 'border-slate-200 bg-white/80 text-slate-700 hover:shadow-md dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200',
                isActive && !isHidden ? 'border-violet-400 bg-violet-50 shadow-violet-200/60 dark:border-violet-400/80 dark:bg-violet-500/10' : ''
              ].join(' ')}
              aria-pressed={!isHidden}
              title={isHidden ? `Показати ${member.name}` : `Сховати ${member.name}`}
            >
              <div
                className='h-4 w-4 rounded-full border-2 border-white shadow-sm dark:border-slate-900'
                style={{ backgroundColor: lineColor }}
              />
              <Image
                src={member.pic}
                alt={member.name}
                width={24}
                height={24}
                className='h-6 w-6 rounded-full object-cover object-top ring-1 ring-slate-200 dark:ring-white/10'
              />
              <span className='text-[11px] font-medium'>
                {member.name}
              </span>
            </button>
          )
        })}
      </div>

      <div className='h-96 w-full'>
        <Line data={{ labels, datasets: chartDatasets }} options={chartOptions} />
      </div>

      <div className='flex justify-between pl-6 w-[calc(100%+10px)] gap-2'>
        {books.map((book) => (
          <div
            key={book.id}
            title={book.title}
            className='group relative flex max-w-11 w-full flex-col'
          >
            <div className='flex max-h-16 min-h-full max-w-11 w-full justify-center overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all duration-200 dark:border-white/10 dark:bg-slate-900/50'>
              <Image
                src={book.cover}
                alt={book.title}
                width={80}
                height={120}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
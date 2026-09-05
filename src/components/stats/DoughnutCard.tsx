'use client'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type LegendItem,
  type ChartData
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { useTheme } from '@/components/providers/ThemeProvider'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  title: string
  totalLabel: string
  totalValue: number
  data: Record<number, number>
  chartKind: 'all' | 'average'
}

const ratingLabels = ['1', '2', '3', '4', '5']
const ratingColors = ['#f87171', '#fb7185', '#fbbf24', '#4ade80', '#10b981']

export const DoughnutCard = ({
  title,
  totalLabel,
  totalValue,
  data,
  chartKind
}: Props) => {
  const { isDark } = useTheme()

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    layout: {
      padding: 8
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: isDark ? '#cbd5e1' : '#475569',
          padding: 14,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            family: 'system-ui, sans-serif',
            size: 11
          },
          filter: (legendItem: LegendItem, data: ChartData<'doughnut'>) => {
            const index = legendItem.index
            if (index === undefined) return false

            const value = data.datasets[0].data[index]
            return Number(value ?? 0) !== 0
          }
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#0f172a',
        cornerRadius: 10,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context) => `${context[0].label}⭐`,
          label: (context: {
            parsed: number
            dataset: { data: number[]; label?: string }
          }) => {
            const total = context.dataset.data.reduce(
              (sum, value) => sum + value,
              0
            )
            const percentage =
              total === 0 ? '0.0' : ((context.parsed / total) * 100).toFixed(1)

            const tooltipPreText =
              chartKind === 'all' ? 'поставили' : 'отримали'
            const tooltipAfterText = chartKind === 'all' ? 'раз(и/ів)' : '📚'

            return `${tooltipPreText} ${context.parsed} ${tooltipAfterText} (це ${percentage}%)`
          }
        }
      }
    }
  }

  const buildChartData = (counts: Record<number, number>) => ({
    labels: ratingLabels,
    datasets: [
      {
        label: title,
        data: ratingLabels.map((item) => counts[Number(item)]),
        backgroundColor: ratingColors,
        borderColor: 'transparent',
        borderWidth: 3,
        borderRadius: 8,
        spacing: 2,
        hoverOffset: 8
      }
    ]
  })

  return (
    <div className='group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-linear-to-br from-white via-white to-rose-50/60 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] transition duration-300 dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/30'>
      <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-400 via-amber-300 to-emerald-400' />
      <div className='mb-1 flex items-start justify-between gap-4'>
        <div>
          <p className='mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500'>Рейтинг</p>
          <h3 className='text-sm font-bold text-slate-800 dark:text-slate-100'>{title}</h3>
        </div>
      </div>
      <div className='relative h-64'>
        <div className='pointer-events-none absolute inset-x-0 bottom-9 top-0 z-10 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-2xl font-black leading-none tabular-nums text-slate-900 dark:text-white'>{totalValue}</p>
            <p className='mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>{totalLabel}</p>
          </div>
        </div>
        <Doughnut
          options={chartOptions}
          data={buildChartData(data)}
          className='w-full! overflow-visible!'
        />
      </div>
    </div>
  )
}

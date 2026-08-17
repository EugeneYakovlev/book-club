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

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  title: string
  totalLabel: string
  totalValue: number
  data: Record<number, number>
  chartKind: 'all' | 'average'
}

const ratingLabels = ['1', '2', '3', '4', '5']
const ratingColors = ['#b91c1c', '#f87171', '#fbbf24', '#10b981', '#059669']

export const DoughnutCard = ({
  title,
  totalLabel,
  totalValue,
  data,
  chartKind
}: Props) => {
  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 12,
          boxWidth: 6,
          boxHeight: 6,
          filter: (legendItem: LegendItem, data: ChartData<'doughnut'>) => {
            const index = legendItem.index
            if (index === undefined) return false

            const value = data.datasets[0].data[index]
            return Number(value ?? 0) !== 0
          }
        }
      },
      tooltip: {
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
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverOffset: 12
      }
    ]
  })

  return (
    <div className='rounded-xl border border-slate-200 p-4'>
      <h3 className='mb-2 text-sm font-semibold text-slate-700'>{title}</h3>
      <p className='mb-3 text-xs text-slate-500'>
        {totalLabel}: {totalValue}
      </p>
      <div className='h-64'>
        <Doughnut
          options={chartOptions}
          data={buildChartData(data)}
          className='w-full!'
        />
      </div>
    </div>
  )
}

import type { Book } from '@/types/book'

export interface Era {
  id: string
  label: string
  from: number | null
  to: number | null
}

export const ERAS: Era[] = [
  { id: 'victorian', label: 'Вікторіанська доба', from: null, to: 1901 },
  { id: 'modernism', label: 'Модернізм', from: 1901, to: 1945 },
  { id: 'postmodernism', label: 'Постмодернізм', from: 1945, to: 2000 },
  { id: 'contemporary', label: 'Сучасна', from: 2000, to: null }
]

export function getBookEra(year: number) {
  return ERAS.find((era) => (era.from === null || year >= era.from) && (era.to === null || year < era.to))
}

export interface YearAxis {
  min: number
  max: number
  ticks: number[]
}

const TICK_STEP = 25

export function getYearAxis(books: Book[]): YearAxis | null {
  const years = books.map((book) => book.year)

  if (years.length === 0) return null

  const oldest = Math.min(...years)
  const newest = Math.max(...years)
  const padding = Math.max((newest - oldest) * 0.05, 2)

  const min = oldest - padding
  const max = newest + padding

  const ticks: number[] = []

  for (let tick = Math.ceil(min / TICK_STEP) * TICK_STEP; tick <= max; tick += TICK_STEP) {
    ticks.push(tick)
  }

  return { min, max, ticks }
}

export function toYearPercent(year: number, axis: YearAxis) {
  return ((year - axis.min) / (axis.max - axis.min)) * 100
}

export interface EraSegment {
  era: Era
  count: number
  start: number
  width: number
}

export function getEraSegments(books: Book[], axis: YearAxis): EraSegment[] {
  return ERAS.map((era) => {
    const start = toYearPercent(era.from ?? axis.min, axis)
    const end = toYearPercent(era.to ?? axis.max, axis)

    return {
      era,
      count: books.filter((book) => getBookEra(book.year)?.id === era.id).length,
      start,
      width: end - start
    }
  }).filter((segment) => segment.width > 0)
}

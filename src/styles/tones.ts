export type Tone = 'emerald' | 'rose'

interface ToneStyle {
  card: string
  ring: string
  title: string
  count: string
  countLabel: string
  score: string
}

export const toneStyles: Record<Tone, ToneStyle> = {
  emerald: {
    card: 'border-emerald-200/80 bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-400/5',
    ring: 'ring-emerald-900/10 dark:ring-emerald-100/10',
    title: 'text-emerald-600 dark:text-emerald-300',
    count: 'text-emerald-700 dark:text-emerald-300',
    countLabel: 'text-emerald-600/70 dark:text-emerald-300/70',
    score: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
  },
  rose: {
    card: 'border-rose-200/80 bg-rose-50/80 dark:border-rose-400/20 dark:bg-rose-400/5',
    ring: 'ring-rose-900/10 dark:ring-rose-100/10',
    title: 'text-rose-600 dark:text-rose-300',
    count: 'text-rose-700 dark:text-rose-300',
    countLabel: 'text-rose-600/70 dark:text-rose-300/70',
    score: 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300'
  }
}

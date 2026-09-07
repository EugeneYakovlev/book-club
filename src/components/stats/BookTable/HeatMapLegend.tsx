const RATING_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8]

export const HeatMapLegend = () => (
  <div className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400'>
    <span>1</span>
    <span className='draw-heatmap flex overflow-hidden rounded-md ring-1 ring-slate-200 dark:ring-white/10'>
      {RATING_LEVELS.map((level) => (
        <span key={level} aria-hidden='true' className={`h-3 w-5 rating-${level}`} />
      ))}
    </span>
    <span>5</span>
  </div>
)

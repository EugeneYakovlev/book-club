interface Props {
  title: string
  isActive: boolean
  onToggle: () => void
}
export const ControlButton = ({ title, isActive, onToggle }: Props) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-pressed={isActive}
      className={`cursor-pointer flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
        isActive
          ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
          : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-violet-400/30 dark:hover:text-violet-200'
      }`}>
      {title}
    </button>
  )
}

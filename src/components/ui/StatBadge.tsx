import Link from 'next/link'

interface Props {
  href: string
  label: string
  tooltip: string
  toneClassName: string
}

export const StatBadge = ({ href, label, tooltip, toneClassName }: Props) => (
  <Link
    href={href}
    className={`group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${toneClassName}`}>
    {label}
    <span className='flex h-4 w-4 items-center justify-center rounded-full border border-current pl-px pt-px text-center text-[9px] normal-case leading-none'>
      i
    </span>
    <span
      role='tooltip'
      className='pointer-events-none absolute z-20 mb-2 w-60 rounded-xl bg-slate-900 px-3 py-2 text-left text-[11px] font-medium normal-case leading-4 tracking-normal text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus:opacity-100 max-md:bottom-full max-md:left-0 md:left-full md:ml-4 dark:bg-white dark:text-slate-900'>
      {tooltip}
    </span>
  </Link>
)

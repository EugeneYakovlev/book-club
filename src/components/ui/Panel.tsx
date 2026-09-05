type PanelTone = 'violet' | 'rose'
type PanelPadding = 'default' | 'roomy' | 'none'

interface Props {
  children: React.ReactNode
  tone?: PanelTone
  padding?: PanelPadding
  className?: string
  id?: string
}

const toneStyles: Record<PanelTone, string> = {
  violet:
    'from-violet-50 via-white to-amber-50 shadow-[0_30px_70px_-48px_rgba(49,46,129,0.55)] dark:from-violet-950/35 dark:via-neutral-950 dark:to-amber-950/20',
  rose:
    'from-rose-50 via-white to-amber-50 shadow-[0_30px_70px_-48px_rgba(136,19,55,0.45)] dark:from-rose-950/25 dark:via-neutral-950 dark:to-amber-950/15'
}

const paddingStyles: Record<PanelPadding, string> = {
  default: 'p-5 sm:p-8',
  roomy: 'p-5 sm:p-8 lg:p-10',
  none: ''
}

/** The gradient card shell shared by every content block on the site. */
export const Panel = ({ children, tone = 'violet', padding = 'default', className = '', id }: Props) => (
  <div
    id={id}
    className={`relative overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br dark:border-white/10 ${toneStyles[tone]} ${paddingStyles[padding]} ${className}`}>
    {children}
  </div>
)

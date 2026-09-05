export const AwardIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
    aria-hidden='true'>
    <circle cx='12' cy='9' r='6' />
    <path d='M8.2 13.9 7 22l5-3 5 3-1.2-8.1' />
  </svg>
)

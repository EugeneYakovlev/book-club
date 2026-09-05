interface Props {
  title?: string,
  eyebrow?: string,
  id?: string,
  className?: string,
  children: React.ReactNode
}

export const Section = ({ title, eyebrow, id, className = '', children }: Props) => {
  return (
    <section className={`my-16 px-4 ${className}`} id={id}>
      <div className="text-center">
        { eyebrow && (
          <span className='inline-flex rounded-full bg-indigo-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'>
            { eyebrow }
          </span>
        )}
        { title && (
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            { title }
          </h2>
        )}
      </div>

      { children }
    </section>
  )
}

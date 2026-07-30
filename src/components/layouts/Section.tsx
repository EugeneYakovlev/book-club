interface Props {
  title?: string,
  eyebrow: string,
  children: React.ReactNode
}

export const Section = ({title, eyebrow, children}: Props) => {
  return ( 
    <section className="mt-16 px-4">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:bg-indigo-500/10 dark:text-indigo-300">
          {eyebrow}
        </span>
        {title && (
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
            {title}
          </h2>
        )}
      </div>

      { children }
    </section>
  )
}
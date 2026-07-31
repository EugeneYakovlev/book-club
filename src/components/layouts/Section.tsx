import Link from "next/link"

interface Props {
  title?: string,
  eyebrow: string,
  button?: {
    href: string,
    title: string
  },
  children: React.ReactNode
}

export const Section = ({title, eyebrow, button, children}: Props) => {
  return ( 
    <section className="my-32 px-4">
      <div className="mx-auto max-w-5xl text-center">
        { eyebrow && (
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
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

      { button && (
        <div className='text-center mx-auto flex justify-center mt-6'>
          <Link href={button && button.href ? button.href : ''} className="link relative">
            <span>{button.title}</span>
            <svg className="link__graphic link__graphic--stroke link__graphic--scribble" width="100%" height="9" viewBox="0 0 101 9"><path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"></path></svg>
          </Link>
        </div>
      )}
    </section>
  )
}
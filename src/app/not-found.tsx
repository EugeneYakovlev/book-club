import Link from 'next/link'

import { Section } from '@/components/layouts/Section'
import { Panel } from '@/components/ui/Panel'

const NotFound = () => {
  return (
    <Section eyebrow='404' title='Такої сторінки немає'>
      <Panel padding='roomy' className='mx-auto mt-10 max-w-xl text-center'>
        <p className='text-sm leading-6 text-slate-600 dark:text-slate-300'>
          Можливо, книгу ще не додали, або посилання застаріло.
        </p>
        <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
          <Link
            href='/'
            className='rounded-lg border border-violet-600 bg-violet-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500'>
            На головну
          </Link>
          <Link
            href='/books'
            className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition duration-200 hover:border-violet-200 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:text-violet-200'>
            Усі книги
          </Link>
        </div>
      </Panel>
    </Section>
  )
}

export default NotFound

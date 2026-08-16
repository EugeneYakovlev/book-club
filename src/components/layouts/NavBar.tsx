'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const navList = [
    { link: '/', title: 'Головна' },
    { link: '/books', title: 'Книги'},
    { link: '/stats', title: 'Статистика'},
    { link: '/#members', title: 'Учасники'}
  ]

  const pathname = usePathname()

  return (
    <header className="fixed mx-auto max-w-5xl inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 xl:px-0">
      <nav className="mx-auto flex h-14 items-center justify-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-2.5 shadow-[0_14px_35px_-22px_rgba(49,46,129,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 sm:px-3 sm:pl-8">
        <Link className="group hidden sm:flex items-center gap-2.5 rounded-xl py-1 pr-1.5 text-slate-900 dark:text-white" href='/' aria-label='Book Club — головна'>
          <span className="text-lg font-bold uppercase tracking-[-0.06em] block">
            Book Club
          </span>
        </Link>

        <ul className="flex max-sm:w-full max-sm:justify-between items-center gap-0.5 rounded-xl bg-slate-100/80 p-1 dark:bg-white/5">
          { navList.map((navItem) => {
            const isActive = pathname === navItem.link
            return (
              <li key={navItem.link}>
                <Link
                  href={navItem.link}
                  className={`relative block rounded-lg px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition duration-200 sm:px-3 sm:text-[11px] ${
                    isActive
                      ? 'bg-white text-violet-700 shadow-sm dark:bg-white/10 dark:text-violet-200'
                      : 'text-slate-500 lg:hover:bg-white/70 lg:hover:text-slate-900 dark:text-slate-400 dark:lg:hover:bg-white/5 dark:lg:hover:text-slate-100'
                  }`}
                >
                  {navItem.title}
                </Link>
              </li>
            )
          }) }
        </ul>
      </nav>
    </header>
   );
}

export default NavBar;

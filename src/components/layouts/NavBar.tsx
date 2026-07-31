'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const navList = [
    { link: '/', title: 'Головна' },
    { link: '/books', title: 'Книги'},
    { link: '/stats', title: 'Статистика'},
    { link: '/members', title: 'Учасники'}
  ]

  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 px-4 top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/80">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between">
        <Link className="text-lg font-bold uppercase tracking-tighter text-neutral-900 dark:text-neutral-50" href='/'>
          Book club
        </Link>

        <ul className="flex items-center gap-5 sm:gap-8">
          { navList.map((navItem, index) => {
            const isActive = pathname === navItem.link
            return (
              <li key={index}>
                <Link
                  href={navItem.link}
                  className={`relative text-xs font-medium uppercase tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-neutral-900 after:transition-transform after:content-[''] hover:text-neutral-900 hover:after:scale-x-100 sm:text-sm dark:after:bg-neutral-50 dark:hover:text-neutral-50 ${
                    isActive
                      ? 'text-neutral-900 after:scale-x-100 dark:text-neutral-50'
                      : 'text-neutral-500 dark:text-neutral-400'
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
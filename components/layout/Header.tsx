'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '../ui/Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <>
      {/* 모바일: 첫 방문에서도 메뉴에 바로 접근 */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/80 px-5 py-3 font-bold backdrop-blur-xl transition-all duration-300 sm:hidden dark:border-gray-800 dark:bg-gray-950/80`}
      >
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          최즉흥
        </Link>
        <div className="flex items-center gap-1">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>

      {/* 데스크탑: 기존 헤더 유지 */}
      <header className="sticky top-0 z-50 mx-auto hidden w-full max-w-5xl items-center justify-between border-b border-gray-200 bg-white/95 px-6 py-4 font-semibold backdrop-blur-xl sm:flex dark:border-gray-800 dark:bg-gray-950/95">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          최즉흥
        </Link>

        <div className="flex items-center space-x-2 leading-5">
          <div className="no-scrollbar flex items-center gap-x-1">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-600 dark:hover:text-primary-400 rounded-xl px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-950/30"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-2 dark:border-gray-800">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

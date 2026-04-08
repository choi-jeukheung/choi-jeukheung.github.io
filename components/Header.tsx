'use client'

import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* 모바일: 스크롤 후 상단 고정 */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/80 px-5 py-3 backdrop-blur-xl transition-all duration-300 sm:hidden dark:border-gray-800 dark:bg-gray-950/80 ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
            면시피
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>

      {/* 데스크탑: 기존 헤더 유지 */}
      <header className="sticky top-4 z-50 mx-auto my-4 hidden w-full max-w-5xl items-center justify-between rounded-3xl border border-white/20 bg-white/70 px-6 py-4 shadow-lg shadow-black/5 backdrop-blur-xl sm:flex dark:bg-gray-950/70">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            면시피
          </div>
        </Link>

        <div className="flex items-center space-x-2 leading-5">
          <div className="no-scrollbar flex items-center gap-x-1">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-orange-50 hover:text-orange-600 dark:text-gray-400 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
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

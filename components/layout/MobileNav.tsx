'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Link from '../ui/Link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => setNavShow(!navShow)

  // 1. 아이콘 매핑 로직 강화 (한글/영문 모두 대응)
  const getFoodIcon = (title: string) => {
    const t = title.toLowerCase()
    // 키워드 포함 여부로 아이콘 결정
    if (t.includes('recipe') || t.includes('레시피')) return '🥘'
    if (t.includes('tag') || t.includes('태그')) return '🏷️'
    if (t.includes('about') || t.includes('소개')) return '🙇‍♂️'
    if (t.includes('blog') || t.includes('글') || t.includes('게시판')) return '🍽️'
    return '🍱' // 기본값 (도시락)
  }

  return (
    <>
      {/* 토글 버튼: 오렌지색 포인트 */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 transition-transform active:scale-90 sm:hidden dark:bg-gray-800"
      >
        <div className="space-y-1.5">
          <span className="block h-1 w-6 rounded-full bg-orange-500" />
          <span className="block h-1 w-4 rounded-full bg-orange-300" />
        </div>
      </button>

      <Transition show={navShow} as={Fragment}>
        <Dialog as="div" className="relative z-[100] sm:hidden" onClose={setNavShow}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
          >
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-end justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-300"
            >
              <DialogPanel className="relative w-full max-w-lg overflow-hidden rounded-t-[3.5rem] bg-white p-8 pt-14 shadow-2xl dark:bg-gray-950">
                {/* 상단 드래그 핸들 */}
                <div className="absolute top-5 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-gray-200 dark:bg-gray-800" />

                <div className="flex flex-col space-y-8">
                  <div className="px-2 text-center">
                    <h2 className="mb-1 text-3xl font-black tracking-tighter text-gray-900 dark:text-gray-100">
                      오늘의 메뉴 🍳
                    </h2>
                    <p className="text-sm font-bold tracking-widest text-orange-500 uppercase">
                      Select Category
                    </p>
                  </div>

                  {/* 메뉴 그리드 */}
                  <nav className="grid grid-cols-2 gap-4">
                    {headerNavLinks.map((link) => {
                      const icon = getFoodIcon(link.title)
                      return (
                        <Link
                          key={link.title}
                          href={link.href}
                          onClick={onToggleNav}
                          className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-transparent bg-gray-50 p-8 transition-all hover:border-orange-100 hover:bg-orange-50 active:scale-95 dark:bg-gray-900 dark:hover:bg-orange-950/20"
                        >
                          <span className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                            {icon}
                          </span>
                          <span className="text-lg font-black text-gray-900 dark:text-gray-100">
                            {link.title}
                          </span>

                          {/* 배경 워터마크 효과 */}
                          <div className="pointer-events-none absolute -right-2 -bottom-2 rotate-12 text-6xl opacity-[0.03]">
                            {icon}
                          </div>
                        </Link>
                      )
                    })}
                  </nav>

                  <button
                    onClick={onToggleNav}
                    className="w-full rounded-[2.2rem] bg-gray-900 py-5 text-lg font-black text-white shadow-xl transition-transform active:scale-[0.98] dark:bg-white dark:text-gray-900"
                  >
                    맛있게 구경하기
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav

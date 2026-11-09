'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from '../ui/Link'
import headerNavLinks from '@/data/headerNavLinks'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        type="button"
        aria-label="메뉴 열기"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 sm:hidden dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-[100] sm:hidden">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-end justify-center">
          <DialogPanel className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] dark:bg-gray-950">
            <div className="mb-3 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">메뉴</DialogTitle>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-lg px-3 text-base text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                닫기
              </button>
            </div>
            <nav aria-label="모바일 메뉴" className="space-y-1">
              {headerNavLinks.map((link) => {
                const active =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center justify-between rounded-xl px-4 py-3 text-base font-semibold ${active ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-900' : 'text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900'}`}
                  >
                    {link.title}
                    <span aria-hidden="true" className="text-gray-400">
                      →
                    </span>
                  </Link>
                )
              })}
            </nav>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

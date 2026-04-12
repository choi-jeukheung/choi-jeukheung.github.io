'use client'

import Link from './Link'
import { Youtube, Instagram } from './social-icons/icons'

export default function PlatformLinks() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
          {/* 좌측 문구: 볼드한 라벨 스타일 */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            <span className="text-sm font-black tracking-[0.2em] text-gray-400 uppercase dark:text-gray-500">
              매일 레시피 배달중
            </span>
          </div>

          {/* SNS 버튼 그룹 */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* 유튜브 */}
            <Link
              href="https://www.youtube.com/@%EC%B5%9C%EC%A6%89%ED%9D%A5-yjin"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-5 py-2.5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <Youtube className="h-5 w-5 fill-current" />
              <span className="text-sm font-black italic">YouTube</span>
            </Link>

            {/* 인스타그램 */}
            <Link
              href="https://www.instagram.com/choi_jeukheung"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-5 py-2.5 shadow-sm transition-all hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <Instagram className="h-5 w-5 fill-current" />
              <span className="text-sm font-black italic">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

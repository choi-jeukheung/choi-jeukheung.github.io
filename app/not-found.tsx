import Link from '@/components/ui/Link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* 404 비주얼 영역 */}
      <div className="relative mb-8">
        <h1 className="text-[10rem] font-black tracking-tighter text-gray-100 select-none md:text-[15rem] dark:text-gray-900">
          404
        </h1>
        <div className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center">
          <span className="animate-bounce text-8xl md:text-9xl">🍳</span>
          <div className="mt-4 flex gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 delay-75" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500 delay-150" />
          </div>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900 md:text-4xl dark:text-gray-100">
            레시피를 태워먹었어요!
          </h2>
          <p className="leading-relaxed font-medium text-gray-500 dark:text-gray-400">
            찾으시는 페이지가 마치 연기처럼 사라졌네요.
            <br />
            걱정 마세요, 주방에 다른 맛있는 메뉴들이 가득하니까요.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-[2rem] bg-orange-500 px-8 py-4 font-black text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-105 hover:bg-orange-600 active:scale-95 sm:w-auto"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/recipe"
            className="w-full rounded-[2rem] bg-gray-100 px-8 py-4 font-black text-gray-900 transition-all hover:bg-gray-200 sm:w-auto dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            레시피 구경하기
          </Link>
        </div>
      </div>

      {/* 배경 장식 (선택 사항) */}
      <div className="pointer-events-none fixed -bottom-10 -left-10 rotate-12 text-[15rem] opacity-[0.03]">
        🥘
      </div>
      <div className="pointer-events-none fixed -top-10 -right-10 -rotate-12 text-[15rem] opacity-[0.03]">
        🧂
      </div>
    </div>
  )
}

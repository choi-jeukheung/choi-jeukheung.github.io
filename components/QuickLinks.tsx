interface QuickLinkItem {
  title: string
  url: string
  icon: string
}

const affiliates: QuickLinkItem[] = [
  { title: '사용중인 가성비 팬 (쿠팡)', url: 'https://link.coupang.com/...', icon: '🍳' },
  { title: '파스타 소스 최저가', url: 'https://link.coupang.com/...', icon: '🍝' },
  { title: '다이어트 식단 재료', url: 'https://...', icon: '🥗' },
]

export default function QuickLinks() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="mb-1 text-xs font-black tracking-widest text-gray-400 uppercase">추천 링크</p>
      {affiliates.map((item) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 font-bold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-orange-900/50 dark:hover:bg-orange-950/20"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl dark:bg-gray-800">
            {item.icon}
          </span>
          <span className="flex-1 text-[15px]">{item.title}</span>
          <span className="text-gray-300 transition-transform group-hover:translate-x-1 dark:text-gray-600">
            ↗
          </span>
        </a>
      ))}
    </div>
  )
}

import Link from '../ui/Link'

const affiliateLinks = [
  { label: '사용중인 가성비 팬 (쿠팡)', href: 'https://link.coupang.com/...', icon: '🍳' },
  { label: '파스타 소스 최저가', href: 'https://link.coupang.com/...', icon: '🍝' },
  { label: '밥 재료', href: 'https://...', icon: '🍚' },
  { label: '소스 재료', href: 'https://...', icon: '🥫' },
  { label: '치즈 재료', href: 'https://...', icon: '🧀' },
]

const MainRecommend = () => {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <p className="mb-1 px-1 text-base font-black tracking-widest text-gray-900 uppercase dark:text-white">
        추천 링크
      </p>
      {affiliateLinks.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 font-bold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-orange-900/50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl dark:bg-gray-700">
            {icon}
          </span>
          <span className="flex-1 text-[15px]">{label}</span>
          <span className="text-gray-300 dark:text-gray-600">↗</span>
        </a>
      ))}

      {/* 전체 추천 상품 보기 */}
      <Link
        href="/products"
        className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-200 py-4 text-sm font-black text-gray-400 transition-all hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:hover:border-orange-700 dark:hover:text-orange-400"
      >
        <span>🛒</span>
        전체 추천 아이템 보기
        <span className="text-xs">→</span>
      </Link>
    </div>
  )
}

export default MainRecommend

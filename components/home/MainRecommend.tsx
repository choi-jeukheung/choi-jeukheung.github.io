import Link from '../ui/Link'

const affiliateLinks = [
  { label: '디벨라 토마토 퓌레 680G', href: 'https://link.coupang.com/a/eniXyb', icon: '🍅' },
  { label: '데체코 구르메 스파게티 500g', href: 'https://link.coupang.com/a/eniVLJ', icon: '🍝' },
  {
    label: '아그리폼 파르미지아노 레지아노 200g',
    href: 'https://link.coupang.com/a/enjp3D',
    icon: '🧀',
  },
  { label: '이금기 프리미엄 굴소스 167g', href: 'https://link.coupang.com/a/enjsUx', icon: '🥫' },
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

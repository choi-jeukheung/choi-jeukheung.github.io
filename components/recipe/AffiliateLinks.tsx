interface AffiliateLink {
  title: string
  url: string
  color: string
  icon?: string
}

// 2. 데이터 배열 (현업에서는 보통 별도 data 파일로 관리하지만, 일단 상수로 정의)
const links: AffiliateLink[] = [
  {
    title: '사용중인 가성비 팬 (쿠팡)',
    url: 'https://link.coupang.com/...',
    color: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    icon: '🍳',
  },
  {
    title: '파스타 소스 최저가',
    url: 'https://link.coupang.com/...',
    color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    icon: '🍝',
  },
  {
    title: '다이어트 식단 재료',
    url: 'https://...',
    color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    icon: '🥗',
  },
]

export default function AffiliateLinks() {
  const baseClass =
    'flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95'

  return (
    <section className="mx-auto max-w-2xl px-4 py-6">
      <div className="flex flex-col gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClass} ${link.color}`}
          >
            <span>{link.icon}</span>
            <span>{link.title}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

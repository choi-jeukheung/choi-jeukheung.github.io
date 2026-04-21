import Link from '@/components/ui/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '레시피 아카이브 태그',
  description: '고메.zip에 압축된 모든 미식 키워드들을 확인해보세요.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* 2026 트렌드: 비정형 헤더 디자인 */}
      <div className="flex flex-col items-center justify-center pt-24 pb-16 text-center">
        <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-orange-600 uppercase dark:bg-orange-900/30 dark:text-orange-400">
          Recipe Archive Index
        </span>
        <h1 className="mb-6 text-5xl font-black tracking-tighter text-gray-900 md:text-7xl dark:text-white">
          최즉흥<span className="text-orange-500">.</span>Tags
        </h1>
        <p className="max-w-md text-lg leading-tight font-medium text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-gray-200">
            {tagKeys.length}개의 키워드
          </span>
          로 <br /> 요리를 찾아보세요.
        </p>
      </div>

      {/* 태그 클라우드: 햅틱 그리드 디자인 */}
      <div className="flex flex-wrap justify-center gap-3 pb-20 md:gap-5">
        {tagKeys.length === 0 && (
          <p className="py-10 font-medium text-gray-500 italic">비어있는 저장소입니다.</p>
        )}

        {sortedTags.map((t) => {
          const count = tagCounts[t]
          const isHot = count > 5

          return (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className={`group relative flex items-center gap-3 rounded-[1.5rem] px-6 py-3.5 transition-all duration-300 ${
                isHot
                  ? 'bg-orange-500 text-white shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] hover:-translate-y-1.5 hover:shadow-[0_20px_30px_-10px_rgba(249,115,22,0.5)]'
                  : 'border border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-orange-900/50 dark:hover:bg-orange-950/10'
              } `}
            >
              <span
                className={`text-base font-black tracking-tight md:text-lg ${
                  isHot
                    ? 'text-white'
                    : 'text-gray-700 group-hover:text-orange-500 dark:text-gray-300'
                }`}
              >
                #{t}
              </span>

              <span
                className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-[10px] font-black ${
                  isHot
                    ? 'bg-white/20 text-white backdrop-blur-md'
                    : 'bg-gray-100 text-gray-400 group-hover:bg-orange-500 group-hover:text-white dark:bg-gray-800 dark:text-gray-500'
                } `}
              >
                {count}
              </span>

              {/* 2026 트렌드: 하단 글로우 효과 */}
              {isHot && (
                <div className="absolute inset-x-4 -bottom-1 h-2 bg-orange-600/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

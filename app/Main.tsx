import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import RecipeFeed from '@/components/home/RecipeFeed'
import MainProfile from '@/components/home/MainProfile'
import MainRecommend from '@/components/home/MainRecommend'
import MainSnsLink from '@/components/home/MainSnsLink'
import MainContour from '@/components/home/MainContour'
import KakaoAd from '@/components/ad/KakaoAd'

const MAX_DISPLAY = 4
// Recently selected recommendations appear first; other featured recipes remain available.
const FEATURED_PRIORITY = [
  'beef-jjamppong',
  'short-cabbage-tuna-salad',
  'short-pork-belly-butadon',
  'short-rice-cake-dumpling-soup',
  'short-spicy-dumpling-soup',
]

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const publishedPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featuredPostsRaw = publishedPosts.filter((post) => post.featured === true)
  const displayFeatured = [...featuredPostsRaw].sort((a, b) => {
    const rank = (slug: string) => {
      const index = FEATURED_PRIORITY.indexOf(slug)
      return index === -1 ? FEATURED_PRIORITY.length : index
    }
    return rank(a.slug) - rank(b.slug)
  })

  const featuredRecipes = displayFeatured.map((post: CoreContent<Blog>) => ({
    title: post.title,
    slug: post.slug,
    thumbnail: post.thumbnail,
    time: post.time || '15분',
    difficulty: post.difficulty ?? 3,
    summary: post.summary,
  }))

  const latestPosts = publishedPosts.slice(0, MAX_DISPLAY).map((post: CoreContent<Blog>) => ({
    ...post,
    difficulty: post.difficulty ?? 3,
    time: post.time || '10분',
  }))

  return (
    /* 전체가 하나의 센터 컬럼 — 모바일/웹 동일하게 좁고 깔끔 */
    <div className="mx-auto w-full max-w-[640px] px-5 pb-16">
      {/* ── 프로필 ── */}
      <MainProfile />

      {/* ── SNS 링크 ── */}
      {/* 추후에 넣을까말까 고민 */}
      <MainSnsLink />

      {/* ── 추천 식재료 ── */}
      <MainRecommend />

      <MainContour />

      {/* ── 레시피 피드 (같은 컬럼 안에서 2열 그리드) ── */}
      <RecipeFeed featuredRecipes={featuredRecipes} latestPosts={latestPosts} />

      {/* 메인 광고 */}
      <div className="my-6 flex justify-center">
        <KakaoAd />
      </div>
    </div>
  )
}

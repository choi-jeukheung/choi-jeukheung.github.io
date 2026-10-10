import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import RecipeFeed from '@/components/home/RecipeFeed'
import MainProfile from '@/components/home/MainProfile'
import MainRecommend from '@/components/home/MainRecommend'
import MainSnsLink from '@/components/home/MainSnsLink'
import MainContour from '@/components/home/MainContour'
import KakaoAd from '@/components/ad/KakaoAd'

const MAX_DISPLAY = 4

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const publishedPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featuredPostsRaw = publishedPosts.filter((post) => post.featured === true)
  const displayFeatured = featuredPostsRaw.slice(0, MAX_DISPLAY)

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

  const shortPosts = publishedPosts
    .filter((post) => post.videoType === 'short')
    .slice(0, MAX_DISPLAY)
    .map((post) => ({ ...post, difficulty: post.difficulty ?? 3, time: post.time || '' }))

  return (
    /* 전체가 하나의 센터 컬럼 — 모바일/웹 동일하게 좁고 깔끔 */
    <div className="mx-auto w-full max-w-[640px] px-5 pb-16">
      {/* ── 프로필 ── */}
      <MainProfile />

      {/* ── SNS 링크 ── */}
      {/* 추후에 넣을까말까 고민 */}
      <MainSnsLink />

      {/* ── 구분선 ── */}
      <MainContour />

      {/* ── 레시피 피드 (같은 컬럼 안에서 2열 그리드) ── */}
      <RecipeFeed
        featuredRecipes={featuredRecipes}
        latestPosts={latestPosts}
        shortPosts={shortPosts}
      />

      {/* ── 구분선 ── */}
      <MainContour />

      {/* ── 추천 링크 ── */}
      <MainRecommend />

      {/* 메인 광고 */}
      <div className="my-6 flex justify-center">
        <KakaoAd />
      </div>
    </div>
  )
}

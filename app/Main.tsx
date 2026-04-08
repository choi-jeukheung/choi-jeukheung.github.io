import RecipeFeed from '@/components/RecipeFeed'
import MainProfile from '@/components/MainProfile'
import MainRecommend from '@/components/MainRecommend'

const MAX_DISPLAY = 4

export default function Home({ posts }) {
  const featuredPostsRaw = posts.filter((post: any) => post.featured === true)
  const displayFeatured =
    featuredPostsRaw.length > 0 ? featuredPostsRaw.slice(0, 4) : posts.slice(0, 4)

  const featuredRecipes = displayFeatured.map((post: any) => ({
    title: post.title,
    slug: post.slug,
    thumbnail: post.thumbnail,
    time: post.time || '15분',
    difficulty: post.difficulty || 3,
    summary: post.summary,
  }))

  const latestPosts = posts.slice(0, MAX_DISPLAY).map((post: any) => ({
    ...post,
    difficulty: post.difficulty || 3,
    time: post.time || '10분',
  }))

  return (
    /* 전체가 하나의 센터 컬럼 — 모바일/웹 동일하게 좁고 깔끔 */
    <div className="mx-auto w-full max-w-[640px] px-5 pb-16">
      {/* ── 프로필 ── */}
      <MainProfile />

      {/* ── SNS 링크 ── */}
      {/* 추후에 넣을까말까 고민 */}
      {/* <MainSnsLink /> */}

      {/* ── 추천 링크 ── */}
      <MainRecommend />

      {/* ── 구분선 ── */}
      <div className="my-10 border-t border-gray-100 dark:border-gray-800" />

      {/* ── 레시피 피드 (같은 컬럼 안에서 2열 그리드) ── */}
      <RecipeFeed featuredRecipes={featuredRecipes} latestPosts={latestPosts} />
    </div>
  )
}

import { Suspense } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import RecipeSearch from '@/components/recipe/RecipeSearch'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '레시피 검색',
  description: '요리 이름과 재료로 최즉흥의 레시피를 찾아보세요.',
})

export default function SearchPage() {
  const recipes = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      summary: post.summary || '',
      tags: post.tags || [],
      ingredients: (post.structuredData?.recipeIngredient || []) as string[],
      videoType: post.videoType || 'full',
      thumbnail: post.thumbnail || siteMetadata.socialBanner,
    }))
  return (
    <Suspense
      fallback={
        <p className="py-8" role="status">
          검색을 준비하고 있어요.
        </p>
      }
    >
      <RecipeSearch recipes={recipes} />
    </Suspense>
  )
}

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const categories = [...new Set(allBlogs.map((post) => post.category).filter(Boolean))] as string[]
  const params: Array<{ category: string; page: string }> = []

  categories.forEach((category) => {
    const filteredPosts = allBlogs.filter((post) => post.category === category)
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    const pagesToGenerate = totalPages > 0 ? totalPages : 1

    for (let i = 1; i <= pagesToGenerate; i++) {
      params.push({
        // 수정: encodeURIComponent를 제거하고 한글을 그대로 전달합니다.
        // Next.js가 빌드 시점에 카테고리별 경로를 알아서 안전하게 매핑합니다.
        category: category,
        page: i.toString(),
      })
    }
  })

  return params
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string; page: string }>
}) {
  const params = await props.params

  // params에서 넘어오는 값은 이미 디코딩되어 있을 수 있지만,
  // 배포 환경의 일관성을 위해 decodeURIComponent를 유지하는 것이 안전합니다.
  const category = decodeURIComponent(params.category)
  const pageNumber = parseInt(params.page)

  const categoryNames: Record<string, string> = {
    godsaeng: '갓생 한끼',
    clean: '클린 식단',
    dopamine: '도파민 폭발',
    convenience: '편의점 털기',
    mood: '무드 메이커',
    'fridge-raid': '냉털 챌린지',
  }

  const categoryName = categoryNames[category] || category

  const allPosts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.category === category))
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber < 1 || (totalPages > 0 && pageNumber > totalPages) || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages === 0 ? 1 : totalPages,
  }

  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={categoryName}
    />
  )
}

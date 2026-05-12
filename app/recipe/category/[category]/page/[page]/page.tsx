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
        // 한글 카테고리명이 URL에서 깨지지 않도록 인코딩하여 경로 생성
        category: encodeURIComponent(category),
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

  // URL에서 넘어온 인코딩된 카테고리명을 다시 한글로 변환 ("%EB%A9%B4..." -> "면발의위로")
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

  // 해당 카테고리에 속한 포스트만 필터링
  const allPosts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.category === category))
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // 페이지 범위가 벗어나면 404 처리
  if (pageNumber < 1 || (totalPages > 0 && pageNumber > totalPages) || isNaN(pageNumber)) {
    return notFound()
  }

  // 현재 페이지에 보여줄 포스트 계산
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

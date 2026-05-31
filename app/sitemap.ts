import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '')

  // 1. 개별 레시피 포스트 주소 (중복/임시 파일 필터링 추가)
  const recipeRoutes = allBlogs
    .filter((post) => !post.draft)
    // 애드센스 봇이 헷갈려할 수 있는 임시/복사본 파일 주소 제외
    .filter((post) => !post.path.includes('copy') && !post.path.endsWith('.mdx'))
    .map((post) => {
      const path = post.path.replace(/^\//, '').replace(/^blog\//, 'recipe/')
      return {
        url: `${siteUrl}/${path}`,
        lastModified: post.lastmod || post.date,
      }
    })

  // 2. 고정 페이지 (메인, 레시피 홈)
  // 애드센스 중복 문서 필터링을 위해 'tags', 'category' 라우트는 사이트맵에서 완전히 제거합니다.
  const routes = ['', 'recipe'].map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // 구글에게는 껍데기(태그/카테고리) 주소 없이 진짜 "영양가 있는 알맹이 글" 주소만 넘겨줍니다.
  return [...routes, ...recipeRoutes]
}

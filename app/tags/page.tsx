import { slug } from 'github-slugger'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import TagExplorer from '@/components/tags/TagExplorer'

export const metadata = genPageMetadata({
  title: '태그로 찾는 한 끼',
  description: '냉장고 속 재료부터 지금 먹고 싶은 메뉴까지. 최즉흥의 레시피를 태그로 찾아보세요.',
})

export default function Page() {
  const posts = allBlogs.filter((post) => !post.draft)
  const tags = new Map<string, { name: string; slug: string; count: number }>()

  posts.forEach((post) => {
    const seen = new Set<string>()
    post.tags?.forEach((name) => {
      const key = slug(name)
      if (!key || seen.has(key)) return
      seen.add(key)
      const existing = tags.get(key)
      if (existing) existing.count += 1
      else tags.set(key, { name, slug: key, count: 1 })
    })
  })

  return <TagExplorer tags={Array.from(tags.values())} recipeCount={posts.length} />
}

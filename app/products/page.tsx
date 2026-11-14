import { allProducts, allBlogs } from 'contentlayer/generated'
import ProductsClient from '@/components/products/ProductsClient'
import PageIntro from '@/components/layout/PageIntro'

export const metadata = {
  title: '추천 상품',
  description: '요리에 쓰는 도구와 식재료를 모아봤어요.',
}

export default function ProductsPage() {
  const products = [...allProducts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((p) => ({
      title: p.title,
      date: p.date,
      category: p.category,
      image: p.image,
      link: p.link,
      affiliate: p.affiliate ?? false,
      summary: p.summary,
      slug: p.slug,
      recipes: (p.recipes || []).flatMap((slug) => {
        const post = allBlogs.find((post) => !post.draft && post.slug === slug)
        return post ? [{ title: post.title, slug: post.slug }] : []
      }),
    }))

  return (
    <div className="mx-auto max-w-3xl py-8 sm:py-12">
      <PageIntro eyebrow="요리에 곁들이는 도구와 재료" title="추천 아이템">
        레시피에 활용할 식재료와 도구를 모았어요. 활용 레시피에서 필요한 양과 조리법을 먼저 확인할
        수 있습니다.
      </PageIntro>
      <p className="mt-8 mb-6 rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-xs leading-relaxed text-gray-500 dark:border-gray-900/40 dark:bg-gray-900/10 dark:text-gray-400">
        이 페이지는 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
      <ProductsClient products={products} />
    </div>
  )
}

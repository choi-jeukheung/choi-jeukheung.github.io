import { allProducts } from 'contentlayer/generated'
import ProductsClient from '@/components/products/ProductsClient'
import PageIntro from '@/components/layout/PageIntro'

export const metadata = {
  title: '추천 상품',
  description: '요리에 쓰는 도구와 식재료를 모아봤어요.',
}

export default function ProductsPage() {
  const products = allProducts
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
    }))

  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-16">
      <PageIntro icon={<span aria-hidden="true">🛒</span>} title="추천 아이템">
        요리에 곁들일 조리도구와 식재료를 모았어요.
      </PageIntro>
      <p className="mb-6 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-xs leading-relaxed text-gray-500 dark:border-orange-900/40 dark:bg-orange-900/10 dark:text-gray-400">
        이 페이지는 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
      <ProductsClient products={products} />
    </div>
  )
}

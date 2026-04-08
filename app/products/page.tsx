import { allProducts } from 'contentlayer/generated'
import ProductsClient from '@/components/products/ProductsClient'

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
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-10 border-b border-gray-100 py-12 dark:border-gray-800">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
          추천 상품
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          직접 써보고 추천하는 조리도구와 식재료예요.
        </p>
      </div>
      <ProductsClient products={products} />
    </div>
  )
}

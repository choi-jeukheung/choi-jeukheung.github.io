import Link from '../ui/Link'
import Image from '../ui/Image'
import { allProducts } from 'contentlayer/generated'

const featuredProductSlugs = [
  'bibigo-wang-gyoza',
  'divella-tomato-puree',
  'de-cecco-spaghetti',
  'parmigiano-reggiano',
  'oyster-sauce',
  'decheko-ligatoni',
]

export default function MainRecommend() {
  const products = featuredProductSlugs.flatMap((slug) => {
    const product = allProducts.find((item) => item.slug === slug)
    return product ? [product] : []
  })

  return (
    <section aria-labelledby="home-products-heading" className="mt-9">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 id="home-products-heading" className="text-xl font-semibold tracking-tight">
          추천 식재료
        </h2>
        <Link
          href="/products"
          className="text-primary-600 dark:text-primary-400 inline-flex min-h-11 items-center text-sm font-medium"
        >
          전체 보기{' '}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </div>
      <p className="mb-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
        쿠팡파트너스 활동의 일환으로, 구매 시 일정액의 수수료를 제공받습니다.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <a
            key={product.slug}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="group flex min-w-0 items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-600"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-6 font-semibold break-words text-gray-900 dark:text-gray-100">
                {product.title}
              </p>
              <span className="mt-2 inline-block text-xs text-gray-500 dark:text-gray-400">
                상품 보기 <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

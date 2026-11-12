'use client'

import { useState, useMemo } from 'react'
import Image from '@/components/ui/Image'

interface Product {
  title: string
  date: string
  category: string
  image: string
  link: string
  affiliate: boolean
  summary?: string
  slug: string
}

const CATEGORIES = ['전체', '조리도구', '식재료', '그릇', '기타']

export default function ProductsClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('전체')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === '전체' || p.category === activeCategory
      const matchSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.summary ?? '').toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [products, search, activeCategory])

  return (
    <div>
      {/* 검색창 */}
      <div className="relative mb-5">
        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="search"
          aria-label="추천 상품 검색"
          placeholder="상품명이나 카테고리로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:border-primary-400 w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-base font-medium transition outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-gray-500"
        />
      </div>

      {/* 카테고리 탭 */}
      <div className="mb-6 flex flex-wrap gap-1 rounded-2xl border border-gray-100 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`min-h-11 flex-1 rounded-xl px-2 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                : 'hover:text-primary-600 dark:hover:text-primary-400 text-gray-500 dark:text-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 상품 그리드 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((product) => (
            <a
              key={product.slug}
              href={product.link}
              target="_blank"
              rel={
                product.affiliate ? 'noopener noreferrer sponsored nofollow' : 'noopener noreferrer'
              }
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-colors hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {product.affiliate && (
                  <span className="absolute top-2 left-2 rounded-lg bg-gray-50 px-2 py-1 text-xs font-black text-gray-600">
                    AD
                  </span>
                )}
              </div>
              <div className="p-3">
                <span className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  {product.category}
                </span>
                <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1 text-base leading-6 font-semibold break-words text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                {product.summary && (
                  <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {product.summary}
                  </p>
                )}
                <div className="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-gray-50 py-2 text-sm font-black text-gray-600 transition group-hover:bg-gray-800 group-hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:group-hover:bg-gray-700 dark:group-hover:text-white">
                  구매하러 가기 →
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-base font-bold text-gray-400">검색 결과가 없어요 🥲</p>
        </div>
      )}
    </div>
  )
}

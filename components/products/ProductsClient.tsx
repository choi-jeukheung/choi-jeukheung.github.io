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
          type="text"
          placeholder="상품명이나 카테고리로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm font-medium transition outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-orange-500"
        />
      </div>

      {/* 카테고리 탭 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-orange-500 text-white shadow-sm'
                : 'border border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 상품 그리드 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <a
              key={product.slug}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {product.affiliate && (
                  <span className="absolute top-2 left-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black text-white">
                    AD
                  </span>
                )}
              </div>
              <div className="p-3">
                <span className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  {product.category}
                </span>
                <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-black text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                  {product.title}
                </h3>
                {product.summary && (
                  <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {product.summary}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-center rounded-xl bg-orange-50 py-2 text-xs font-black text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-950/30 dark:text-orange-400">
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

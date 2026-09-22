'use client'

import { useState } from 'react'
import Link from 'next/link'

type RecipeTag = { name: string; slug: string; count: number }

export default function TagExplorer({
  tags,
  recipeCount,
}: {
  tags: RecipeTag[]
  recipeCount: number
}) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('count')
  const normalizedQuery = query.trim().replace(/^#/, '').normalize('NFC').toLocaleLowerCase('ko')
  const visibleTags = tags
    .filter((tag) => tag.name.normalize('NFC').toLocaleLowerCase('ko').includes(normalizedQuery))
    .sort((a, b) =>
      sort === 'name'
        ? a.name.localeCompare(b.name, 'ko')
        : b.count - a.count || a.name.localeCompare(b.name, 'ko')
    )

  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pb-16 text-gray-800 dark:text-gray-200">
      <header className="pt-16 pb-8 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl font-bold text-orange-500 dark:bg-orange-900/20 dark:text-orange-400"
        >
          #
        </span>
        <h1 className="mb-3 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          오늘은 뭐가 당기세요?
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          냉장고에 남은 재료도, 문득 먹고 싶은 메뉴도.
          <br />
          태그를 골라 오늘의 한 끼를 찾아보세요.
        </p>
        <div className="mt-5 flex justify-center gap-2 text-xs font-bold">
          <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
            태그 {tags.length}개
          </span>
          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            레시피 {recipeCount}편
          </span>
        </div>
      </header>

      <section aria-labelledby="tag-list-heading">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-md">
            <label htmlFor="tag-search" className="mb-2 block text-sm font-semibold">
              어떤 재료나 메뉴를 찾으세요?
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/20 dark:border-gray-700 dark:bg-gray-900">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5 shrink-0 text-gray-400"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                id="tag-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="예: 토마토, 파스타, 바질"
                className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-0 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="tag-sort" className="text-xs text-gray-500 dark:text-gray-400">
              정렬
            </label>
            <select
              id="tag-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-lg border-gray-300 bg-white py-2.5 pr-9 pl-3 text-sm focus:border-orange-400 focus:ring-orange-400 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="count">레시피 많은 순</option>
              <option value="name">가나다순</option>
            </select>
          </div>
        </div>

        <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-800">
          <h2 id="tag-list-heading" className="text-lg font-black">
            {normalizedQuery ? '검색한 태그' : '모든 태그'}
          </h2>
          <p role="status" className="text-xs text-gray-500 dark:text-gray-400">
            {visibleTags.length}개의 키워드
          </p>
        </div>
        {visibleTags.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
            {visibleTags.map((tag) => (
              <li key={tag.slug}>
                <Link
                  href={`/tags/${tag.slug}`}
                  className="group flex h-full min-h-24 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-orange-900/40"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl font-bold text-orange-500 dark:bg-orange-900/20 dark:text-orange-400"
                  >
                    #
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold break-words text-gray-800 dark:text-gray-100">
                      {tag.name}
                    </p>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      레시피 {tag.count}편
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl bg-gray-50 px-6 py-14 text-center dark:bg-gray-900">
            <p className="text-lg font-semibold">
              {tags.length
                ? '아직 이 키워드로 남긴 요리가 없어요.'
                : '첫 번째 요리 노트를 준비하고 있어요.'}
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {tags.length
                ? '다른 재료나 메뉴 이름으로 찾아보세요.'
                : '레시피가 쌓이면 태그도 이곳에 모아둘게요.'}
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-6 rounded-xl bg-orange-50 px-5 py-3 text-sm font-bold text-orange-600 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/40"
              >
                검색 초기화
              </button>
            )}
          </div>
        )}
        <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">아직 메뉴를 못 정했다면</p>
          <Link
            href="/recipe"
            className="rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-sm font-black text-gray-700 shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
          >
            전체 레시피 둘러보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

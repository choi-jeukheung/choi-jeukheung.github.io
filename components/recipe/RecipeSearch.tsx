'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from '@/components/ui/Link'
import PageIntro from '@/components/layout/PageIntro'

export type SearchRecipe = {
  slug: string
  title: string
  summary: string
  tags: string[]
  ingredients: string[]
  videoType: string
  thumbnail: string
}

const normalize = (value: string) => value.normalize('NFKC').toLowerCase().replace(/\s/g, '')

export default function RecipeSearch({ recipes }: { recipes: SearchRecipe[] }) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [inputValue, setInputValue] = useState(query)
  const composing = useRef(false)
  const lastWrittenQuery = useRef(query)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelPendingSearch = () => {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
  }

  useEffect(() => {
    const restore = () => {
      cancelPendingSearch()
      composing.current = false
      const restoredQuery = new URLSearchParams(window.location.search).get('q') || ''
      lastWrittenQuery.current = restoredQuery
      setInputValue(restoredQuery)
    }
    window.addEventListener('popstate', restore)
    return () => {
      cancelPendingSearch()
      window.removeEventListener('popstate', restore)
    }
  }, [])

  useEffect(() => {
    // Only restore external URL changes (such as back/forward navigation).
    // Our own URL updates must not replace text currently being composed.
    if (query !== lastWrittenQuery.current) {
      cancelPendingSearch()
      lastWrittenQuery.current = query
      if (!composing.current) setInputValue(query)
    }
  }, [query])

  const setQuery = (value: string) => {
    cancelPendingSearch()
    lastWrittenQuery.current = value
    const params = new URLSearchParams(window.location.search)
    if (value) params.set('q', value)
    else params.delete('q')
    params.delete('page')
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${params.size ? `?${params}` : ''}`
    )
  }
  const scheduleSearch = (value: string) => {
    cancelPendingSearch()
    if (value === query) return
    timer.current = setTimeout(() => {
      if (!composing.current) setQuery(value)
    }, 300)
  }
  const words = useMemo(() => query.trim().split(/\s+/).filter(Boolean).map(normalize), [query])
  const indexedRecipes = useMemo(
    () =>
      recipes.map((recipe) => ({
        recipe,
        text: normalize(
          [recipe.title, recipe.summary, ...recipe.tags, ...recipe.ingredients].join(' ')
        ),
      })),
    [recipes]
  )
  const results = useMemo(
    () =>
      indexedRecipes
        .filter(({ text }) => words.every((word) => text.includes(word)))
        .map(({ recipe }) => recipe),
    [indexedRecipes, words]
  )

  const totalPages = Math.max(1, Math.ceil(results.length / 8))
  const requestedPage = Number(searchParams.get('page') || 1)
  const page = Number.isSafeInteger(requestedPage)
    ? Math.min(totalPages, Math.max(1, requestedPage))
    : 1
  const visibleResults = results.slice((page - 1) * 8, page * 8)
  const pageHref = (value: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(value))
    return `?${params}`
  }

  return (
    <div className="mx-auto max-w-3xl py-8 sm:py-12">
      <PageIntro eyebrow="오늘은 뭘 해 먹을까?" title="레시피 검색">
        요리 이름이나 냉장고에 있는 재료를 검색해보세요.
      </PageIntro>
      <label htmlFor="recipe-search" className="mt-8 block text-sm font-semibold">
        요리 이름 · 재료
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="recipe-search"
          type="search"
          value={inputValue}
          onCompositionStart={() => {
            cancelPendingSearch()
            composing.current = true
          }}
          onCompositionEnd={(event) => {
            composing.current = false
            setInputValue(event.currentTarget.value)
            scheduleSearch(event.currentTarget.value)
          }}
          onChange={(event) => {
            const value = event.target.value
            setInputValue(value)
            if (!composing.current && !(event.nativeEvent as InputEvent).isComposing) {
              scheduleSearch(value)
            }
          }}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' &&
              !composing.current &&
              !event.nativeEvent.isComposing &&
              event.nativeEvent.keyCode !== 229
            ) {
              setQuery(event.currentTarget.value)
            }
          }}
          placeholder="예: 양배추 참치, 대패, 우동"
          className="min-w-0 flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base focus:border-orange-500 focus:ring-2 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900"
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => {
              composing.current = false
              setInputValue('')
              setQuery('')
            }}
            className="rounded-xl px-3 text-sm font-semibold hover:bg-orange-50 dark:hover:bg-gray-800"
          >
            초기화
          </button>
        )}
      </div>
      <p role="status" className="mt-5 text-sm text-gray-600 dark:text-gray-400">
        {words.length ? `검색 결과 ${results.length}개` : `전체 레시피 ${results.length}개`}
      </p>
      {results.length ? (
        <ul className="mt-4 grid gap-4">
          {visibleResults.map((recipe) => (
            <li key={recipe.slug}>
              <Link
                href={`/recipe/${recipe.slug}/`}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 p-3 transition-colors hover:border-orange-400 hover:bg-orange-50/50 focus-visible:outline-2 focus-visible:outline-orange-500 sm:p-5 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-40 dark:bg-gray-800">
                  <Image
                    src={
                      recipe.thumbnail.startsWith('/')
                        ? `${process.env.BASE_PATH || ''}${recipe.thumbnail}`
                        : recipe.thumbnail
                    }
                    alt=""
                    fill
                    sizes="(min-width: 640px) 160px, 96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {recipe.videoType === 'short' ? '쇼츠 레시피' : '레시피'}
                  </span>
                  <h2 className="mt-2 text-lg font-bold">{recipe.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {recipe.summary}
                  </p>
                  <p className="mt-3 text-xs text-gray-500">
                    {recipe.tags
                      .slice(0, 5)
                      .map((tag) => `#${tag}`)
                      .join(' ')}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-2xl bg-gray-50 p-8 text-center dark:bg-gray-900">
          <p className="font-semibold">일치하는 레시피가 없어요.</p>
          <p className="mt-2 text-sm text-gray-500">
            검색어를 줄이거나 다른 재료 이름으로 찾아보세요.
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <nav
          aria-label="검색 결과 페이지"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {page > 1 && (
            <Link
              href={pageHref(page - 1)}
              className="rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              이전
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1)
            .map((value, index, pages) => (
              <span key={value} className="flex items-center gap-2">
                {index > 0 && value - pages[index - 1] > 1 && <span aria-hidden="true">…</span>}
                <Link
                  href={pageHref(value)}
                  aria-current={page === value ? 'page' : undefined}
                  aria-label={`${value}페이지`}
                  className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-3 ${page === value ? 'bg-orange-600 font-bold text-white' : 'border border-gray-200 hover:bg-orange-50 dark:border-gray-700 dark:hover:bg-gray-800'}`}
                >
                  {value}
                </Link>
              </span>
            ))}
          {page < totalPages && (
            <Link
              href={pageHref(page + 1)}
              className="rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              다음
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}

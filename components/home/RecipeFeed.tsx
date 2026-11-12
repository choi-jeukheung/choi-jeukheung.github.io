'use client'

import { useState } from 'react'
import Link from '../ui/Link'
import Image from '../ui/Image'
import { StarFull, StarHalf, StarEmpty } from '../social-icons/icons'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

interface Recipe {
  title: string
  slug: string
  time: string
  difficulty: number
  summary?: string
  thumbnail?: string
}

interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
  difficulty: number
  time: string
  thumbnail?: string
}

interface RecipeFeedProps {
  featuredRecipes: Recipe[]
  latestPosts: Post[]
}

function Stars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
      <span className="mr-1 text-xs">난이도</span>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= Math.floor(difficulty)
        const isHalf = star === Math.ceil(difficulty) && difficulty % 1 !== 0
        if (isFull)
          return <StarFull key={star} className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
        if (isHalf)
          return <StarHalf key={star} className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
        return <StarEmpty key={star} className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
      })}
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.slug}`} className="group block min-w-0">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        {recipe.thumbnail ? (
          <Image
            src={recipe.thumbnail}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={300}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">🍳</div>
        )}
        <div className="absolute right-2.5 bottom-2.5 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {recipe.time}
        </div>
      </div>
      <div className="pt-4 pb-2">
        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 text-lg leading-7 font-bold break-words text-gray-900 transition-colors dark:text-white">
          {recipe.title}
        </h3>
        {recipe.summary && (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {recipe.summary}
          </p>
        )}
        <Stars difficulty={recipe.difficulty} />
      </div>
    </Link>
  )
}

function PostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/recipe/${post.slug}`}
      className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-900/40"
    >
      {post.thumbnail && (
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-base leading-6 font-bold break-words text-gray-900 transition-colors dark:text-white">
          {post.title}
        </h3>
        {post.summary && (
          <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{post.summary}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-xs font-bold text-gray-500">{post.time}</span>
          <Stars difficulty={post.difficulty} />
          <time className="text-xs text-gray-400 sm:ml-auto">
            {formatDate(post.date, siteMetadata.locale)}
          </time>
        </div>
      </div>
    </Link>
  )
}

const feedTabs = [
  { value: 'featured', label: '추천' },
  { value: 'latest', label: '최신' },
] as const

export default function RecipeFeed({ featuredRecipes, latestPosts }: RecipeFeedProps) {
  const [tab, setTab] = useState<'featured' | 'latest'>('featured')
  const [featuredLimit, setFeaturedLimit] = useState(6)
  const visibleRecipes = tab === 'featured' ? featuredRecipes.slice(0, featuredLimit) : latestPosts

  return (
    <div>
      <div
        aria-label="레시피 보기 방식"
        className="mb-6 flex items-center gap-1 rounded-2xl border border-gray-100 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900"
      >
        {feedTabs.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={tab === value}
            aria-controls="recipe-feed-results"
            onClick={() => setTab(value)}
            className={`flex-1 rounded-xl py-2.5 text-base font-black transition-all ${
              tab === value
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="recipe-feed-results" aria-live="polite">
        {visibleRecipes.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            {tab === 'featured' ? '아직 추천 레시피가 없습니다.' : '아직 등록된 레시피가 없습니다.'}
          </p>
        ) : tab === 'latest' ? (
          <div className="flex flex-col gap-3">
            {latestPosts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </div>

      {tab === 'featured' && featuredLimit < featuredRecipes.length && (
        <button
          type="button"
          onClick={() => setFeaturedLimit((limit) => limit + 6)}
          className="mt-5 min-h-11 w-full rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          추천 더 보기 ({featuredRecipes.length - featuredLimit}개 남음)
        </button>
      )}

      {/* 더보기 */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/recipe"
          className="hover:text-primary-600 dark:hover:text-primary-400 rounded-2xl border-2 border-gray-200 bg-white px-8 py-3 text-sm font-black text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-500"
        >
          모든 레시피 보기 →
        </Link>
      </div>
    </div>
  )
}

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
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= Math.floor(difficulty)
        const isHalf = star === Math.ceil(difficulty) && difficulty % 1 !== 0
        if (isFull) return <StarFull key={star} className="h-3.5 w-3.5 text-yellow-400" />
        if (isHalf) return <StarHalf key={star} className="h-3.5 w-3.5 text-yellow-400" />
        return <StarEmpty key={star} className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
      })}
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
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
      <div className="p-4">
        <h3 className="mb-1.5 line-clamp-1 font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
          {recipe.title}
        </h3>
        {recipe.summary && (
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
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
      className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-orange-900/40"
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
        <h3 className="line-clamp-1 font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
          {post.title}
        </h3>
        {post.summary && (
          <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">{post.summary}</p>
        )}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-orange-500">{post.time}</span>
          <Stars difficulty={post.difficulty} />
          <time className="ml-auto text-xs text-gray-400">
            {formatDate(post.date, siteMetadata.locale)}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default function RecipeFeed({ featuredRecipes, latestPosts }: RecipeFeedProps) {
  const [tab, setTab] = useState<'featured' | 'latest'>('featured')

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 rounded-2xl border border-gray-100 bg-[#0064FF] p-1 dark:border-gray-800 dark:bg-gray-900">
        <button
          onClick={() => setTab('featured')}
          className={`flex-1 rounded-xl py-2.5 text-base font-black transition-all ${
            tab === 'featured'
              ? 'bg-white text-orange-600 shadow-sm dark:bg-gray-800 dark:text-orange-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
        >
          ✨ 추천
        </button>
        <button
          onClick={() => setTab('latest')}
          className={`flex-1 rounded-xl py-2.5 text-base font-black transition-all ${
            tab === 'latest'
              ? 'bg-white text-orange-600 shadow-sm dark:bg-gray-800 dark:text-orange-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
        >
          🍳 최신
        </button>
      </div>

      {tab === 'featured' && (
        <div className="grid grid-cols-2 gap-4">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Latest tab: list rows */}
      {tab === 'latest' && (
        <div className="flex flex-col gap-3">
          {latestPosts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* 더보기 */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/recipe"
          className="rounded-2xl border-2 border-gray-200 bg-white px-8 py-3 text-sm font-black text-gray-700 shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
        >
          모든 레시피 보기 →
        </Link>
      </div>
    </div>
  )
}

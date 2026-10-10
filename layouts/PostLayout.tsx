import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/mdx/Comments'
import Link from '@/components/ui/Link'
import Tag from '@/components/recipe/Tag'
import { getCategoryName } from '@/data/recipeCategories'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ui/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc?: { value: string; url: string; depth: number }[]
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  toc = [],
  children,
}: LayoutProps) {
  const { slug, date, title, tags, category, time, videoType } = content
  const ingredients = toc.find((item) => item.depth === 2 && /재료/.test(item.value))
  const steps = toc.find((item) => item.depth === 2 && /만들|만드|조리/.test(item.value))

  return (
    <article className="mx-auto w-full max-w-3xl min-w-0 py-6 sm:py-10">
      <ScrollTopAndComment />
      <header className="border-b border-gray-100 pb-6 dark:border-gray-800">
        <Link
          href="/recipe"
          className="mb-4 inline-flex min-h-11 items-center text-sm font-bold text-gray-500 hover:text-orange-600 dark:text-gray-400"
        >
          ← 모든 레시피
        </Link>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
          {category && (
            <Link
              href={`/recipe/category/${category}`}
              className="inline-flex min-h-9 items-center rounded-lg bg-orange-50 px-3 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
            >
              {getCategoryName(category)}
            </Link>
          )}
          <span className="text-gray-500 dark:text-gray-400">
            {videoType === 'short' ? '쇼츠 레시피' : '영상 레시피'}
          </span>
        </div>
        <h1 className="text-[1.75rem] leading-tight tracking-tight break-words text-gray-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{authorDetails.map((author) => author.name).join(', ')}</span>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Asia/Seoul',
            })}
          </time>
          {time && (
            <span className="rounded-lg bg-gray-50 px-2 py-1 dark:bg-gray-900">조리 {time}</span>
          )}
        </div>
        {(ingredients || steps) && (
          <nav aria-label="레시피 바로가기" className="mt-5 grid grid-cols-2 gap-3">
            {ingredients && (
              <a
                href={ingredients.url}
                className="flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-3 py-3 font-bold text-white hover:bg-orange-600"
              >
                재료 보기 ↓
              </a>
            )}
            {steps && (
              <a
                href={steps.url}
                className="flex min-h-12 items-center justify-center rounded-xl border border-gray-200 px-3 py-3 font-bold text-gray-700 hover:border-orange-400 dark:border-gray-700 dark:text-gray-200"
              >
                조리 순서 ↓
              </a>
            )}
          </nav>
        )}
      </header>
      <div className="recipe-content prose dark:prose-invert prose-headings:scroll-mt-28 prose-h2:text-2xl prose-h3:text-xl prose-li:my-2 max-w-none pt-4 pb-8 text-base leading-8 break-words sm:pt-6">
        {children}
      </div>
      <footer className="border-t border-gray-100 pt-6 dark:border-gray-800">
        {tags && (
          <div className="flex flex-wrap gap-y-3">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
        <nav aria-label="다른 레시피" className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { post: prev, label: '이전 레시피' },
            { post: next, label: '다음 레시피' },
          ].map(
            ({ post, label }) =>
              post && (
                <Link
                  key={post.path}
                  href={`/${post.path.replace(/^blog\//, 'recipe/')}`}
                  className="min-w-0 rounded-2xl border border-gray-200 p-4 hover:border-orange-300 dark:border-gray-800"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                  <span className="mt-2 block font-bold break-words text-gray-900 dark:text-gray-100">
                    {post.title}
                  </span>
                </Link>
              )
          )}
        </nav>
        {siteMetadata.comments?.provider && (
          <div className="mt-8 scroll-mt-28" id="comment">
            <Comments slug={slug} />
          </div>
        )}
      </footer>
    </article>
  )
}

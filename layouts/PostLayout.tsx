import CopyRecipeLink from '@/components/recipe/CopyRecipeLink'
import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/ui/Link'
import Tag from '@/components/recipe/Tag'
import { getCategoryName } from '@/data/recipeCategories'
import ScrollTop from '@/components/ui/ScrollTop'
import RecipeToc from '@/components/recipe/RecipeToc'
import { allBlogs } from 'contentlayer/generated'
import { getRelatedRecipes } from '@/utils/related-recipes'

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
  const { date, title, tags, category, time, videoType, recipeCuisine } = content
  const relatedRecipes = getRelatedRecipes(content, allBlogs)
  const steps = toc.find((item) => item.depth === 2 && /만들|만드|조리/.test(item.value))

  return (
    <article className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 gap-x-10 px-4 py-6 sm:px-6 sm:py-10 xl:grid-cols-[minmax(0,48rem)_15rem]">
      <div className="mx-auto w-full max-w-3xl min-w-0">
        <ScrollTop />
        <header className="border-b border-gray-100 pb-6 dark:border-gray-800">
          <Link
            href="/recipe"
            className="hover:text-primary-600 mb-4 inline-flex min-h-11 items-center text-sm font-bold text-gray-500 dark:text-gray-400"
          >
            ← 모든 레시피
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
            {category && (
              <Link
                href={`/recipe/category/${category}`}
                className="bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 inline-flex min-h-9 items-center rounded-lg px-3"
              >
                {getCategoryName(category)}
              </Link>
            )}
            <span className="text-gray-500 dark:text-gray-400">
              {videoType === 'short' ? '쇼츠 레시피' : '영상 레시피'}
            </span>
            {recipeCuisine && (
              <span className="text-gray-500 dark:text-gray-400">{recipeCuisine}</span>
            )}
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
          <div className="mt-5 flex flex-wrap items-start gap-3">
            {steps && (
              <a
                href={steps.url}
                className="inline-flex min-h-12 items-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
              >
                조리 순서로 바로가기 ↓
              </a>
            )}
            <CopyRecipeLink />
          </div>
        </header>
        <div className="xl:hidden">
          <RecipeToc toc={toc} />
        </div>
        <div className="recipe-content prose dark:prose-invert prose-headings:scroll-mt-28 prose-h2:text-2xl prose-h3:text-xl prose-li:my-2 max-w-none pt-4 pb-8 text-base leading-8 break-words sm:pt-6">
          {children}
        </div>
        <footer className="border-t border-gray-100 pt-6 dark:border-gray-800">
          {relatedRecipes.length > 0 && (
            <section aria-labelledby="related-recipes" className="mb-8">
              <h2
                id="related-recipes"
                className="text-xl font-bold text-gray-900 dark:text-gray-100"
              >
                함께 만들어볼 레시피
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {relatedRecipes.map((recipe) => (
                  <li key={recipe.slug}>
                    <Link
                      href={`/recipe/${recipe.slug}/`}
                      className="hover:border-primary-400 hover:text-primary-700 block h-full rounded-2xl border border-gray-200 p-4 font-semibold text-gray-900 dark:border-gray-800 dark:text-gray-100"
                    >
                      {recipe.title}
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
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
                    className="hover:border-primary-300 min-w-0 rounded-2xl border border-gray-200 p-4 dark:border-gray-800"
                  >
                    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                    <span className="mt-2 block font-bold break-words text-gray-900 dark:text-gray-100">
                      {post.title}
                    </span>
                  </Link>
                )
            )}
          </nav>
        </footer>
      </div>
      <aside className="hidden min-w-0 self-stretch xl:block">
        <div className="sticky top-28">
          <RecipeToc toc={toc} desktop />
        </div>
      </aside>
    </article>
  )
}

import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/mdx/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

// 👇 광고 컴포넌트 추가
import KakaoAd from '@/components/ad/KakaoAd'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

/* --- 중요 --- */
export async function generateStaticParams() {
  return allBlogs
    .filter((p) => !p.draft)
    .map((p) => ({
      slug: p.slug.split('/'),
    }))
}
/* ----------- */

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const { slug: slugArray } = await props.params
  const slug = decodeURI(slugArray.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  if (!post || post.draft) return

  const canonical = post.canonicalUrl || new URL(`/recipe/${post.slug}/`, siteMetadata.siteUrl).href
  const title = post.seoTitle || post.title
  return {
    title: { absolute: `${title} | ${siteMetadata.headerTitle}` },
    alternates: { canonical },
    description: post.summary,
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.summary,
      images: [post.thumbnail || siteMetadata.socialBanner],
    },
    openGraph: {
      title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'ko_KR',
      type: 'article',
      images: [post.thumbnail || siteMetadata.socialBanner],
      url: canonical,
      publishedTime: post.date,
      modifiedTime: post.lastmod || post.date,
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await props.params
  const slug = decodeURI(slugArray.join('/'))

  const sortedCoreContents = allCoreContent(sortPosts(allBlogs.filter((p) => !p.draft)))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)

  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog

  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })

  const mainContent = coreContent(post)
  const Layout = layouts[post.layout || defaultLayout]

  return (
    <Layout
      content={mainContent}
      authorDetails={authorDetails}
      next={next}
      prev={prev}
      toc={post.toc}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData).replace(/</g, '\\u003c'),
        }}
      />
      {/* ===== 본문 시작 ===== */}
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />

      {/* ===== 광고 자동 삽입 ===== */}
      <div className="my-10 flex justify-center">
        <KakaoAd />
      </div>
    </Layout>
  )
}

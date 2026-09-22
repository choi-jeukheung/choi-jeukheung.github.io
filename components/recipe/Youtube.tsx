type YouTubeProps = {
  videoId: string
  title?: string
}

export default function YouTube({ videoId, title = '전체 레시피 영상' }: YouTubeProps) {
  const encodedVideoId = encodeURIComponent(videoId)

  return (
    <section className="not-prose my-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:rounded-3xl dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="mb-1 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400">
            <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
            YOUTUBE
          </p>
          <h3 className="m-0 text-base font-bold break-words text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${encodedVideoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:border-red-300 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-gray-700 dark:text-gray-300 dark:hover:text-red-400"
        >
          YouTube에서 보기 <span aria-hidden="true">↗</span>
          <span className="sr-only"> (새 탭)</span>
        </a>
      </div>
      <div className="relative aspect-video w-full bg-black">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube.com/embed/${encodedVideoId}?rel=0`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'

export default function RecipeThumbnail({ src, className }: { src?: string; className: string }) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const available = src && src !== failedSrc

  return (
    <span
      className={`relative block overflow-hidden bg-orange-50 dark:bg-gray-800 ${className}`}
      aria-hidden="true"
    >
      {available ? (
        // Existing recipe images are reused; no duplicate image files are needed.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(src)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-orange-300 dark:text-gray-500">
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="22" cy="21" r="11" />
            <circle cx="22" cy="21" r="7" />
            <path d="M5 7v9c0 3 4 3 4 0V7M7 7v26M36 7v26" />
          </svg>
        </span>
      )}
    </span>
  )
}

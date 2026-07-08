import React from 'react'

// 부모에게서 데이터를 물려받는 자식 컴포넌트
export default function ProductCard({ image, title, description, link }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-6 border-b border-gray-100 py-6 sm:flex-row dark:border-neutral-800">
      {/* 1. 제품 이미지 영역 */}
      <div className="flex h-24 w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 shadow-sm sm:h-28 dark:bg-neutral-900">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* 2. 제품 설명 영역 */}
      <div className="flex-1">
        <h4 className="mt-1 text-base font-bold text-gray-900 dark:text-neutral-100">{title}</h4>
        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-gray-500 dark:text-neutral-400">
          {description}
        </p>
        <div className="mt-3">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-xs font-medium text-gray-900 underline underline-offset-4 transition-colors hover:text-blue-600 dark:text-neutral-100 dark:hover:text-blue-400"
          >
            제품 정보 확인하기 →
          </a>
        </div>
      </div>
    </div>
  )
}

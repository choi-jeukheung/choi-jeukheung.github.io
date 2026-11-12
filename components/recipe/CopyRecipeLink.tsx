'use client'

import { useEffect, useRef, useState } from 'react'

export default function CopyRecipeLink() {
  const [status, setStatus] = useState('')
  const [fallback, setFallback] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    const url = new URL(window.location.href)
    url.hash = ''
    url.search = ''
    try {
      await navigator.clipboard.writeText(url.href)
      setStatus('링크를 복사했어요')
      setFallback('')
    } catch {
      setFallback(url.href)
      setStatus('아래 주소를 선택해 복사해주세요')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus(''), 4000)
  }
  return (
    <div>
      <button
        type="button"
        onClick={copy}
        className="min-h-12 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
      >
        링크 복사
      </button>
      <span role="status" className="ml-3 text-sm text-gray-500 dark:text-gray-400">
        {status}
      </span>
      {fallback && (
        <input
          aria-label="복사할 레시피 주소"
          readOnly
          value={fallback}
          onFocus={(event) => event.target.select()}
          className="mt-2 w-full rounded-lg border-gray-300 bg-transparent text-base"
        />
      )}
    </div>
  )
}

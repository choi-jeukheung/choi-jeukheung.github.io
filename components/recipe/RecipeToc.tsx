'use client'

import { useEffect, useRef, useState } from 'react'

type TocEntry = { value: string; url: string; depth: number }

export default function RecipeToc({
  toc,
  desktop = false,
}: {
  toc: TocEntry[]
  desktop?: boolean
}) {
  const entries = toc.filter((entry) => entry.depth === 2 || entry.depth === 3)
  const [active, setActive] = useState('')
  const details = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const headings = toc
      .filter((entry) => entry.depth === 2 || entry.depth === 3)
      .map((entry) => ({
        entry,
        element: document.getElementById(decodeURIComponent(entry.url.slice(1))),
      }))
      .filter((item) => item.element)
    let frame = 0
    const update = () => {
      frame = 0
      let current = ''
      for (const { entry, element } of headings) {
        if (element!.getBoundingClientRect().top <= 140) current = entry.url
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    const content = document.querySelector('.recipe-content')
    if (content) observer.observe(content)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [toc])

  if (entries.length < 2) return null

  const links = (
    <nav aria-label="레시피 목차">
      <ol className="space-y-1">
        {entries.map((entry) => (
          <li key={entry.url}>
            <a
              href={entry.url}
              aria-current={active === entry.url ? 'location' : undefined}
              onClick={(event) => {
                if (details.current) {
                  // Move focus out of the panel before collapsing it.
                  event.preventDefault()
                  const heading = document.getElementById(decodeURIComponent(entry.url.slice(1)))
                  details.current.open = false
                  if (heading) {
                    heading.setAttribute('tabindex', '-1')
                    heading.focus({ preventScroll: true })
                    heading.scrollIntoView({ block: 'start' })
                    window.history.replaceState(window.history.state, '', entry.url)
                  }
                }
                setActive(entry.url)
              }}
              className={`block min-h-11 rounded-lg border-l-2 py-2.5 pr-3 text-sm leading-6 break-words transition-colors ${entry.depth === 3 ? 'pl-6' : 'pl-3 font-medium'} ${active === entry.url ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'}`}
            >
              {entry.value}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )

  if (desktop) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/60">
        <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
          이 레시피의 목차
        </p>
        <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-contain">{links}</div>
      </div>
    )
  }

  return (
    <details
      ref={details}
      className="group my-5 rounded-2xl border border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/60"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-semibold [&::-webkit-details-marker]:hidden">
        <span>
          목차 <span className="ml-2 text-sm font-normal text-gray-500">{entries.length}</span>
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="border-t border-gray-200 p-3 dark:border-gray-800">{links}</div>
    </details>
  )
}

import type { ReactNode } from 'react'

export default function PageIntro({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <header className="flex items-center gap-3 pt-5 pb-6 sm:pt-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-orange-50 text-2xl font-black text-orange-500 dark:bg-orange-900/20 dark:text-orange-400">
        {icon}
      </div>
      <div className="min-w-0">
        <h1 className="text-base font-black tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <div className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {children}
        </div>
      </div>
    </header>
  )
}

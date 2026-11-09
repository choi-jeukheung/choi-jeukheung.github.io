import type { ReactNode } from 'react'

export default function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <header>
      <p className="font-semibold text-orange-600 dark:text-orange-400">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400">{children}</p>
    </header>
  )
}

'use client'

import { useId } from 'react'

export default function IngredientChecklist({ items }: { items: string }) {
  const id = useId()
  const ingredients: string[] = JSON.parse(items)
  return (
    <ul className="not-prose my-5 list-none divide-y divide-blue-100/70 rounded-2xl border border-blue-100 bg-blue-50/40 px-4 sm:px-5 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900/60">
      {ingredients.map((ingredient, index) => (
        <li key={`${id}-${index}`}>
          <label className="flex min-h-12 cursor-pointer items-start gap-3 py-3 text-base leading-7">
            <input
              type="checkbox"
              className="peer text-primary-600 focus:ring-primary-500 mt-1.5 h-5 w-5 shrink-0 rounded border-gray-400 bg-transparent"
            />
            <span className="text-gray-800 peer-checked:text-gray-500 peer-checked:line-through dark:text-gray-200 dark:peer-checked:text-gray-500">
              {ingredient}
            </span>
          </label>
        </li>
      ))}
    </ul>
  )
}

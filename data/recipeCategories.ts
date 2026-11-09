export const recipeCategories = [
  {
    name: '밥도둑',
    icon: '🍚',
    category: '밥도둑',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: '면발의 위로',
    icon: '🍜',
    category: '면발의위로',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    textColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    name: '국물이 답이야',
    icon: '🥘',
    category: '국물이답이야',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: '간단한끼',
    icon: '🍳',
    category: '간단한끼',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
]

export function getCategoryName(category: string) {
  return recipeCategories.find((item) => item.category === category)?.name || category
}

// Keep the historical Shorts URL available without listing it as a food category.
export const archivedRecipeCategories = ['쇼츠요리']

export function matchesRecipeCategory(
  post: { category?: string; videoType?: string; draft?: boolean },
  category: string
) {
  return (
    !post.draft &&
    (category === '쇼츠요리' ? post.videoType === 'short' : post.category === category)
  )
}

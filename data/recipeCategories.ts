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
    name: '안주각',
    icon: '🔥',
    category: '안주각',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
  },
  {
    name: '다이어트',
    icon: '🥗',
    category: '다이어트',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    name: '간단한끼',
    icon: '🍳',
    category: '간단한끼',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: '쇼츠요리',
    icon: '📱',
    category: '쇼츠요리',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
]

export function getCategoryName(category: string) {
  return recipeCategories.find((item) => item.category === category)?.name || category
}

import Link from '@/components/ui/Link'
import { recipeCategories as categories } from '@/data/recipeCategories'

export default function CategoryNavigation() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            카테고리별 레시피
          </h2>
          <p className="text-gray-600 dark:text-gray-400">원하는 카테고리를 선택해보세요</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/recipe/category/${category.category}`}
              className={`${category.bgColor} ${category.textColor} rounded-xl p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-lg`}
            >
              <div className="mb-3 text-5xl">{category.icon}</div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

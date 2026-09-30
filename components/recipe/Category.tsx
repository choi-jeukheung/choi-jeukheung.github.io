import { getCategoryName } from '@/data/recipeCategories'
import Link from '@/components/ui/Link'

interface Props {
  category: string
}

const Category = ({ category }: Props) => {
  const categoryName = getCategoryName(category)
  return (
    <Link
      href={`/recipe/category/${category}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {categoryName}
    </Link>
  )
}

export default Category

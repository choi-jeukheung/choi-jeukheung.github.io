import Link from '@/components/Link'

interface Props {
  category: string
}

const categoryNames: Record<string, string> = {
  godsaeng: '갓생 한끼',
  clean: '클린 식단',
  dopamine: '도파민 폭발',
  convenience: '편의점 털기',
  mood: '무드 메이커',
  'fridge-raid': '냉털 챌린지',
}

const Category = ({ category }: Props) => {
  const categoryName = categoryNames[category] || category
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

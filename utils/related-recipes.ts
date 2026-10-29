type Recipe = {
  slug: string
  title: string
  tags?: string[]
  date: string
  draft?: boolean
}

const generalTags = new Set(['쇼츠', '간단요리', '초간단', '집밥', '레시피'])
const normalize = (tag: string) => tag.replace(/\s/g, '').toLowerCase()

export function getRelatedRecipes<T extends Recipe>(current: Recipe, recipes: T[], limit = 3): T[] {
  const tags = new Set((current.tags || []).map(normalize).filter((tag) => !generalTags.has(tag)))
  return recipes
    .filter((recipe) => !recipe.draft && recipe.slug !== current.slug)
    .map((recipe) => ({
      recipe,
      score: [...new Set((recipe.tags || []).map(normalize))].filter((tag) => tags.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.recipe.date.localeCompare(a.recipe.date) ||
        a.recipe.slug.localeCompare(b.recipe.slug)
    )
    .slice(0, limit)
    .map(({ recipe }) => recipe)
}

type Node = {
  type: string
  value?: string
  depth?: number
  name?: string
  attributes?: { type: string; name?: string; value?: unknown }[]
  children?: Node[]
}
const text = (node: Node): string => node.value || node.children?.map(text).join('') || ''
const component = (name: string, values: Record<string, string>): Node => ({
  type: 'mdxJsxFlowElement',
  name,
  attributes: Object.entries(values).map(([name, value]) => ({
    type: 'mdxJsxAttribute',
    name,
    value,
  })),
  children: [],
})

// Enhance ingredient sections only; instructions and other lists stay unchanged.
export default function remarkRecipeTools() {
  return (tree: Node) => {
    const nodes = tree.children || []
    let ingredients = false
    tree.children = nodes.flatMap((node) => {
      if (node.type === 'heading' && node.depth === 2) {
        ingredients = /재료/.test(text(node)) && !/정보|추천/.test(text(node))
      }
      if (!ingredients || node.type !== 'list') return [node]
      const items = (node.children || []).map(text)
      return [component('IngredientChecklist', { items: JSON.stringify(items) })]
    })
  }
}

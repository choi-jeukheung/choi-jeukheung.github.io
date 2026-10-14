import { remark } from 'remark'
import { slug } from 'github-slugger'

type Node = { type: string; value?: string; depth?: number; children?: Node[] }
const text = (node: Node): string => node.value || node.children?.map(text).join('') || ''

// Extract only the ingredients and instructions actually visible in the MDX.
export function extractRecipeDetails(markdown: string, url: string) {
  const nodes = remark().parse(markdown).children as Node[]
  const recipeIngredient: string[] = []
  const recipeInstructions: { '@type': string; name?: string; text: string; url?: string }[] = []
  let section = ''
  let step: { name: string; text: string; url: string } | undefined
  const flush = () => {
    if (step?.text) recipeInstructions.push({ '@type': 'HowToStep', ...step })
    step = undefined
  }
  for (const node of nodes) {
    if (node.type === 'heading' && node.depth === 2) {
      flush()
      const heading = text(node)
      section =
        /재료/.test(heading) && !/정보|추천/.test(heading)
          ? 'ingredients'
          : /만들|만드|조리/.test(heading)
            ? 'steps'
            : ''
    } else if (section === 'ingredients' && node.type === 'list') {
      recipeIngredient.push(...(node.children || []).map(text))
    } else if (section === 'steps') {
      if (node.type === 'heading' && node.depth === 3) {
        flush()
        step = { name: text(node), text: '', url: `${url}#${slug(text(node))}` }
      } else if (step && node.type === 'paragraph') {
        step.text += `${step.text ? '\n' : ''}${text(node)}`
      } else if (!step && node.type === 'list') {
        recipeInstructions.push(
          ...(node.children || []).map((item) => ({ '@type': 'HowToStep', text: text(item) }))
        )
      }
    }
  }
  flush()
  return { recipeIngredient, recipeInstructions }
}

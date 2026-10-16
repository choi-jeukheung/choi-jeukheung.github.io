import { remark } from 'remark'

// Inspect rendered HTML/JSX nodes, not code examples or comments.
export function hasInlineAd(markdown: string): boolean {
  const tree = remark().parse(markdown)
  const visit = (node: {
    type: string
    value?: string
    children?: typeof tree.children
  }): boolean => {
    if (node.type === 'code' || node.type === 'inlineCode') return false
    if (
      node.type === 'html' &&
      /<KakaoAd(?=[\s/>])/.test((node.value || '').replace(/<!--[\s\S]*?-->/g, ''))
    )
      return true
    return node.children?.some(visit) || false
  }
  return visit(tree)
}

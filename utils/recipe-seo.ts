import { remark } from 'remark'
import { slug } from 'github-slugger'

type Node = { type: string; value?: string; depth?: number; url?: string; children?: Node[] }
const text = (node: Node): string => node.value || node.children?.map(text).join('') || ''

// Only use an embedded video, never a product link or a fenced code example.
export function extractRecipeVideo(
  markdown: string,
  metadata: {
    title: string
    summary?: string
    videoUploadDate?: string
    videoDuration?: string
  }
) {
  const nodes = remark().parse(markdown).children as Node[]
  const embed = nodes.find(
    (node) => node.type === 'html' && /^<YouTube(?:Shorts)?\s/.test(node.value || '')
  )?.value
  const id = embed?.match(/\bvideoId\s*=\s*["']([\w-]{11})["']/)?.[1]
  // Google requires the actual video publication date, not the blog's date.
  if (!id || !metadata.videoUploadDate) return undefined
  return {
    '@type': 'VideoObject',
    name: metadata.title,
    description: metadata.summary || metadata.title,
    thumbnailUrl: [`https://img.youtube.com/vi/${id}/hqdefault.jpg`],
    embedUrl: `https://www.youtube.com/embed/${id}`,
    url: `https://www.youtube.com/watch?v=${id}`,
    uploadDate: metadata.videoUploadDate,
    ...(metadata.videoDuration ? { duration: metadata.videoDuration } : {}),
  }
}

// Extract only the ingredients and instructions actually visible in the MDX.
export function extractRecipeDetails(markdown: string, url: string) {
  const nodes = remark().parse(markdown).children as Node[]
  const recipeIngredient: string[] = []
  const recipeInstructions: {
    '@type': string
    name?: string
    text: string
    url?: string
    image?: string
  }[] = []
  let section = ''
  let step: { name: string; text: string; url: string; image?: string } | undefined
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
          : /^(이렇게 만들었어요|만드는 순서|만드는 법|조리 순서)$/.test(heading)
            ? 'steps'
            : ''
    } else if (section === 'ingredients' && node.type === 'list') {
      recipeIngredient.push(...(node.children || []).map(text))
    } else if (section === 'steps') {
      if (node.type === 'heading' && node.depth === 3) {
        flush()
        step = {
          name: text(node).replace(/^\d+[.)]\s*/, ''),
          text: '',
          url: `${url}#${slug(text(node))}`,
        }
      } else if (step && node.type === 'paragraph') {
        step.text += `${step.text ? '\n' : ''}${text(node)}`
        const image = node.children?.find((child) => child.type === 'image')?.url
        if (image) step.image = new URL(image, url).href
      } else if (!step && node.type === 'list') {
        recipeInstructions.push(
          ...(node.children || []).map((item) => {
            const image = item.children
              ?.flatMap((child) => child.children || [])
              .find((child) => child.type === 'image')?.url
            return {
              '@type': 'HowToStep',
              text: text(item),
              ...(image ? { image: new URL(image, url).href } : {}),
            }
          })
        )
      }
    }
  }
  flush()
  return { recipeIngredient, recipeInstructions }
}

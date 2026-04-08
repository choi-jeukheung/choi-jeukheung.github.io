import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from '../ui/Image'
import CustomLink from '../ui/Link'
import TableWrapper from './TableWrapper'
import YouTubeShorts from '../recipe/YoutubeShorts'
import YouTube from '../recipe/YoutubeShorts'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTubeShorts,
  YouTube,
}

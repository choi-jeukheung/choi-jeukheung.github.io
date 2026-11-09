import rss from './rss.mjs'
import taxonomyRedirects from './taxonomy-redirects.mjs'

async function postbuild() {
  await rss()
  await taxonomyRedirects()
}

postbuild()

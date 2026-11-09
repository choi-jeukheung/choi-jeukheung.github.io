import { readFile, mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'

// GitHub Pages has no server redirects. Export compatibility pages with a
// canonical target, an immediate refresh and a normal link as a fallback.
export default async function taxonomyRedirects() {
  const redirects = JSON.parse(await readFile('data/taxonomy-redirects.json', 'utf8'))
  const escape = (value) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  for (const [from, to] of Object.entries(redirects)) {
    const destination = path.join('out', to, 'index.html')
    await access(destination)
    const directory = path.join('out', from)
    const href = escape(encodeURI(to))
    await mkdir(directory, { recursive: true })
    await writeFile(
      path.join(directory, 'index.html'),
      `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${href}"><link rel="canonical" href="https://choi-jeukheung.github.io${href}"><title>요리 목록으로 이동</title></head><body><p>분류가 정리되었습니다. <a href="${href}">관련 요리 보기</a></p></body></html>`
    )
  }
  console.log(`Exported ${Object.keys(redirects).length} taxonomy compatibility pages.`)
}
